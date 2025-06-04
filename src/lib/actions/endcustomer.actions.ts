"use server";

import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod'; // Keep z import if used for other inline validations, or remove if not.
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

  const validationResult = CreateEndCustomerSchema.safeParse(input);
  if (!validationResult.success) {
    logAuditEvent({ action: 'CREATE_ENDCUSTOMER_VALIDATION_FAIL', userId, details: { errors: validationResult.error.issues } });
    return { success: false, message: "Invalid input.", errors: validationResult.error.issues };
  }

  const validatedData = validationResult.data;

  try {
    // Get the QCS User Profile to find their associated ClientCompany
    const userProfileWithCompany = await prisma.qCSUserProfile.findUnique({
      where: { id: userId },
      include: { clientCompany: true }, // Include the related ClientCompany
    });

    if (!userProfileWithCompany) {
      logAuditEvent({ action: 'CREATE_ENDCUSTOMER_FAIL_USER_PROFILE_NOT_FOUND', userId });
      return { success: false, message: "User profile not found." };
    }

    if (userProfileWithCompany.role !== 'CLIENT' || !userProfileWithCompany.clientCompany) {
      // This check assumes 'CLIENT' role users are tied to a ClientCompany.
      // Admins might have different logic for assigning clientCompanyId.
      logAuditEvent({ 
        action: 'CREATE_ENDCUSTOMER_FAIL_USER_NOT_LINKED_TO_COMPANY', 
        userId, 
        details: { role: userProfileWithCompany.role } 
      });
      return { success: false, message: "User is not associated with a client company or not authorized." };
    }
    
    const clientCompanyId = userProfileWithCompany.clientCompany.id;

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

// TODO: Implement getEndCustomersForClient
export async function getEndCustomersForClient(): Promise<{ success: boolean; endCustomers?: EndCustomer[]; message?: string; }> {
  const { userId } = await auth();

  if (!userId) {
    logAuditEvent({ action: 'GET_ENDCUSTOMERS_ATTEMPT_FAIL_UNAUTHENTICATED' });
    return { success: false, message: "Authentication required." };
  }

  try {
    const userProfileWithCompany = await prisma.qCSUserProfile.findUnique({
      where: { id: userId },
      include: { clientCompany: true },
    });

    if (!userProfileWithCompany || !userProfileWithCompany.clientCompany) {
      logAuditEvent({ action: 'GET_ENDCUSTOMERS_FAIL_USER_NOT_LINKED_TO_COMPANY', userId });
      return { success: false, message: "User is not associated with a client company." };
    }

    const clientCompanyId = userProfileWithCompany.clientCompany.id;

    const endCustomers = await executeWithResilience({
      featureKey: 'PRISMA_GET_ENDCUSTOMERS',
      operation: async () => {
        return prisma.endCustomer.findMany({
          where: { clientCompanyId: clientCompanyId },
          orderBy: { name: 'asc' }, // Or by createdAt, etc.
        });
      },
      fallback: async (error: Error) => {
        logAuditEvent({ 
          action: 'GET_ENDCUSTOMERS_FAIL_PRISMA', 
          userId, 
          details: { error: error.message, clientCompanyId } 
        });
        Sentry.captureException(error, { tags: { operation: 'PRISMA_GET_ENDCUSTOMERS_FALLBACK' } });
        throw new Error("Database operation failed to fetch end customers.");
      }
    });
    
    logAuditEvent({ action: 'GET_ENDCUSTOMERS_SUCCESS', userId, details: { clientCompanyId, count: endCustomers.length } });
    return { success: true, endCustomers };

  } catch (error: any) {
    console.error("Error fetching end customers:", error);
    Sentry.captureException(error, { extra: { userId } });
    logAuditEvent({ 
      action: 'GET_ENDCUSTOMERS_FAIL_UNHANDLED', 
      userId, 
      details: { error: error.message } 
    });
    return { success: false, message: error.message || "An unexpected error occurred." };
  }
}

// Schemas and types are now imported from '@/lib/schemas/endcustomer.schemas.ts'

export async function updateEndCustomer(input: UpdateEndCustomerInput): Promise<EndCustomerActionResult> {
  const { userId } = await auth();

  if (!userId) {
    logAuditEvent({ action: 'UPDATE_ENDCUSTOMER_ATTEMPT_FAIL_UNAUTHENTICATED' });
    return { success: false, message: "Authentication required." };
  }

  const validationResult = UpdateEndCustomerSchema.safeParse(input);
  if (!validationResult.success) {
    logAuditEvent({ action: 'UPDATE_ENDCUSTOMER_VALIDATION_FAIL', userId, details: { errors: validationResult.error.issues } });
    return { success: false, message: "Invalid input.", errors: validationResult.error.issues };
  }

  const { id: endCustomerIdToUpdate, ...updateData } = validationResult.data;

  try {
    const userProfileWithCompany = await prisma.qCSUserProfile.findUnique({
      where: { id: userId },
      include: { clientCompany: true },
    });

    if (!userProfileWithCompany || !userProfileWithCompany.clientCompany) {
      logAuditEvent({ action: 'UPDATE_ENDCUSTOMER_FAIL_USER_NOT_LINKED_TO_COMPANY', userId });
      return { success: false, message: "User is not associated with a client company." };
    }
    
    const clientCompanyId = userProfileWithCompany.clientCompany.id;

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

  if (!id || typeof id !== 'string' || !z.string().cuid().safeParse(id).success) {
    logAuditEvent({ action: 'GET_ENDCUSTOMERBYID_INVALID_ID', userId, targetId: id });
    return { success: false, message: "Invalid End Customer ID provided." };
  }
  
  try {
    const userProfileWithCompany = await prisma.qCSUserProfile.findUnique({
      where: { id: userId },
      include: { clientCompany: true },
    });

    if (!userProfileWithCompany || !userProfileWithCompany.clientCompany) {
      logAuditEvent({ action: 'GET_ENDCUSTOMERBYID_FAIL_USER_NOT_LINKED_TO_COMPANY', userId, targetId: id });
      return { success: false, message: "User is not associated with a client company." };
    }
    
    const clientCompanyId = userProfileWithCompany.clientCompany.id;

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
