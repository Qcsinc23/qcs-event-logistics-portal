import { Webhook } from 'svix'
// Remove import { headers } from 'next/headers' as we'll use req.headers
import { WebhookEvent } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

// Remove import { ReadonlyHeaders } from 'next/headers';

export async function POST(req: Request) {
  // Get the headers from the request object
  const svix_id = req.headers.get("svix-id")
  const svix_timestamp = req.headers.get("svix-timestamp")
  const svix_signature = req.headers.get("svix-signature")

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occurred -- no svix headers', {
      status: 400
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Create a new Svix instance with your webhook secret
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || '')

  let evt: WebhookEvent

  // Verify the webhook signature and extract the event
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occurred', {
      status: 400
    })
  }

  // Handle the webhook
  const eventType = evt.type

  if (eventType === 'user.created' || eventType === 'user.updated') {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data

    // Get the primary email address
    const primaryEmail = email_addresses.find(email => email.id === evt.data.primary_email_address_id)?.email_address

    if (!primaryEmail) {
      console.error('No primary email found for user:', id)
      return new Response('No primary email found', { status: 400 })
    }

    try {
      // Upsert the user profile
      await prisma.qCSUserProfile.upsert({
        where: { id },
        update: {
          email: primaryEmail,
          firstName: first_name || null,
          lastName: last_name || null,
          imageUrl: image_url || null,
          updatedAt: new Date(),
        },
        create: {
          id,
          email: primaryEmail,
          firstName: first_name || null,
          lastName: last_name || null,
          imageUrl: image_url || null,
          role: 'CLIENT', // Default role, can be changed by admin later
        },
      })

      console.log(`User ${eventType}: ${id}`)
    } catch (error) {
      console.error('Error syncing user to database:', error)
      return new Response('Database error', { status: 500 })
    }
  }

  if (eventType === 'user.deleted') {
    const { id } = evt.data

    try {
      // Optional: You might want to soft delete or handle this differently
      // For now, we'll just log it
      console.log(`User deletion webhook received for: ${id}`)
      // await prisma.qCSUserProfile.delete({ where: { id } })
    } catch (error) {
      console.error('Error handling user deletion:', error)
      return new Response('Database error', { status: 500 })
    }
  }

  return new Response('', { status: 200 })
}
