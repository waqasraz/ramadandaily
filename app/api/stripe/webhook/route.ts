import { NextRequest, NextResponse } from 'next/server';
import stripe from '@/app/lib/stripe';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature') as string;

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    );
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: 'Missing STRIPE_WEBHOOK_SECRET environment variable' },
      { status: 500 }
    );
  }

  try {
    // Verify the event came from Stripe
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    // Handle specific events
    switch (event.type) {
      case 'invoice.paid':
        // Handle successful payment
        const invoice = event.data.object;
        console.log('Payment succeeded for invoice:', invoice.id);
        // You could store this in a database or send a confirmation email
        break;
        
      case 'invoice.payment_failed':
        // Handle failed payment
        const failedInvoice = event.data.object;
        console.log('Payment failed for invoice:', failedInvoice.id);
        // You could notify the customer or retry the payment
        break;
        
      case 'customer.subscription.deleted':
        // Handle subscription cancellation
        const subscription = event.data.object;
        console.log('Subscription cancelled:', subscription.id);
        break;
        
      default:
        // Unexpected event type
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error verifying webhook:', error);
    
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    );
  }
} 