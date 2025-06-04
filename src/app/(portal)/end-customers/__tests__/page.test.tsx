/// <reference types="vitest/globals" />
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import EndCustomersPage from '../page'; // Adjust path to your page component
import { getEndCustomersForClient } from '@/lib/actions/endcustomer.actions';
import type { EndCustomer } from '@/generated/prisma';

// --- Mocks ---
vi.mock('@/lib/actions/endcustomer.actions', () => ({
  getEndCustomersForClient: vi.fn(),
}));

// Mock Next.js Link component for basic rendering
vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

describe('<EndCustomersPage />', () => {
  let mockGetEndCustomersForClient: ReturnType<typeof vi.mocked<typeof getEndCustomersForClient>>;

  beforeEach(() => {
    vi.clearAllMocks();
    mockGetEndCustomersForClient = getEndCustomersForClient as ReturnType<typeof vi.mocked<typeof getEndCustomersForClient>>;
  });

  it('renders a list of end customers when data is fetched successfully', async () => {
    const mockCustomers: EndCustomer[] = [
      { id: 'cust1', name: 'Customer Alpha', email: 'alpha@test.com', phone: '111', address: 'Addr1', clientCompanyId: 'comp1', rateCardId: null, billingVisibility: true, createdAt: new Date(), updatedAt: new Date() },
      { id: 'cust2', name: 'Customer Beta', email: 'beta@test.com', phone: '222', address: 'Addr2', clientCompanyId: 'comp1', rateCardId: null, billingVisibility: false, createdAt: new Date(), updatedAt: new Date() },
    ];
    mockGetEndCustomersForClient.mockResolvedValueOnce({ success: true, endCustomers: mockCustomers });

    // Since the page component is async, we need to await its rendering or interactions
    // For server components, testing often involves awaiting the component itself if it's directly async.
    // Or, if using React Testing Library with async server components, ensure proper setup.
    // Here, we'll render and then wait for elements.
    const { container } = render(await EndCustomersPage());

    await waitFor(() => {
      expect(screen.getByText('Customer Alpha')).toBeInTheDocument();
      expect(screen.getByText('Email: alpha@test.com')).toBeInTheDocument();
      expect(screen.getByText('Customer Beta')).toBeInTheDocument();
      expect(screen.getByText('Email: beta@test.com')).toBeInTheDocument();
    });
    expect(screen.getByRole('button', { name: /\+ Create New End Customer/i })).toBeInTheDocument();
  });

  it('renders an empty state message if no end customers are found', async () => {
    mockGetEndCustomersForClient.mockResolvedValueOnce({ success: true, endCustomers: [] });
    render(await EndCustomersPage());

    await waitFor(() => {
      expect(screen.getByText('No end customers found.')).toBeInTheDocument();
    });
  });

  it('renders an error message if fetching end customers fails', async () => {
    mockGetEndCustomersForClient.mockResolvedValueOnce({ success: false, message: 'Failed to load data.' });
    render(await EndCustomersPage());

    await waitFor(() => {
      expect(screen.getByText(/Error:/i)).toBeInTheDocument();
      expect(screen.getByText('Failed to load data.')).toBeInTheDocument();
    });
  });

  it('renders an error message if getEndCustomersForClient throws', async () => {
    mockGetEndCustomersForClient.mockRejectedValueOnce(new Error('Network Error'));
    render(await EndCustomersPage()); // This might throw if not caught by an error boundary in the component itself

    // The component should ideally catch this and display an error.
    // If it re-throws, the test would fail here or RTL would show console error.
    // For this test, we assume the component handles it and shows a generic error.
    // The current page component does show a message if result.success is false.
    await waitFor(() => {
        expect(screen.getByText(/Error:/i)).toBeInTheDocument();
        // The message might be generic if the promise rejects without a specific structure
        expect(screen.getByText(/Could not load end customers./i)).toBeInTheDocument(); 
    });
  });
});
