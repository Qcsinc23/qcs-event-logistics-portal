"use server";

import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import { getClientCompanyIdForUser } from '@/lib/auth';
import { z } from 'zod';
// Import schemas and types from the new file
import { 
  CreateEndCustomerSchema, 
  type CreateEndCustomerInput,
  UpdateEndCustomerSchema,
  type UpdateEndCustomerInput
} from '@/lib/schemas/endcustomer.schemas';
import { executeWithResilience } from '@/lib/resilience/failure-handler';
import { logAuditEvent } from '@/lib/audit';
// import { sendEmail } from '@/lib/email'; // Optional: if notifications are needed
import * as Sentry from '@sentry/nextjs';
import type { EndCustomer, QCSUserProfile } from '@/generated/prisma'; // Import generated types

// Schemas and types are now imported from '@/lib/schemas/endcustomer.schemas.ts'

interface EndCustomerActionResult {
  success: boolean;
  endCustomer?: EndCustomer; // Return the created/updated customer
  message?: string;
  errors?: z.ZodIssue[];
}

export async function createEndCustomer(input: CreateEndCustomerInput): Promise<EndCustomerActionResult> {
  const { userId } = await auth();
  if (!userId) {
    logAuditEvent({ action: 'CREATE_ENDCUSTOMER_ATTEMPT_FAIL_UNAUTHENTICATED' });
    return { success: false, message: "Authentication required." };
  }

  const authResult = await getClientCompanyIdForUser();
  if (!authResult.success || !authResult.clientCompanyId) {
    return { success: false, message: authResult.message || "Authentication or authorization failed." };
  }
  const clientCompanyId = authResult.clientCompanyId;

  const validationResult = CreateEndCustomerSchema.safeParse(input);
  if (!validationResult.success) {
    logAuditEvent({ action: 'CREATE_ENDCUSTOMER_VALIDATION_FAIL', userId, details: { errors: validationResult.error.issues } });
    return { success: false, message: "Invalid input.", errors: validationResult.error.issues };
  }

  const validatedData = validationResult.data;

  try {

    // Operation to create EndCustomer
    const createdEndCustomer = await executeWithResilience({
      featureKey: 'PRISMA_CREATE_ENDCUSTOMER',
      operation: async () => {
        return prisma.endCustomer.create({
          data: {
            ...validatedData,
            email: validatedData.email === '' ? null : validatedData.email, // Store empty email as null
            clientCompanyId: clientCompanyId,
            // rateCardId can be null if optional
            rateCardId: validatedData.rateCardId || null,
          },
        });
      },
      fallback: async (error: Error) => {
        logAuditEvent({ 
          action: 'CREATE_ENDCUSTOMER_FAIL_PRISMA', 
          userId, 
          details: { error: error.message, input: validatedData, clientCompanyId } 
        });
        Sentry.captureException(error, { tags: { operation: 'PRISMA_CREATE_ENDCUSTOMER_FALLBACK' } });
        throw new Error("Database operation failed to create end customer after retries.");
      }
    });

    logAuditEvent({ 
      action: 'CREATE_ENDCUSTOMER_SUCCESS', 
      userId, 
      targetId: createdEndCustomer.id, 
      details: { name: createdEndCustomer.name, clientCompanyId } 
    });

    // Optional: Send email notification
    // await sendEmail(...)

    return { 
      success: true, 
      endCustomer: createdEndCustomer, 
      message: "End customer created successfully." 
    };

  } catch (error: any) {
    console.error("Error creating end customer:", error);
    Sentry.captureException(error, { extra: { input: validatedData, userId } });
    logAuditEvent({ 
      action: 'CREATE_ENDCUSTOMER_FAIL_UNHANDLED', 
      userId, 
      details: { error: error.message, input: validatedData } 
    });
    return { success: false, message: error.message || "An unexpected error occurred." };
  }
}

export async function getEndCustomersForClient() {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("You must be signed in to perform this action.");
    }

    const userProfile = await prisma.qCSUserProfile.findUnique({
      where: { id: userId },
      include: { clientCompany: true },
    });

    if (!userProfile?.clientCompany) {
      // This case might happen for admins or users not linked to a company
      return [];
    }

    const endCustomers = await prisma.endCustomer.findMany({
      where: { clientCompanyId: userProfile.clientCompany.id },
      select: {
        id: true,
        name: true,
        address: true, // Include address for pre-filling
      },
      orderBy: {
        name: 'asc',
      },
    });

    return endCustomers;
  } catch (error) {
    console.error("Error fetching end customers:", error);
    // In a real app, you might want to handle this more gracefully
    return [];
  }
}

// Schemas and types are now imported from '@/lib/schemas/endcustomer.schemas.ts'

export async function updateEndCustomer(input: UpdateEndCustomerInput): Promise<EndCustomerActionResult> {
  const { userId } = await auth();
  if (!userId) {
    logAuditEvent({ action: 'UPDATE_ENDCUSTOMER_ATTEMPT_FAIL_UNAUTHENTICATED' });
    return { success: false, message: "Authentication required." };
  }

  const authResult = await getClientCompanyIdForUser();
  if (!authResult.success || !authResult.clientCompanyId) {
    return { success: false, message: authResult.message || "Authentication or authorization failed." };
  }
  const clientCompanyId = authResult.clientCompanyId;

  const validationResult = UpdateEndCustomerSchema.safeParse(input);
  if (!validationResult.success) {
    logAuditEvent({ action: 'UPDATE_ENDCUSTOMER_VALIDATION_FAIL', userId, details: { errors: validationResult.error.issues } });
    return { success: false, message: "Invalid input.", errors: validationResult.error.issues };
  }

  const { id: endCustomerIdToUpdate, ...updateData } = validationResult.data;

  try {

    // Verify the EndCustomer belongs to the user's ClientCompany before updating
    const existingEndCustomer = await prisma.endCustomer.findFirst({
      where: { 
        id: endCustomerIdToUpdate,
        clientCompanyId: clientCompanyId,
      }
    });

    if (!existingEndCustomer) {
      logAuditEvent({ 
        action: 'UPDATE_ENDCUSTOMER_FAIL_NOT_FOUND_OR_UNAUTHORIZED', 
        userId, 
        targetId: endCustomerIdToUpdate,
        details: { clientCompanyId }
      });
      return { success: false, message: "End customer not found or user not authorized to update." };
    }

    const updatedEndCustomer = await executeWithResilience({
      featureKey: 'PRISMA_UPDATE_ENDCUSTOMER',
      operation: async () => {
        return prisma.endCustomer.update({
          where: { id: endCustomerIdToUpdate },
          data: {
            ...updateData,
            email: updateData.email === '' ? null : updateData.email, // Handle empty string for optional email
            // Ensure rateCardId is explicitly set to null if not provided or empty, if it's optional
            rateCardId: updateData.rateCardId || null, 
          },
        });
      },
      fallback: async (error: Error) => {
        logAuditEvent({ 
          action: 'UPDATE_ENDCUSTOMER_FAIL_PRISMA', 
          userId, 
          targetId: endCustomerIdToUpdate,
          details: { error: error.message, input: updateData } 
        });
        Sentry.captureException(error, { tags: { operation: 'PRISMA_UPDATE_ENDCUSTOMER_FALLBACK' } });
        throw new Error("Database operation failed to update end customer.");
      }
    });

    logAuditEvent({ 
      action: 'UPDATE_ENDCUSTOMER_SUCCESS', 
      userId, 
      targetId: updatedEndCustomer.id, 
      details: { name: updatedEndCustomer.name } 
    });
    return { success: true, endCustomer: updatedEndCustomer, message: "End customer updated successfully." };

  } catch (error: any) {
    console.error("Error updating end customer:", error);
    Sentry.captureException(error, { extra: { input, userId } });
    logAuditEvent({ 
      action: 'UPDATE_ENDCUSTOMER_FAIL_UNHANDLED', 
      userId, 
      targetId: endCustomerIdToUpdate,
      details: { error: error.message, input } 
    });
    return { success: false, message: error.message || "An unexpected error occurred." };
  }
}

export async function getEndCustomerById(id: string): Promise<{ success: boolean; endCustomer?: EndCustomer | null; message?: string; }> {
  const { userId } = await auth();
  if (!userId) {
    logAuditEvent({ action: 'GET_ENDCUSTOMERBYID_ATTEMPT_FAIL_UNAUTHENTICATED', targetId: id });
    return { success: false, message: "Authentication required." };
  }

  const authResult = await getClientCompanyIdForUser();
  if (!authResult.success || !authResult.clientCompanyId) {
    return { success: false, message: authResult.message || "Authentication or authorization failed." };
  }
  const clientCompanyId = authResult.clientCompanyId;

  if (!id || typeof id !== 'string' || !z.string().cuid().safeParse(id).success) {
    logAuditEvent({ action: 'GET_ENDCUSTOMERBYID_INVALID_ID', userId, targetId: id });
    return { success: false, message: "Invalid End Customer ID provided." };
  }
  
  try {

    const endCustomer = await executeWithResilience({
      featureKey: 'PRISMA_GET_ENDCUSTOMERBYID',
      operation: async () => {
        return prisma.endCustomer.findFirst({ // findFirst to ensure it belongs to the clientCompany
          where: { 
            id: id,
            clientCompanyId: clientCompanyId 
          },
          // Include any related data needed, e.g., RateCard
          // include: { rateCard: true } 
        });
      },
      fallback: async (error: Error) => {
        logAuditEvent({ 
          action: 'GET_ENDCUSTOMERBYID_FAIL_PRISMA', 
          userId, 
          targetId: id,
          details: { error: error.message, clientCompanyId } 
        });
        Sentry.captureException(error, { tags: { operation: 'PRISMA_GET_ENDCUSTOMERBYID_FALLBACK' } });
        throw new Error("Database operation failed to fetch end customer.");
      }
    });

    if (!endCustomer) {
      logAuditEvent({ 
        action: 'GET_ENDCUSTOMERBYID_FAIL_NOT_FOUND_OR_UNAUTHORIZED', 
        userId, 
        targetId: id,
        details: { clientCompanyId }
      });
      return { success: false, message: "End customer not found or user not authorized to view." };
    }
    
    logAuditEvent({ action: 'GET_ENDCUSTOMERBYID_SUCCESS', userId, targetId: id });
    return { success: true, endCustomer };

  } catch (error: any) {
    console.error("Error fetching end customer by ID:", error);
    Sentry.captureException(error, { extra: { userId, endCustomerId: id } });
    logAuditEvent({ 
      action: 'GET_ENDCUSTOMERBYID_FAIL_UNHANDLED', 
      userId, 
      targetId: id,
      details: { error: error.message } 
    });
    return { success: false, message: error.message || "An unexpected error occurred." };
  }
}

