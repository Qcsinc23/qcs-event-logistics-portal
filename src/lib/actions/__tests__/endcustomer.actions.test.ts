/// <reference types="vitest/globals" />
import { describe, it, expect, vi, beforeEach, afterEach, type Mock } from 'vitest';
import { 
  createEndCustomer, 
  getEndCustomersForClient, 
  updateEndCustomer, 
  getEndCustomerById
} from '../endcustomer.actions';
import { 
  CreateEndCustomerSchema,
  UpdateEndCustomerSchema 
} from '../../schemas/endcustomer.schemas'; // Updated import path
import { z } from 'zod'; // Import z from zod
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { executeWithResilience } from '@/lib/resilience/failure-handler';
import { logAuditEvent } from '@/lib/audit';
import * as Sentry from '@sentry/nextjs';
import type { Prisma, QCSUserProfile, ClientCompany, EndCustomer } from '@/generated/prisma';


// --- Mocks ---
vi.mock('@clerk/nextjs/server', () => ({
  auth: vi.fn(),
}));

vi.mock('@/lib/prisma', () => ({
  prisma: {
    qCSUserProfile: { findUnique: vi.fn() },
    endCustomer: { 
      create: vi.fn(),
      findMany: vi.fn(),
      findFirst: vi.fn(),
      update: vi.fn(),
    },
    // Add other models if they are directly accessed and need mocking
  },
}));

vi.mock('@/lib/resilience/failure-handler', () => ({
  executeWithResilience: vi.fn(async ({ operation }) => operation()), // Default pass-through
}));

vi.mock('@/lib/audit', () => ({ logAuditEvent: vi.fn() }));
vi.mock('@sentry/nextjs', () => ({ captureException: vi.fn(), captureMessage: vi.fn() }));

// --- Test Suite ---
describe('EndCustomer Server Actions', () => {
  const mockUserId = 'user_client_123';
  const mockClientCompanyId = 'company_abc_456';
  const mockUserProfileWithCompany = {
    id: mockUserId,
    email: 'client@company.com',
    role: 'CLIENT',
    clientCompany: { id: mockClientCompanyId, name: 'Test Client Company' },
  } as unknown as QCSUserProfile & { clientCompany: ClientCompany }; // Cast for test purposes

  const mockEndCustomerId = 'cust_end_789';
  const mockEndCustomerData = {
    id: mockEndCustomerId,
    name: 'Test End Customer',
    email: 'endcustomer@test.com',
    clientCompanyId: mockClientCompanyId,
    // ... other fields
  } as EndCustomer;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(auth).mockResolvedValue({ userId: mockUserId } as any); // Default to authenticated user
    vi.mocked(prisma.qCSUserProfile.findUnique).mockResolvedValue(mockUserProfileWithCompany);
    vi.mocked(executeWithResilience).mockImplementation(async ({ operation } : any) => operation());
  });

  // --- createEndCustomer ---
  describe('createEndCustomer', () => {
    const validInput: z.infer<typeof CreateEndCustomerSchema> = {
      name: 'New End Customer',
      email: 'new@customer.com',
      phone: '1234567890',
      address: '123 Main St',
      billingVisibility: true,
    };

    it('should create an end customer successfully', async () => {
      vi.mocked(prisma.endCustomer.create).mockResolvedValue({ ...mockEndCustomerData, ...validInput, id: 'new_cust_id' });
      const result = await createEndCustomer(validInput);
      expect(result.success).toBe(true);
      expect(result.endCustomer).toBeDefined();
      expect(result.endCustomer?.name).toBe(validInput.name);
      expect(prisma.endCustomer.create).toHaveBeenCalledWith(expect.objectContaining({
        data: expect.objectContaining({ ...validInput, clientCompanyId: mockClientCompanyId, email: validInput.email })
      }));
      expect(logAuditEvent).toHaveBeenCalledWith(expect.objectContaining({ action: 'CREATE_ENDCUSTOMER_SUCCESS' }));
    });

    it('should fail if user is not authenticated', async () => {
      vi.mocked(auth).mockResolvedValue({ userId: null } as any);
      const result = await createEndCustomer(validInput);
      expect(result.success).toBe(false);
      expect(result.message).toBe('Authentication required.');
    });

    it('should fail if user profile is not found', async () => {
      vi.mocked(prisma.qCSUserProfile.findUnique).mockResolvedValue(null);
      const result = await createEndCustomer(validInput);
      expect(result.success).toBe(false);
      expect(result.message).toBe('User profile not found.');
    });
    
    it('should fail if user is not linked to a client company', async () => {
      vi.mocked(prisma.qCSUserProfile.findUnique).mockResolvedValue({ ...mockUserProfileWithCompany, clientCompany: null } as any);
      const result = await createEndCustomer(validInput);
      expect(result.success).toBe(false);
      expect(result.message).toContain('User is not associated with a client company');
    });

    it('should handle Prisma creation failure via resilience fallback', async () => {
      const dbError = new Error("DB create failed");
      vi.mocked(executeWithResilience).mockImplementationOnce(async ({ fallback } : any) => fallback(dbError));
      
      await expect(createEndCustomer(validInput)).rejects.toThrow("Database operation failed to create end customer after retries.");
      expect(logAuditEvent).toHaveBeenCalledWith(expect.objectContaining({ action: 'CREATE_ENDCUSTOMER_FAIL_PRISMA' }));
      expect(Sentry.captureException).toHaveBeenCalledWith(dbError, expect.anything());
    });
  });

  // --- getEndCustomersForClient ---
  describe('getEndCustomersForClient', () => {
    it('should return list of end customers for the client', async () => {
      const mockCustomers = [mockEndCustomerData, { ...mockEndCustomerData, id: 'cust_002', name: 'Another Customer' }];
      vi.mocked(prisma.endCustomer.findMany).mockResolvedValue(mockCustomers);
      const result = await getEndCustomersForClient();
      expect(result.success).toBe(true);
      expect(result.endCustomers).toEqual(mockCustomers);
      expect(prisma.endCustomer.findMany).toHaveBeenCalledWith(expect.objectContaining({
        where: { clientCompanyId: mockClientCompanyId }
      }));
    });
    // Add failure cases similar to createEndCustomer (auth, profile, company link)
  });

  // --- updateEndCustomer ---
  describe('updateEndCustomer', () => {
    const updateInput: z.infer<typeof UpdateEndCustomerSchema> = {
      id: mockEndCustomerId,
      name: 'Updated End Customer Name',
    };

    it('should update an existing end customer successfully', async () => {
      vi.mocked(prisma.endCustomer.findFirst).mockResolvedValue(mockEndCustomerData); // Customer exists and belongs to user
      vi.mocked(prisma.endCustomer.update).mockResolvedValue({ ...mockEndCustomerData, name: updateInput.name! });
      
      const result = await updateEndCustomer(updateInput);
      expect(result.success).toBe(true);
      expect(result.endCustomer?.name).toBe(updateInput.name);
      expect(prisma.endCustomer.update).toHaveBeenCalledWith(expect.objectContaining({
        where: { id: mockEndCustomerId },
        data: expect.objectContaining({ name: updateInput.name })
      }));
    });
    // Add failure cases (auth, profile, company link, customer not found/unauthorized)
  });

  // --- getEndCustomerById ---
  describe('getEndCustomerById', () => {
    it('should return a specific end customer if found and authorized', async () => {
      vi.mocked(prisma.endCustomer.findFirst).mockResolvedValue(mockEndCustomerData);
      const result = await getEndCustomerById(mockEndCustomerId);
      expect(result.success).toBe(true);
      expect(result.endCustomer).toEqual(mockEndCustomerData);
      expect(prisma.endCustomer.findFirst).toHaveBeenCalledWith(expect.objectContaining({
        where: { id: mockEndCustomerId, clientCompanyId: mockClientCompanyId }
      }));
    });
    
    it('should fail if end customer ID is invalid', async () => {
      const result = await getEndCustomerById('invalid-id');
      expect(result.success).toBe(false);
      expect(result.message).toBe('Invalid End Customer ID provided.');
    });
    // Add failure cases (auth, profile, company link, customer not found/unauthorized)
  });
});
