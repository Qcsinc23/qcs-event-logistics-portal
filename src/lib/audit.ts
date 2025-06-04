import * as Sentry from '@sentry/nextjs';
import { prisma } from './prisma'; // Assuming you might want to log to DB in the future

// Define a basic structure for an audit log entry
interface AuditLogEntry {
  action: string; // e.g., 'USER_LOGIN', 'ORDER_CREATED', 'ADMIN_SETTINGS_CHANGED'
  userId?: string; // ID of the user performing the action (if applicable)
  targetId?: string; // ID of the entity being affected (e.g., orderId, customerId)
  details?: Record<string, any>; // Any additional relevant details
  ipAddress?: string; // Optional: IP address of the requester
  timestamp: Date;
}

// For now, this utility will log to console and Sentry.
// In a more advanced setup, you might write to a dedicated audit log table in the database.

/**
 * Logs an audit event.
 * @param entry - The audit log entry.
 */
export function logAuditEvent(entry: Omit<AuditLogEntry, 'timestamp'>): void {
  const logEntry: AuditLogEntry = {
    ...entry,
    timestamp: new Date(),
  };

  // Log to console (structured for better readability if possible)
  console.log(`AUDIT LOG: [${logEntry.timestamp.toISOString()}] Action: ${logEntry.action}`, logEntry);

  // Send to Sentry as a breadcrumb or custom event for context
  Sentry.addBreadcrumb({
    category: 'audit',
    message: `${logEntry.action}`,
    data: {
      userId: logEntry.userId,
      targetId: logEntry.targetId,
      details: logEntry.details,
      ipAddress: logEntry.ipAddress,
    },
    level: 'info',
    timestamp: logEntry.timestamp.getTime() / 1000, // Sentry expects Unix timestamp in seconds
  });

  // TODO: Future enhancement - Save to database
  // try {
  //   await prisma.auditLog.create({ // Assuming an AuditLog model exists
  //     data: {
  //       action: logEntry.action,
  //       userId: logEntry.userId,
  //       targetId: logEntry.targetId,
  //       details: logEntry.details ? JSON.stringify(logEntry.details) : null,
  //       ipAddress: logEntry.ipAddress,
  //       timestamp: logEntry.timestamp,
  //     },
  //   });
  // } catch (dbError) {
  //   console.error('Failed to save audit log to database:', dbError);
  //   Sentry.captureException(dbError, { extra: { message: "Failed to save audit log to DB", auditEntry: logEntry }});
  // }
}

// Example usage:
// logAuditEvent({
//   action: 'USER_LOGIN_SUCCESS',
//   userId: 'user_clerk_id_123',
//   ipAddress: '192.168.1.100',
//   details: { loginMethod: 'password' }
// });
//
// logAuditEvent({
//   action: 'ORDER_CREATED',
//   userId: 'user_clerk_id_123',
//   targetId: 'order_id_abc',
//   details: { totalAmount: 199.99, items: 3 }
// });
