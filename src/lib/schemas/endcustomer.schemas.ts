import { z } from 'zod';

// Zod schema for creating an EndCustomer
export const CreateEndCustomerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long."),
  email: z.string().email("Invalid email address.").optional().or(z.literal('')).nullable(), // Optional, can be empty string or null
  phone: z.string().optional(),
  address: z.string().optional(),
  // clientCompanyId will be derived from the authenticated user's profile
  rateCardId: z.string().cuid("Invalid Rate Card ID.").optional().or(z.literal('')).nullable(), // Optional, can be empty string or null
  billingVisibility: z.boolean(), 
});

export type CreateEndCustomerInput = z.infer<typeof CreateEndCustomerSchema>;

// Zod schema for updating an EndCustomer (all fields optional)
export const UpdateEndCustomerSchema = CreateEndCustomerSchema.partial().extend({
  id: z.string().cuid("ID of the end customer to update is required."),
});

export type UpdateEndCustomerInput = z.infer<typeof UpdateEndCustomerSchema>;
