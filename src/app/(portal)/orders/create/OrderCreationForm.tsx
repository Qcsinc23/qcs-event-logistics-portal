"use client";

import React, { useState, useTransition } from 'react';
import { useForm, SubmitHandler, Controller, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateOrderSchema, CreateOrderInput, OrderItemSchema } from '@/lib/actions/order.actions'; // Adjust path if necessary
import { createQCSOrder } from '@/lib/actions/order.actions'; // Adjust path if necessary
import { z } from 'zod';

// Infer the type for a single order item from the Zod schema
type OrderItemFormInput = z.infer<typeof OrderItemSchema>;

export default function OrderCreationForm() {
  const [isPending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  const { 
    register, 
    handleSubmit, 
    control,
    formState: { errors, isSubmitting },
    reset 
  } = useForm<CreateOrderInput>({
    resolver: zodResolver(CreateOrderSchema),
    defaultValues: {
      endCustomerId: '', // Needs a way to select this, e.g., dropdown
      pickupAddress: '',
      deliveryAddress: '',
      orderItems: [{ description: '', quantity: 1 }], // Start with one item
      notes: '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "orderItems",
  });

  const onSubmit: SubmitHandler<CreateOrderInput> = async (data) => {
    setFormError(null);
    setFormSuccess(null);

    startTransition(async () => {
      try {
        const result = await createQCSOrder(data);
        if (result.success) {
          setFormSuccess(result.message || "Order created successfully!");
          reset(); // Reset form on success
        } else {
          setFormError(result.message || "Failed to create order.");
          // TODO: Handle result.errors (Zod field errors from server) if needed,
          // though client-side Zod should catch most.
          if (result.errors) {
            console.error("Server validation errors:", result.errors);
            // You might want to map these to form errors if they aren't caught client-side
          }
        }
      } catch (error) {
        console.error("Submission error:", error);
        setFormError(error instanceof Error ? error.message : "An unexpected error occurred.");
      }
    });
  };

  // Basic Tailwind-styled input component for reusability
  const InputField = ({ name, label, type = "text", registerFn, errorMsg }: any) => (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input 
        id={name}
        type={type}
        {...registerFn(name, type === 'number' ? { valueAsNumber: true } : {})}
        className={`mt-1 block w-full px-3 py-2 border ${errorMsg ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`} 
      />
      {errorMsg && <p className="mt-1 text-xs text-red-600">{errorMsg}</p>}
    </div>
  );
  
  const TextAreaField = ({ name, label, registerFn, errorMsg }: any) => (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <textarea
        id={name}
        rows={3}
        {...registerFn(name)}
        className={`mt-1 block w-full px-3 py-2 border ${errorMsg ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
      />
      {errorMsg && <p className="mt-1 text-xs text-red-600">{errorMsg}</p>}
    </div>
  );


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow">
      {formError && <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">{formError}</div>}
      {formSuccess && <div className="p-3 mb-4 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">{formSuccess}</div>}

      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-3">Order Details</h2>
        {/* TODO: Replace with a proper End Customer selection (e.g., dropdown from fetched data) */}
        <InputField name="endCustomerId" label="End Customer ID (Placeholder - CUID)" registerFn={register} errorMsg={errors.endCustomerId?.message} />
        
        <InputField name="pickupAddress" label="Pickup Address" registerFn={register} errorMsg={errors.pickupAddress?.message} />
        <InputField name="deliveryAddress" label="Delivery Address" registerFn={register} errorMsg={errors.deliveryAddress?.message} />
        
        <InputField name="pickupDateTime" label="Pickup Date/Time (Optional)" type="datetime-local" registerFn={register} errorMsg={errors.pickupDateTime?.message} />
        <InputField name="deliveryDateTime" label="Delivery Date/Time (Optional)" type="datetime-local" registerFn={register} errorMsg={errors.deliveryDateTime?.message} />
        
        <TextAreaField name="notes" label="Notes (Optional)" registerFn={register} errorMsg={errors.notes?.message} />
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-3">Order Items</h2>
        {fields.map((field, index) => (
          <div key={field.id} className="p-4 border border-gray-200 rounded-md mb-4 space-y-3">
            <InputField name={`orderItems.${index}.description`} label={`Item ${index + 1} Description`} registerFn={register} errorMsg={errors.orderItems?.[index]?.description?.message} />
            <InputField name={`orderItems.${index}.quantity`} label="Quantity" type="number" registerFn={register} errorMsg={errors.orderItems?.[index]?.quantity?.message} />
            <InputField name={`orderItems.${index}.weight`} label="Weight (Optional)" type="number" step="0.01" registerFn={register} errorMsg={errors.orderItems?.[index]?.weight?.message} />
            <InputField name={`orderItems.${index}.dimensions`} label="Dimensions (LxWxH, Optional)" registerFn={register} errorMsg={errors.orderItems?.[index]?.dimensions?.message} />
            <button type="button" onClick={() => remove(index)} className="text-xs text-red-600 hover:text-red-800">
              Remove Item
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => append({ description: '', quantity: 1 })}
          className="mt-2 px-3 py-1.5 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-md border border-indigo-300"
        >
          Add Item
        </button>
        {errors.orderItems?.root?.message && <p className="mt-1 text-xs text-red-600">{errors.orderItems.root.message}</p>}
        {errors.orderItems?.message && <p className="mt-1 text-xs text-red-600">{errors.orderItems.message}</p>}

      </div>

      <div className="pt-5">
        <button
          type="submit"
          disabled={isPending || isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isPending || isSubmitting ? 'Submitting Order...' : 'Create Order'}
        </button>
      </div>
    </form>
  );
}
