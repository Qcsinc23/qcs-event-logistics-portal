/// <reference types="vitest/globals" />
/// <reference types="vitest/globals" />
import { describe, it, expect, vi, beforeEach, afterEach, type Mock } from 'vitest'; // type Mock
import { createQCSOrder, CreateOrderSchema, CreateOrderInput } from '../order.actions'; // Adjust path as necessary
import { prisma } from '@/lib/prisma';
import type { Prisma } from '@/generated/prisma'; // Import Prisma namespace for types from generated client path
import { auth } from '@clerk/nextjs/server';
import { executeWithResilience } from '@/lib/resilience/failure-handler';
import { logAuditEvent } from '@/lib/audit';
import { sendEmail } from '@/lib/email';
import * as Sentry from '@sentry/nextjs';

// --- Mocks ---
vi.mock('@clerk/nextjs/server', () => ({
  auth: vi.fn(),
}));

vi.mock('@/lib/prisma', () => ({
  prisma: {
    qCSUserProfile: {
      findUnique: vi.fn(),
    },
    endCustomer: {
      findUnique: vi.fn(),
    },
    order: {
      create: vi.fn(),
      update: vi.fn(),
    },
    orderItem: {
      createMany: vi.fn(),
    },
    $transaction: vi.fn((callback) => callback(prisma)), // Mock $transaction to call the callback with prisma mock
  },
}));

vi.mock('@/lib/resilience/failure-handler', () => ({
  executeWithResilience: vi.fn(async ({ operation }) => operation()), // Default pass-through
}));

vi.mock('@/lib/audit', () => ({
  logAuditEvent: vi.fn(),
}));

vi.mock('@/lib/email', () => ({
  sendEmail: vi.fn().mockResolvedValue({ success: true }),
  getOrderConfirmationHtml: vi.fn().mockReturnValue('<html>Order Confirmed</html>'),
  getCriticalFailureAlertHtml: vi.fn().mockReturnValue('<html>Critical Alert</html>'),
}));

vi.mock('@sentry/nextjs', () => ({
  captureException: vi.fn(),
  captureMessage: vi.fn(),
}));

// --- Test Suite ---
describe('createQCSOrder Server Action', () => {
  // auth is already a mock due to vi.mock at the top
  let mockPrismaUserFindUnique: Mock;
  let mockPrismaEndCustomerFindUnique: Mock;
  let mockPrismaOrderCreate: Mock;
  let mockPrismaOrderItemCreateMany: Mock;
  let mockPrismaOrderUpdate: Mock;
  let mockExecuteWithResilience: Mock;


  const mockUserId = 'user_test_123';
  const mockUserProfile = { id: mockUserId, email: 'test@example.com', firstName: 'Test', role: 'CLIENT' };
  const mockEndCustomer = { id: 'cust_cuid_123', name: 'Test End Customer', clientCompanyId: 'comp_abc' };
  
  const validOrderInput: CreateOrderInput = {
    endCustomerId: mockEndCustomer.id,
    pickupAddress: '123 Pickup St',
    deliveryAddress: '456 Delivery Ave',
    orderItems: [{ description: 'Item 1', quantity: 1 }],
  };

  beforeEach(() => {
    vi.clearAllMocks(); // Clear mocks before each test

    // Setup mock implementations
    // auth is already a mock from vi.mock, cast it for type safety if needed or use vi.mocked
    vi.mocked(auth).mockResolvedValue({ userId: mockUserId, orgId: 'org_test_123', sessionId: 'sess_123', actor: null, getToken: vi.fn(), has: vi.fn(), debug: vi.fn(), claims: null } as any); // Use vi.mocked and cast return as any for simplicity here
    
    mockPrismaUserFindUnique = prisma.qCSUserProfile.findUnique as Mock;
    mockPrismaEndCustomerFindUnique = prisma.endCustomer.findUnique as Mock;
    mockPrismaOrderCreate = prisma.order.create as Mock;
    mockPrismaOrderItemCreateMany = prisma.orderItem.createMany as Mock;
    mockPrismaOrderUpdate = prisma.order.update as Mock;
    mockExecuteWithResilience = executeWithResilience as Mock; // Changed to Mock
    
    // Default successful mock implementations
    mockPrismaUserFindUnique.mockResolvedValue(mockUserProfile as any);
    mockPrismaEndCustomerFindUnique.mockResolvedValue(mockEndCustomer as any);
    mockPrismaOrderCreate.mockImplementation(async (args: Prisma.OrderCreateArgs) => ({ // Added type for args
      id: `order_${Date.now()}`,
      // orderNumber is part of args.data, so no need to specify it twice if spreading args.data
      ...args.data, 
    }));
    mockPrismaOrderItemCreateMany.mockResolvedValue({ count: 1 });
    mockPrismaOrderUpdate.mockResolvedValue({} as any);
    
    // Default pass-through for executeWithResilience
    mockExecuteWithResilience.mockImplementation(async ({ operation } : { operation: () => Promise<any>}) => {
      return operation();
    });
  });

  it('should return unauthenticated if no userId', async () => {
    vi.mocked(auth).mockResolvedValue({ userId: null, orgId: null, sessionId: null, actor: null, getToken: vi.fn(), has: vi.fn(), debug: vi.fn(), claims: null } as any); // Use vi.mocked
    const result = await createQCSOrder(validOrderInput);
    expect(result.success).toBe(false);
    expect(result.message).toBe('Authentication required.');
    expect(logAuditEvent).toHaveBeenCalledWith(expect.objectContaining({ action: 'CREATE_ORDER_ATTEMPT_FAIL_UNAUTHENTICATED' }));
  });

  it('should return validation error for invalid input', async () => {
    const invalidInput = { ...validOrderInput, pickupAddress: '' }; // Invalid pickup address
    const result = await createQCSOrder(invalidInput as CreateOrderInput);
    expect(result.success).toBe(false);
    expect(result.message).toBe('Invalid input.');
    expect(result.errors).toBeDefined();
    expect(result.errors?.some(e => e.path.includes('pickupAddress'))).toBe(true);
    expect(logAuditEvent).toHaveBeenCalledWith(expect.objectContaining({ action: 'CREATE_ORDER_VALIDATION_FAIL' }));
  });

  it('should return error if user profile not found', async () => {
    mockPrismaUserFindUnique.mockResolvedValue(null);
    const result = await createQCSOrder(validOrderInput);
    expect(result.success).toBe(false);
    expect(result.message).toBe('User profile not found.');
    expect(logAuditEvent).toHaveBeenCalledWith(expect.objectContaining({ action: 'CREATE_ORDER_FAIL_USER_PROFILE_NOT_FOUND' }));
  });

  it('should return error if end customer not found', async () => {
    mockPrismaEndCustomerFindUnique.mockResolvedValue(null);
    const result = await createQCSOrder(validOrderInput);
    expect(result.success).toBe(false);
    expect(result.message).toContain('End customer with ID');
    expect(result.message).toContain('not found.');
    expect(logAuditEvent).toHaveBeenCalledWith(expect.objectContaining({ action: 'CREATE_ORDER_FAIL_ENDCUSTOMER_NOT_FOUND' }));
  });
  
  describe('Successful Order Creation', () => {
    it('should create order, sync with Detrack (mocked), and send email on full success', async () => {
      // Mock callDetrackCreateJobAPI (which is internal to order.actions.ts)
      // This is tricky to mock directly. We rely on executeWithResilience for the Detrack part.
      // For this test, we'll assume the internal callDetrackCreateJobAPI mock within order.actions.ts works as "simulateDetrackSuccess = true"
      // Or, we can mock executeWithResilience specifically for the DETRACK_CREATE_JOB key.
      
      mockExecuteWithResilience.mockImplementation(async ({ featureKey, operation } : { featureKey: string, operation: () => Promise<any>}) => {
        if (featureKey === 'DETRACK_CREATE_JOB') {
          return { success: true, detrackJobId: 'DETRACK_MOCK_ID_123' };
        }
        return operation(); // For PRISMA_CREATE_ORDER
      });

      const result = await createQCSOrder(validOrderInput);

      expect(result.success).toBe(true);
      expect(result.message).toBe('Order created successfully!');
      expect(result.orderId).toBeDefined();
      expect(result.orderNumber).toBeDefined();
      expect(prisma.order.create).toHaveBeenCalledTimes(1);
      expect(prisma.orderItem.createMany).toHaveBeenCalledTimes(1);
      expect(prisma.order.update).toHaveBeenCalledWith(expect.objectContaining({ data: { detrackJobId: 'DETRACK_MOCK_ID_123', status: 'CONFIRMED' } }));
      expect(sendEmail).toHaveBeenCalledWith(expect.objectContaining({ subject: `Order Confirmation: ${result.orderNumber}` }));
      expect(logAuditEvent).toHaveBeenCalledWith(expect.objectContaining({ action: 'CREATE_ORDER_SUCCESS_DETRACK_SYNCED' }));
    });

    it('should handle Detrack API failure gracefully (fallback behavior)', async () => {
      mockExecuteWithResilience.mockImplementation(async ({ featureKey, operation, fallback } : { featureKey: string, operation: () => Promise<any>, fallback?: (e:Error) => Promise<any>}) => {
        if (featureKey === 'DETRACK_CREATE_JOB') {
          // Simulate the fallback being called within executeWithResilience
          if(fallback) return fallback(new Error("Simulated Detrack API failure for fallback test"));
          return { success: false, error: "Simulated Detrack API failure for fallback test" };
        }
        return operation(); // For PRISMA_CREATE_ORDER
      });

      const result = await createQCSOrder(validOrderInput);
      
      expect(result.success).toBe(true); // Partial success
      expect(result.message).toContain('Order created successfully');
      expect(result.message).toContain('but failed to sync with Detrack');
      expect(prisma.order.create).toHaveBeenCalledTimes(1);
      expect(prisma.order.update).toHaveBeenCalledWith(expect.objectContaining({ data: { status: 'PROBLEM', notes: expect.stringContaining("Failed to sync with Detrack") } }));
      expect(sendEmail).toHaveBeenCalledWith(expect.objectContaining({ subject: expect.stringContaining('Created with Detrack Sync Issue') }));
      expect(logAuditEvent).toHaveBeenCalledWith(expect.objectContaining({ action: 'CREATE_ORDER_PARTIAL_SUCCESS_DETRACK_FAIL' }));
    });
  });

  // TODO: More test cases:
  // - Prisma transaction failure (mock executeWithResilience for PRISMA_CREATE_ORDER to throw/call fallback)
  // - Role-based authorization failure (once implemented)
  // - Email sending failure (should not fail the whole operation)
  // - Specific error messages for different failure points
});
