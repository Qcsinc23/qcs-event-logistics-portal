import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import { logAuditEvent } from '@/lib/audit';
import * as Sentry from '@sentry/nextjs';

interface ClientCompanyAuthResult {
  success: boolean;
  clientCompanyId?: string;
  message?: string;
}

export async function getClientCompanyIdForUser(): Promise<ClientCompanyAuthResult> {
  const { userId } = await auth();

  if (!userId) {
    logAuditEvent({ action: 'AUTH_FAIL_UNAUTHENTICATED' });
    return { success: false, message: "Authentication required." };
  }

  try {
    const userProfileWithCompany = await prisma.qCSUserProfile.findUnique({
      where: { id: userId },
      include: { clientCompany: true },
    });

    if (!userProfileWithCompany) {
      logAuditEvent({ action: 'AUTH_FAIL_USER_PROFILE_NOT_FOUND', userId });
      return { success: false, message: "User profile not found." };
    }

    if (userProfileWithCompany.role !== 'CLIENT' || !userProfileWithCompany.clientCompany) {
      logAuditEvent({ 
        action: 'AUTH_FAIL_USER_NOT_LINKED_TO_COMPANY', 
        userId, 
        details: { role: userProfileWithCompany.role } 
      });
      return { success: false, message: "User is not associated with a client company or not authorized." };
    }
    
    return { success: true, clientCompanyId: userProfileWithCompany.clientCompany.id };

  } catch (error: any) {
    console.error("Error getting client company ID for user:", error);
    Sentry.captureException(error, { extra: { userId } });
    logAuditEvent({ 
      action: 'AUTH_FAIL_UNHANDLED', 
      userId, 
      details: { error: error.message } 
    });
    return { success: false, message: error.message || "An unexpected error occurred during authorization." };
  }
}