"use server";

import { z } from 'zod';
import { prisma } from '@/lib/prisma';
// import { Resend } from 'resend';
// const resend = new Resend(process.env.RESEND_API_KEY);

// Zod schema for lead creation
export const CreateLeadSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  companyName: z.string().optional(),
  eventType: z.string().optional(),
  eventDate: z.date().optional(),
  origin: z.string().min(3, { message: "Origin is required." }),
  destination: z.string().min(3, { message: "Destination is required." }),
  itemDetails: z.string().min(10, { message: "Please provide some details about the items." }),
});

export type CreateLeadInput = z.infer<typeof CreateLeadSchema>;

export async function createLead(data: CreateLeadInput) {
  const validationResult = CreateLeadSchema.safeParse(data);

  if (!validationResult.success) {
    return {
      success: false,
      message: "Invalid form data.",
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  try {
    const newLead = await prisma.lead.create({
      data: validationResult.data,
    });

    // Send email notification to internal team (uncomment when Resend is configured)
    /*
    await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: 'sales@quietcraftsolutions.com',
      subject: `New Quote Request from ${newLead.name}`,
      html: `
        <h1>New Lead Submission</h1>
        <p><strong>Name:</strong> ${newLead.name}</p>
        <p><strong>Email:</strong> ${newLead.email}</p>
        <p><strong>Phone:</strong> ${newLead.phone || 'N/A'}</p>
        <p><strong>Company:</strong> ${newLead.companyName || 'N/A'}</p>
        <hr />
        <h2>Event Details</h2>
        <p><strong>Event Type:</strong> ${newLead.eventType || 'N/A'}</p>
        <p><strong>Event Date:</strong> ${newLead.eventDate?.toLocaleDateString() || 'N/A'}</p>
        <p><strong>Origin:</strong> ${newLead.origin}</p>
        <p><strong>Destination:</strong> ${newLead.destination}</p>
        <p><strong>Item Details:</strong></p>
        <p>${newLead.itemDetails}</p>
      `,
    });
    */

    return {
      success: true,
      message: "Your quote request has been submitted successfully!",
      lead: newLead,
    };
  } catch (error) {
    console.error("Error creating lead:", error);
    return {
      success: false,
      message: "An unexpected error occurred while submitting your request. Please try again later.",
    };
  }
}