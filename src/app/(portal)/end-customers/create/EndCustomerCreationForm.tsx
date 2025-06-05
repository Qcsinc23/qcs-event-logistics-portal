"use client";

import React, { useState, useTransition } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateEndCustomerSchema, type CreateEndCustomerInput } from '@/lib/schemas/endcustomer.schemas'; // Updated import
import { createEndCustomer } from '@/lib/actions/endcustomer.actions';
import { useRouter } from 'next/navigation'; // For redirecting after success
import InputField from '@/components/forms/InputField'; // Import shared InputField
import Spinner from '@/components/Spinner'; // Import Spinner
// TextAreaField is not used in this specific form, but good to have for others

export default function EndCustomerCreationForm() {
  const [isPending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    // control, // For Controller if using complex inputs like Select for RateCardId
  } = useForm<CreateEndCustomerInput>({
    resolver: zodResolver(CreateEndCustomerSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      rateCardId: undefined, // Optional
      billingVisibility: true,
    },
  });

  const onSubmit: SubmitHandler<CreateEndCustomerInput> = async (data) => {
    setFormError(null);
    setFormSuccess(null);

    startTransition(async () => {
      try {
        const result = await createEndCustomer(data);
        if (result.success && result.endCustomer) {
          setFormSuccess(`End customer "${result.endCustomer.name}" created successfully! Redirecting...`);
          reset();
          // Redirect to the end customers list page after a short delay
          setTimeout(() => {
            router.push('/(portal)/end-customers');
            router.refresh(); // Ensure the list page re-fetches data
          }, 2000);
        } else {
          setFormError(result.message || "Failed to create end customer.");
          if (result.errors) {
            console.error("Server validation errors:", result.errors);
            // Potentially map server errors to form fields if needed
          }
        }
      } catch (error) {
        console.error("Submission error:", error);
        setFormError(error instanceof Error ? error.message : "An unexpected error occurred.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white dark:bg-dark-surface p-6 md:p-8 rounded-lg shadow">
      {formError && <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 dark:text-red-300 dark:bg-red-900 rounded-lg" role="alert">{formError}</div>}
      {formSuccess && <div className="p-3 mb-4 text-sm text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-900 rounded-lg" role="alert">{formSuccess}</div>}

      <InputField name="name" label="Full Name / Company Name" registerFn={register} errorMsg={errors.name?.message} required />
      <InputField name="email" label="Email Address (Optional)" type="email" registerFn={register} errorMsg={errors.email?.message} />
      <InputField name="phone" label="Phone Number (Optional)" type="tel" registerFn={register} errorMsg={errors.phone?.message} />
      <InputField name="address" label="Primary Address (Optional)" registerFn={register} errorMsg={errors.address?.message} />
      
      {/* TODO: Replace rateCardId with a Select dropdown populated from available RateCards */}
      <InputField name="rateCardId" label="Rate Card ID (Optional, CUID)" registerFn={register} errorMsg={errors.rateCardId?.message} />

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1">Billing Visibility</label>
        <div className="flex items-center">
          <input
            id="billingVisibility"
            type="checkbox"
            {...register("billingVisibility")}
            className="h-4 w-4 text-indigo-600 border-gray-300 dark:border-slate-600 rounded focus:ring-indigo-500 bg-white dark:bg-slate-800"
          />
          <label htmlFor="billingVisibility" className="ml-2 block text-sm text-gray-900 dark:text-dark-text-primary">
            Allow client to view billing for this end customer
          </label>
        </div>
        {errors.billingVisibility?.message && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.billingVisibility.message}</p>}
      </div>

      <div className="pt-5">
        <button
          type="submit"
          disabled={isPending || isSubmitting}
          className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-dark-primary-action dark:hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isPending || isSubmitting ? (
            <>
              <Spinner size="sm" className="mr-2" />
              Creating End Customer...
            </>
          ) : (
            'Create End Customer'
          )}
        </button>
      </div>
    </form>
  );
}
