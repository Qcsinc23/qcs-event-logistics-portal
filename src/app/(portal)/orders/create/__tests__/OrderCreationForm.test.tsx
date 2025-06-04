/// <reference types="vitest/globals" />
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import OrderCreationForm from '../OrderCreationForm'; // Adjust path to your component
import { createQCSOrder } from '@/lib/actions/order.actions'; // Adjust path

// --- Mocks ---
vi.mock('@/lib/actions/order.actions', () => ({
  createQCSOrder: vi.fn(),
  // Mocking CreateOrderSchema and OrderItemSchema if they were used directly for validation
  // in a way that the mock needs to provide them, but usually not necessary for component tests
  // if the component relies on the resolver.
  CreateOrderSchema: { parse: vi.fn(data => data), safeParse: vi.fn(data => ({ success: true, data })) }, // Basic mock
  OrderItemSchema: { parse: vi.fn(data => data), safeParse: vi.fn(data => ({ success: true, data })) }, // Basic mock
}));

// Mock useTransition
vi.mock('react', async (importOriginal) => {
  const actualReact = await importOriginal<typeof React>();
  return {
    ...actualReact,
    useTransition: () => [false, vi.fn((callback) => callback())], // [isPending, startTransition]
  };
});


describe('<OrderCreationForm />', () => {
  let mockCreateQCSOrder: ReturnType<typeof vi.mocked<typeof createQCSOrder>>;

  beforeEach(() => {
    vi.clearAllMocks();
    mockCreateQCSOrder = createQCSOrder as ReturnType<typeof vi.mocked<typeof createQCSOrder>>;
  });

  it('renders all required form fields', () => {
    render(<OrderCreationForm />);
    expect(screen.getByLabelText(/End Customer ID/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Pickup Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Delivery Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Item 1 Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Quantity/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add Item/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Create Order/i })).toBeInTheDocument();
  });

  it('allows adding and removing order items', async () => {
    render(<OrderCreationForm />);
    const addItemButton = screen.getByRole('button', { name: /Add Item/i });
    
    fireEvent.click(addItemButton);
    await screen.findByLabelText(/Item 2 Description/i);
    expect(screen.getByLabelText(/Item 2 Description/i)).toBeInTheDocument();

    const removeButtons = screen.getAllByRole('button', { name: /Remove Item/i });
    expect(removeButtons).toHaveLength(2);
    fireEvent.click(removeButtons[1]); // Remove the second item

    await waitFor(() => {
      expect(screen.queryByLabelText(/Item 2 Description/i)).not.toBeInTheDocument();
    });
    expect(screen.getAllByRole('button', { name: /Remove Item/i })).toHaveLength(1);
  });

  it('shows validation errors for required fields on submit', async () => {
    render(<OrderCreationForm />);
    const submitButton = screen.getByRole('button', { name: /Create Order/i });
    fireEvent.click(submitButton);

    // Check for a few expected error messages
    // Note: exact messages depend on Zod schema and react-hook-form error rendering
    expect(await screen.findByText(/Invalid End Customer ID./i)).toBeInTheDocument(); // From CUID validation
    expect(await screen.findByText(/Pickup address is required./i)).toBeInTheDocument();
    expect(await screen.findByText(/Delivery address is required./i)).toBeInTheDocument();
    expect(await screen.findByText(/Item description is required./i)).toBeInTheDocument();
  });

  it('calls createQCSOrder server action with form data on successful submit', async () => {
    mockCreateQCSOrder.mockResolvedValueOnce({ success: true, message: 'Order submitted!' });
    render(<OrderCreationForm />);

    // Fill in form data
    fireEvent.change(screen.getByLabelText(/End Customer ID/i), { target: { value: 'cust_123abc789xyz' } }); // Example CUID
    fireEvent.change(screen.getByLabelText(/Pickup Address/i), { target: { value: '100 Pickup Lane' } });
    fireEvent.change(screen.getByLabelText(/Delivery Address/i), { target: { value: '200 Delivery Road' } });
    fireEvent.change(screen.getByLabelText(/Item 1 Description/i), { target: { value: 'Test Item Alpha' } });
    fireEvent.change(screen.getByLabelText(/Quantity/i), { target: { value: '2' } });

    const submitButton = screen.getByRole('button', { name: /Create Order/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockCreateQCSOrder).toHaveBeenCalledTimes(1);
      expect(mockCreateQCSOrder).toHaveBeenCalledWith({
        endCustomerId: 'cust_123abc789xyz',
        pickupAddress: '100 Pickup Lane',
        deliveryAddress: '200 Delivery Road',
        orderItems: [{ description: 'Test Item Alpha', quantity: 2, weight: undefined, dimensions: undefined }],
        notes: '', // Default value
        pickupDateTime: undefined, // Default
        deliveryDateTime: undefined, // Default
      });
    });
    expect(await screen.findByText('Order submitted!')).toBeInTheDocument();
  });

  it('displays server error message if createQCSOrder fails', async () => {
    mockCreateQCSOrder.mockResolvedValueOnce({ success: false, message: 'Server failed to create order.' });
    render(<OrderCreationForm />);

    fireEvent.change(screen.getByLabelText(/End Customer ID/i), { target: { value: 'cust_123abc789xyz' } });
    fireEvent.change(screen.getByLabelText(/Pickup Address/i), { target: { value: '100 Pickup Lane' } });
    fireEvent.change(screen.getByLabelText(/Delivery Address/i), { target: { value: '200 Delivery Road' } });
    fireEvent.change(screen.getByLabelText(/Item 1 Description/i), { target: { value: 'Test Item Alpha' } });
    fireEvent.change(screen.getByLabelText(/Quantity/i), { target: { value: '1' } });
    
    const submitButton = screen.getByRole('button', { name: /Create Order/i });
    fireEvent.click(submitButton);

    expect(await screen.findByText('Server failed to create order.')).toBeInTheDocument();
  });

  // TODO: Test loading state (isPending from useTransition)
  // TODO: Test server-side Zod validation errors display (if result.errors is handled)
});
