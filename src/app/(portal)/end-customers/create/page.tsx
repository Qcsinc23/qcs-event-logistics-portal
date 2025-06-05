import React from 'react';
import EndCustomerCreationForm from './EndCustomerCreationForm'; // Import the form component
import Link from 'next/link';

export default function CreateEndCustomerPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/(portal)/end-customers" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 hover:underline">
          &larr; Back to End Customers
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-dark-text-primary">Create New End Customer</h1>
      <p className="mb-4 text-gray-600 dark:text-dark-text-secondary">
        Provide the details for the new end customer.
      </p>
      
      <EndCustomerCreationForm />
    </div>
  );
}
