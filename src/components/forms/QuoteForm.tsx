"use client";

import React, { useState, useTransition } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateLeadSchema, createLead, type CreateLeadInput } from '@/lib/actions/lead.actions';
import InputField from './InputField';
import TextAreaField from './TextAreaField';
import Spinner from '../Spinner';

export default function QuoteForm({ closeModal }: { closeModal: () => void }) {
  const [step, setStep] = useState(1);
  const [isPending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    trigger,
  } = useForm<CreateLeadInput>({
    resolver: zodResolver(CreateLeadSchema),
  });

  const nextStep = async () => {
    const fieldsToValidate = step === 1 ? ['name', 'email'] : ['origin', 'destination', 'itemDetails'];
    const isValid = await trigger(fieldsToValidate as any);
    if (isValid) {
      setStep(step + 1);
    }
  };

  const prevStep = () => setStep(step - 1);

  const onSubmit: SubmitHandler<CreateLeadInput> = (data) => {
    setFormError(null);
    setFormSuccess(null);
    startTransition(async () => {
      const result = await createLead(data);
      if (result.success) {
        setFormSuccess(result.message);
        setTimeout(closeModal, 3000);
      } else {
        setFormError(result.message);
      }
    });
  };

  if (formSuccess) {
    return (
      <div className="p-8 text-center">
        <h3 className="text-2xl font-bold text-green-600">Success!</h3>
        <p className="mt-2 text-gray-600">{formSuccess}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
      {formError && <div className="p-3 text-red-700 bg-red-100 rounded-lg">{formError}</div>}
      
      {step === 1 && (
        <section>
          <h3 className="text-xl font-semibold mb-4">Step 1: Your Contact Information</h3>
          <InputField name="name" label="Full Name" registerFn={register} errorMsg={errors.name?.message} required />
          <InputField name="email" label="Email Address" type="email" registerFn={register} errorMsg={errors.email?.message} required />
          <InputField name="phone" label="Phone Number (Optional)" type="tel" registerFn={register} errorMsg={errors.phone?.message} />
          <InputField name="companyName" label="Company Name (Optional)" registerFn={register} errorMsg={errors.companyName?.message} />
        </section>
      )}

      {step === 2 && (
        <section>
          <h3 className="text-xl font-semibold mb-4">Step 2: Event & Logistics Details</h3>
          <InputField name="eventType" label="Type of Event (e.g., Conference, Wedding) (Optional)" registerFn={register} errorMsg={errors.eventType?.message} />
          <InputField name="eventDate" label="Date of Event (Optional)" type="date" registerFn={register} errorMsg={errors.eventDate?.message} />
          <InputField name="origin" label="Pickup Location / Origin" registerFn={register} errorMsg={errors.origin?.message} required />
          <InputField name="destination" label="Delivery Location / Destination" registerFn={register} errorMsg={errors.destination?.message} required />
          <TextAreaField name="itemDetails" label="Tell us about the items you need moved" registerFn={register} errorMsg={errors.itemDetails?.message} required />
        </section>
      )}

      <div className="flex justify-between items-center pt-4">
        {step > 1 && (
          <button type="button" onClick={prevStep} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">
            Back
          </button>
        )}
        <div />
        {step < 2 ? (
          <button type="button" onClick={nextStep} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
            Next
          </button>
        ) : (
          <button type="submit" disabled={isPending || isSubmitting} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50 flex items-center">
            {isPending || isSubmitting ? <><Spinner size="sm" className="mr-2" /> Submitting...</> : 'Submit Request'}
          </button>
        )}
      </div>
    </form>
  );
}