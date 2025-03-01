import { NextRequest, NextResponse } from 'next/server';
import { createRecurringDonation } from '@/app/lib/stripe';
import { z } from 'zod';

// Define the schema for donation request validation
const donationSchema = z.object({
  amount: z.number().min(1),
  email: z.string().email(),
  name: z.string().min(1),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const result = donationSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid request data', details: result.error.format() },
        { status: 400 }
      );
    }
    
    const { amount, email, name } = result.data;
    
    // Create a recurring donation with Stripe
    const { sessionId, sessionUrl } = await createRecurringDonation(
      amount,
      email,
      name
    );
    
    return NextResponse.json({ sessionId, sessionUrl });
  } catch (error) {
    console.error('Error processing donation:', error);
    
    return NextResponse.json(
      { error: 'Failed to process donation' },
      { status: 500 }
    );
  }
} 