import React from 'react';
import Link from 'next/link';
import { getEndCustomersForClient } from '@/lib/actions/endcustomer.actions'; // Adjust path if necessary
import type { EndCustomer } from '@/generated/prisma';

// A simple component to display each end customer in the list
const EndCustomerCard = ({ customer }: { customer: EndCustomer }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-semibold text-indigo-700">{customer.name}</h3>
      {customer.email && <p className="text-sm text-gray-600">Email: {customer.email}</p>}
      {customer.phone && <p className="text-sm text-gray-600">Phone: {customer.phone}</p>}
      {/* TODO: Add links to view details / edit customer */}
      <div className="mt-3">
        <Link href={`/(portal)/end-customers/edit/${customer.id}`} className="text-xs text-indigo-600 hover:text-indigo-800 mr-2">
          Edit
        </Link>
        {/* <Link href={`/(portal)/end-customers/${customer.id}`} className="text-xs text-green-600 hover:text-green-800">
          View Details
        </Link> */}
      </div>
    </div>
  );
};

export default async function EndCustomersPage() {
  const result = await getEndCustomersForClient();

  if (!result.success || !result.endCustomers) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Manage End Customers</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{result.message || "Could not load end customers."}</span>
        </div>
      </div>
    );
  }

  const { endCustomers } = result;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Manage End Customers</h1>
        <Link href="/(portal)/end-customers/create">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            + Create New End Customer
          </button>
        </Link>
      </div>

      {endCustomers.length === 0 ? (
        <div className="text-center py-10 bg-white shadow-md rounded-lg">
          <p className="text-gray-500 text-lg">No end customers found.</p>
          <p className="text-gray-400 mt-2">Click the button above to add your first end customer.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {endCustomers.map((customer) => (
            <EndCustomerCard key={customer.id} customer={customer} />
          ))}
        </div>
      )}
    </div>
  );
}
