import React from 'react';
import OrderCreationForm from './OrderCreationForm'; // Import the form component

export default function CreateOrderPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Create New Logistics Order</h1>
      <p className="mb-4 text-gray-600">
        Fill in the details below to submit a new order for QCS Logistics.
      </p>
      
      <OrderCreationForm />

      {/* Optional: Add any help text or links related to order creation */}
      <div className="mt-8 text-sm text-gray-500">
        <p>
          Need help? Refer to the order creation guide or contact support.
        </p>
      </div>
    </div>
  );
}
