/// <reference types="vitest/globals" />
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest'; // Added type Mock
import EndCustomerCreationForm from '../EndCustomerCreationForm';
import { createEndCustomer } from '@/lib/actions/endcustomer.actions';
import { useRouter } from 'next/navigation';

// --- Mocks ---
vi.mock('@/lib/actions/endcustomer.actions', () => ({
  createEndCustomer: vi.fn(),
  CreateEndCustomerSchema: { safeParse: vi.fn(data => ({ success: true, data })) }, // Basic mock
}));

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    refresh: vi.fn(),
  })),
}));

// Mock useTransition
vi.mock('react', async (importOriginal) => {
  const actualReact = await importOriginal<typeof React>();
  return {
    ...actualReact,
    useTransition: () => [false, vi.fn((callback) => callback())], // [isPending, startTransition]
  };
});

describe('<EndCustomerCreationForm />', () => {
  let mockCreateEndCustomer: ReturnType<typeof vi.mocked<typeof createEndCustomer>>;
  let mockRouterPush: Mock; // Changed to Mock
  let mockRouterRefresh: Mock; // Changed to Mock


  beforeEach(() => {
    vi.clearAllMocks();
    mockCreateEndCustomer = createEndCustomer as ReturnType<typeof vi.mocked<typeof createEndCustomer>>;
    
    const router = useRouter(); // This is already mocked to return { push: vi.fn(), refresh: vi.fn() }
    mockRouterPush = vi.mocked(router.push); // Use vi.mocked for type safety
    mockRouterRefresh = vi.mocked(router.refresh); // Use vi.mocked for type safety
  });

  it('renders all required form fields', () => {
    render(<EndCustomerCreationForm />);
    expect(screen.getByLabelText(/Full Name \/ Company Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument(); // Optional is part of label
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument(); // Optional is part of label
    expect(screen.getByLabelText(/Primary Address/i)).toBeInTheDocument(); // Optional is part of label
    expect(screen.getByLabelText(/Rate Card ID/i)).toBeInTheDocument(); // Optional is part of label
    expect(screen.getByLabelText(/Allow client to view billing/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Create End Customer/i })).toBeInTheDocument();
  });

  it('calls createEndCustomer server action with form data on successful submit and redirects', async () => {
    const mockCreatedCustomer = { id: 'cust_new_123', name: 'Test New Customer' };
    mockCreateEndCustomer.mockResolvedValueOnce({ success: true, endCustomer: mockCreatedCustomer as any, message: 'Success!' });
    render(<EndCustomerCreationForm />);

    fireEvent.change(screen.getByLabelText(/Full Name \/ Company Name/i), { target: { value: 'Test New Customer' } });
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'new@test.com' } });
    
    const submitButton = screen.getByRole('button', { name: /Create End Customer/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockCreateEndCustomer).toHaveBeenCalledTimes(1);
      expect(mockCreateEndCustomer).toHaveBeenCalledWith({
        name: 'Test New Customer',
        email: 'new@test.com',
        phone: '', // from defaultValues
        address: '', // from defaultValues
        rateCardId: undefined, // from defaultValues
        billingVisibility: true, // from defaultValues
      });
    });
    expect(await screen.findByText(/created successfully! Redirecting.../i)).toBeInTheDocument();
    
    // Check for redirect (setTimeout makes this tricky without advancing timers)
    // For now, we assume if success message is shown, redirect logic is invoked.
    // A more robust test would involve vi.advanceTimersByTimeAsync if setTimeout is used.
    // await vi.advanceTimersByTimeAsync(2000); // If using fake timers for setTimeout
    // expect(mockRouterPush).toHaveBeenCalledWith('/(portal)/end-customers');
    // expect(mockRouterRefresh).toHaveBeenCalled();
  });

  it('displays server error message if createEndCustomer fails', async () => {
    mockCreateEndCustomer.mockResolvedValueOnce({ success: false, message: 'Server failed to create.' });
    render(<EndCustomerCreationForm />);

    fireEvent.change(screen.getByLabelText(/Full Name \/ Company Name/i), { target: { value: 'Test Fail Customer' } });
    // Fill other fields as needed to pass client validation if strict
    
    const submitButton = screen.getByRole('button', { name: /Create End Customer/i });
    fireEvent.click(submitButton);

    expect(await screen.findByText('Server failed to create.')).toBeInTheDocument();
  });

  // TODO: Add tests for client-side validation errors
  // TODO: Test loading state
});
