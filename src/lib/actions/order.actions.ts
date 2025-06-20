"use server";

import { z } from 'zod';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import { getClientCompanyIdForUser } from '@/lib/auth';
import { executeWithResilience } from '@/lib/resilience/failure-handler';
import { logAuditEvent } from '@/lib/audit';
import { sendEmail, getOrderConfirmationHtml, getCriticalFailureAlertHtml } from '@/lib/email';
import { callDetrackCreateJobAPI, type DetrackJobPayload } from '@/lib/detrack-sdk'; // Import Detrack SDK function
import * as Sentry from '@sentry/nextjs';

// Define Zod schema for order items
export const OrderItemSchema = z.object({ // Export for potential use elsewhere if needed
  description: z.string().min(1, "Item description is required."),
  quantity: z.number().int().positive("Quantity must be a positive integer."),
  weight: z.number().positive("Weight must be a positive number.").optional(),
  dimensions: z.string().optional(), // e.g., "LxWxH"
});

// Define Zod schema for creating an order
export const CreateOrderSchema = z.object({
  endCustomerId: z.string().cuid("Invalid End Customer ID.").optional(),
  pickupAddress: z.string().min(5, "Pickup address is required."),
  deliveryAddress: z.string().min(5, "Delivery address is required."),
  pickupDateTime: z.string().datetime({ message: "Invalid pickup date/time." }).optional(),
  deliveryDateTime: z.string().datetime({ message: "Invalid delivery date/time." }).optional(),
  notes: z.string().optional(),
  orderItems: z.array(OrderItemSchema).min(1, "At least one order item is required."),
  
  // New customer fields
  newCustomerName: z.string().optional(),
  newCustomerEmail: z.string().email().optional(),
  newCustomerPhone: z.string().optional(),
  newCustomerAddress: z.string().optional(),
  saveNewCustomer: z.boolean().optional(),
});

export type CreateOrderInput = z.infer<typeof CreateOrderSchema>;

interface CreateOrderResult {
  success: boolean;
  orderId?: string;
  orderNumber?: string;
  message?: string;
  errors?: z.ZodIssue[]; // For validation errors
}

// Removed inline mock callDetrackCreateJobAPI as it's now imported from detrack-sdk.ts


export async function createQCSOrder(input: CreateOrderInput): Promise<CreateOrderResult> {
  const { userId, orgId } = await auth(); // Get current user from Clerk - TRYING AWAIT

  if (!userId) {
    logAuditEvent({ action: 'CREATE_ORDER_ATTEMPT_FAIL_UNAUTHENTICATED' });
    return { success: false, message: "Authentication required." };
  }

  // Validate input using Zod
  const validationResult = CreateOrderSchema.safeParse(input);
  if (!validationResult.success) {
    logAuditEvent({ action: 'CREATE_ORDER_VALIDATION_FAIL', userId, details: { errors: validationResult.error.issues } });
    return { success: false, message: "Invalid input.", errors: validationResult.error.issues };
  }

  const validatedData = validationResult.data;

  if (!validatedData.endCustomerId && !validatedData.newCustomerName) {
    return { success: false, message: "Please select an existing customer or create a new one." };
  }

  try {
    // Get the clientCompanyId for the authenticated user
    const authResult = await getClientCompanyIdForUser();
    if (!authResult.success || !authResult.clientCompanyId) {
      logAuditEvent({ action: 'CREATE_ORDER_FAIL_AUTH_COMPANY_LINK', userId, details: { authMessage: authResult.message } });
      return { success: false, message: authResult.message || "User is not associated with a client company or not authorized." };
    }
    const userClientCompanyId = authResult.clientCompanyId;

    // 1. Fetch QCSUserProfile (still needed for email later)
    const userProfile = await prisma.qCSUserProfile.findUnique({ where: { id: userId } });
    if (!userProfile) {
      logAuditEvent({ action: 'CREATE_ORDER_FAIL_USER_PROFILE_NOT_FOUND', userId });
      return { success: false, message: "User profile not found." };
    }

    // 2. Validate EndCustomer existence AND ownership
    let customerId = validatedData.endCustomerId;
    let customerName = '';
    let customerEmail = '';
    let customerPhone = '';

    if (validatedData.newCustomerName && validatedData.newCustomerAddress) {
        const newCustomer = await prisma.endCustomer.create({
            data: {
                name: validatedData.newCustomerName,
                email: validatedData.newCustomerEmail,
                phone: validatedData.newCustomerPhone,
                address: validatedData.newCustomerAddress,
                clientCompanyId: userClientCompanyId,
            }
        });
        customerId = newCustomer.id;
        customerName = newCustomer.name;
        customerEmail = newCustomer.email || '';
        customerPhone = newCustomer.phone || '';
    } else if (customerId) {
        const existingCustomer = await prisma.endCustomer.findUnique({ where: { id: customerId } });
        if (existingCustomer) {
            customerName = existingCustomer.name;
            customerEmail = existingCustomer.email || '';
            customerPhone = existingCustomer.phone || '';
        }
    }

    if (!customerId) {
        return { success: false, message: "End customer is required." };
    }

    const endCustomer = { id: customerId, name: customerName, email: customerEmail, phone: customerPhone, clientCompanyId: userClientCompanyId };

    // Verify user's clientCompany matches endCustomer's clientCompany
    if (endCustomer.clientCompanyId !== userClientCompanyId) {
      logAuditEvent({
        action: 'CREATE_ORDER_FAIL_ENDCUSTOMER_UNAUTHORIZED',
        userId,
        targetId: validatedData.endCustomerId,
        details: { userClientCompanyId, endCustomerClientCompanyId: endCustomer.clientCompanyId }
      });
      return { success: false, message: "You are not authorized to create orders for this end customer." };
    }

    // Generate a unique order number (simple example, could be more robust)
    const orderNumber = `QCS-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    // 3. Create Order and OrderItems in Prisma (transactional)
    // Wrapped with resilience for the database operation
    const createdOrder = await executeWithResilience({
      featureKey: 'PRISMA_CREATE_ORDER',
      operation: async () => {
        return prisma.$transaction(async (tx) => {
          const order = await tx.order.create({
            data: {
              orderNumber,
              status: 'PENDING', // Initial status
              pickupAddress: validatedData.pickupAddress,
              deliveryAddress: validatedData.deliveryAddress,
              pickupDateTime: validatedData.pickupDateTime ? new Date(validatedData.pickupDateTime) : null,
              deliveryDateTime: validatedData.deliveryDateTime ? new Date(validatedData.deliveryDateTime) : null,
              notes: validatedData.notes,
              endCustomerId: customerId,
              // detrackJobId will be updated after Detrack call
            },
          });

          await tx.orderItem.createMany({
            data: validatedData.orderItems.map((item: z.infer<typeof OrderItemSchema>) => ({
              ...item,
              orderId: order.id,
            })),
          });
          return order;
        });
      },
      fallback: async (error) => {
        logAuditEvent({ action: 'CREATE_ORDER_FAIL_PRISMA_TRANSACTION', userId, details: { error: error.message, input: validatedData } });
        Sentry.captureException(error, { tags: { operation: 'PRISMA_CREATE_ORDER_FALLBACK' } });
        throw new Error("Database operation failed to create order after retries."); // Propagate for outer catch
      }
    });

    // 4. Call Detrack API to create job (wrapped with resilience)
    const detrackPayload: DetrackJobPayload = {
      // Required fields
      type: 'Delivery', // Assuming default is Delivery, adjust if Collection is possible from this form
      date: validatedData.pickupDateTime ? new Date(validatedData.pickupDateTime).toISOString().split('T')[0] : new Date().toISOString().split('T')[0], // Use pickup date or current date
      do_number: createdOrder.orderNumber,
      address: validatedData.deliveryAddress,

      // Optional fields from QCS form / order data
      order_number: createdOrder.orderNumber, // Can also use QCS order number here
      deliver_to_collect_from: endCustomer.name, // Contact name
      phone_number: endCustomer.phone || undefined,
      notify_email: endCustomer.email || undefined,
      instructions: validatedData.notes || undefined,
      items: validatedData.orderItems.map(item => ({
        sku: item.description, // Using description as SKU if no specific SKU field in QCS form
        description: item.description,
        quantity: item.quantity,
        weight: item.weight,
        // dimensions: item.dimensions, // If you have a dimensions field
      })),
      
      // QCS specific context if needed, or map to Detrack custom fields if available/used
      // customer: endCustomer.name, // Could map to Detrack's customer field
      // account_number: endCustomer.clientCompanyId, // Example mapping

      // Other potentially relevant fields from validatedData if they exist on DetrackJobPayload
      start_date: validatedData.pickupDateTime ? new Date(validatedData.pickupDateTime).toISOString().split('T')[0] : undefined,
      job_time: validatedData.pickupDateTime ? new Date(validatedData.pickupDateTime).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false }) : undefined,
      time_window: undefined, // If you collect this, map it here e.g. "10:00-12:00"
      
      // Delivery specific (already have address)
      // company_name: endCustomer.name if it's a company, or a specific field
      postal_code: undefined, // Extract if available from deliveryAddress or separate field
      city: undefined, // Extract if available
      state: undefined, // Extract if available
      country: undefined, // Extract if available

      // Pickup specific
      pick_up_address: validatedData.pickupAddress,
      pick_up_time: validatedData.pickupDateTime ? new Date(validatedData.pickupDateTime).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false }) : undefined,
      // Potentially add more pickup details if collected and mappable

      // Consider adding webhook_url if you want per-job webhooks, otherwise global Detrack settings apply
      // webhook_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/detrack/job/${createdOrder.id}`, // Example
    };

    // The callDetrackCreateJobAPI from detrack-sdk.ts already includes executeWithResilience
    const detrackResult = await callDetrackCreateJobAPI(detrackPayload);
    
    if (!detrackResult.success || !detrackResult.detrackJobId) {
      // Detrack job creation failed or didn't return a job ID (even if success was true but no ID)
      const errorMessage = detrackResult.error || "Failed to create job in Detrack or missing job ID.";
      logAuditEvent({ 
        action: 'CREATE_ORDER_FAIL_DETRACK_SDK', 
        userId, 
        targetId: createdOrder.id, 
        details: { error: errorMessage, payload: detrackPayload, detrackResponse: detrackResult.rawResponse } 
      });

      // Update QCS order to reflect the problem
      await prisma.order.update({
        where: { id: createdOrder.id },
        data: { 
          status: 'PROBLEM', 
          notes: (createdOrder.notes || "") + `\nError: Failed to sync with Detrack. Error: ${errorMessage}` 
        }
      });

      // Send alert email
      sendEmail({
        to: userProfile.email, // Or an admin email for alerts
        subject: `Order ${createdOrder.orderNumber} - Detrack Sync Issue`,
        html: getCriticalFailureAlertHtml(`Detrack Sync for Order ${createdOrder.orderNumber}`, errorMessage),
      }).catch(e => console.error("Failed to send Detrack failure alert email", e));

      // Return a message indicating partial success (order created in QCS) but with a clear warning.
      // The overall success of createQCSOrder might be true here, but with a critical message.
      return { 
        success: true, // Order is in QCS, but with issues
        orderId: createdOrder.id, 
        orderNumber: createdOrder.orderNumber, 
        message: `Order created (ID: ${createdOrder.id}), but failed to sync with Detrack: ${errorMessage}. Please contact support.`
      };
    }

    // Detrack job creation was successful, update QCS order
    await prisma.order.update({
      where: { id: createdOrder.id },
      data: { detrackJobId: detrackResult.detrackJobId, status: 'CONFIRMED' },
    });
    logAuditEvent({ 
      action: 'CREATE_ORDER_SUCCESS_DETRACK_SYNCED', 
      userId, 
      targetId: createdOrder.id, 
      details: { orderNumber: createdOrder.orderNumber, detrackJobId: detrackResult.detrackJobId } 
    });
    
    // 5. Send success email notification
    sendEmail({
      to: userProfile.email,
      subject: `Order Confirmation: ${createdOrder.orderNumber}`,
      html: getOrderConfirmationHtml(createdOrder.orderNumber, userProfile.firstName || 'Customer'),
    }).catch(e => console.error("Failed to send order confirmation email", e));

    return { 
      success: true, 
      orderId: createdOrder.id, 
      orderNumber: createdOrder.orderNumber, 
      message: "Order created successfully and synced with Detrack!" 
    };

  } catch (error: any) {
    console.error("Error creating order:", error);
    Sentry.captureException(error, { extra: { input: validatedData, userId } }); // userId might be null if auth failed earlier - though caught
    logAuditEvent({ 
      action: 'CREATE_ORDER_FAIL_UNHANDLED', 
      userId: userId || "unknown", // Ensure userId is passed if available
      details: { error: error.message, input: validatedData } 
    });
    return { success: false, message: error.message || "An unexpected error occurred while creating the order." };
  }
}
