"use client";

import React, { useState, useTransition, useEffect } from 'react';
import { useForm, SubmitHandler, Controller, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateOrderSchema, CreateOrderInput, OrderItemSchema } from '@/lib/actions/order.actions';
import { createQCSOrder } from '@/lib/actions/order.actions';
import { getEndCustomersForClient } from '@/lib/actions/endcustomer.actions';
import { z } from 'zod';
import InputField from '@/components/forms/InputField';
import TextAreaField from '@/components/forms/TextAreaField';
import Spinner from '@/components/Spinner';
import type { EndCustomer } from '@/generated/prisma';

type OrderItemFormInput = z.infer<typeof OrderItemSchema>;

export default function OrderCreationForm() {
  const [isPending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [endCustomers, setEndCustomers] = useState<Pick<EndCustomer, 'id' | 'name' | 'address'>[]>([]);
  const [showNewCustomerFields, setShowNewCustomerFields] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<CreateOrderInput>({
    resolver: zodResolver(CreateOrderSchema),
    defaultValues: {
      pickupAddress: '',
      orderItems: [{ description: '', quantity: 1 }],
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white dark:bg-dark-surface p-6 rounded-lg shadow">
      {formError && <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 dark:text-red-300 dark:bg-red-900 rounded-lg" role="alert">{formError}</div>}
      {formSuccess && <div className="p-3 mb-4 text-sm text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-900 rounded-lg" role="alert">{formSuccess}</div>}

      <div>
        <h2 className="text-xl font-semibold text-gray-700 dark:text-dark-text-primary mb-3">Order Details</h2>
        {/* TODO: Replace with a proper End Customer selection (e.g., dropdown from fetched data) */}
        <div className="mb-4">
          <label htmlFor="endCustomerSelect" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary">Select End Customer</label>
          <select
            id="endCustomerSelect"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-slate-800 dark:border-slate-700"
            onChange={(e) => {
              const selectedId = e.target.value;
              if (selectedId === 'new') {
                setShowNewCustomerFields(true);
                setValue('endCustomerId', undefined);
                setValue('deliveryAddress', '');
              } else {
                setShowNewCustomerFields(false);
                const selectedCustomer = endCustomers.find(c => c.id === selectedId);
                setValue('endCustomerId', selectedId);
                setValue('deliveryAddress', selectedCustomer?.address || '');
              }
            }}
          >
            <option value="">Select a customer...</option>
            {endCustomers.map(customer => (
              <option key={customer.id} value={customer.id}>{customer.name}</option>
            ))}
            <option value="new">-- Create New Customer --</option>
          </select>
        </div>

        {showNewCustomerFields && (
          <div className="p-4 border-l-4 border-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 my-4">
            <h3 className="text-lg font-semibold mb-2">New Customer Details</h3>
            <InputField name="newCustomerName" label="New Customer Name" registerFn={register} errorMsg={errors.newCustomerName?.message} />
            <InputField name="newCustomerEmail" label="New Customer Email (Optional)" type="email" registerFn={register} errorMsg={errors.newCustomerEmail?.message} />
            <InputField name="newCustomerPhone" label="New Customer Phone (Optional)" registerFn={register} errorMsg={errors.newCustomerPhone?.message} />
            <InputField name="newCustomerAddress" label="New Customer Address" registerFn={register} errorMsg={errors.newCustomerAddress?.message} />
            <div className="mt-2 flex items-center">
              <input id="saveNewCustomer" type="checkbox" {...register("saveNewCustomer")} className="h-4 w-4 text-indigo-600 rounded" />
              <label htmlFor="saveNewCustomer" className="ml-2 text-sm">Save this customer for future orders</label>
            </div>
          </div>
        )}
        
        <InputField name="pickupAddress" label="Pickup Address" registerFn={register} errorMsg={errors.pickupAddress?.message} />
        <InputField name="deliveryAddress" label="Delivery Address" registerFn={register} errorMsg={errors.deliveryAddress?.message} />
        
        <InputField name="pickupDateTime" label="Pickup Date/Time (Optional)" type="datetime-local" registerFn={register} errorMsg={errors.pickupDateTime?.message} />
        <InputField name="deliveryDateTime" label="Delivery Date/Time (Optional)" type="datetime-local" registerFn={register} errorMsg={errors.deliveryDateTime?.message} />
        
        <TextAreaField name="notes" label="Notes (Optional)" registerFn={register} errorMsg={errors.notes?.message} />
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-700 dark:text-dark-text-primary mb-3">Order Items</h2>
        {fields.map((field, index) => (
          <div key={field.id} className="p-4 border border-gray-200 dark:border-slate-700 rounded-md mb-4 space-y-3">
            <InputField name={`orderItems.${index}.description`} label={`Item ${index + 1} Description`} registerFn={register} errorMsg={errors.orderItems?.[index]?.description?.message} />
            <InputField name={`orderItems.${index}.quantity`} label="Quantity" type="number" registerFn={register} errorMsg={errors.orderItems?.[index]?.quantity?.message} />
            <InputField name={`orderItems.${index}.weight`} label="Weight (Optional)" type="number" step="0.01" registerFn={register} errorMsg={errors.orderItems?.[index]?.weight?.message} />
            <InputField name={`orderItems.${index}.dimensions`} label="Dimensions (LxWxH, Optional)" registerFn={register} errorMsg={errors.orderItems?.[index]?.dimensions?.message} />
            <button type="button" onClick={() => remove(index)} className="text-xs text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
              Remove Item
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => append({ description: '', quantity: 1 })}
          className="mt-2 px-3 py-1.5 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 dark:text-indigo-300 dark:bg-indigo-900 dark:hover:bg-indigo-800 rounded-md border border-indigo-300 dark:border-indigo-700"
        >
          Add Item
        </button>
        {errors.orderItems?.root?.message && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.orderItems.root.message}</p>}
        {errors.orderItems?.message && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.orderItems.message}</p>}

      </div>

      <div className="pt-5">
        <button
          type="submit"
          disabled={isPending || isSubmitting}
          className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-dark-primary-action dark:hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isPending || isSubmitting ? (
            <>
              <Spinner size="sm" className="mr-2" />
              Submitting Order...
            </>
          ) : (
            'Create Order'
          )}
        </button>
      </div>
    </form>
  );
}
