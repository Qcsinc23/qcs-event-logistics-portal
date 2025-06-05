"use client"; // If it uses client-side hooks or event handlers directly

import React from 'react';

// Define a more specific type for registerFn if possible, e.g., from react-hook-form
// For now, using 'any' for simplicity as in the original component
type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  registerFn: any; // Should be UseFormRegister<FieldValues>
  errorMsg?: string;
};

const InputField: React.FC<InputFieldProps> = ({ name, label, type = "text", registerFn, errorMsg, className, ...props }) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1">{label}</label>
      <input
        id={name}
        type={type}
        {...registerFn(name, type === 'number' ? { valueAsNumber: true } : {})}
        {...props}
        className={`mt-1 block w-full px-3 py-2 border ${errorMsg ? 'border-red-500 dark:border-red-700' : 'border-gray-300 dark:border-slate-600'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-dark-text-primary placeholder-gray-400 dark:placeholder-gray-500 ${className || ''}`}
      />
      {errorMsg && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errorMsg}</p>}
    </div>
  );
};

export default InputField;