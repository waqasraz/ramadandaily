import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY environment variable');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-02-24.acacia', // Use the latest API version
});

export default stripe;

function calculateRamadanPeriod() {
  const ramadanStartDate = new Date(process.env.NEXT_PUBLIC_RAMADAN_START_DATE || '2025-03-01');
  const ramadanEndDate = new Date(process.env.NEXT_PUBLIC_RAMADAN_END_DATE || '2025-03-30');
  const currentDate = new Date();

  // Check if we're currently in Ramadan
  const isInRamadan = currentDate >= ramadanStartDate && currentDate <= ramadanEndDate;

  if (isInRamadan) {
    // If we're in Ramadan, start from today
    return {
      startDate: Math.floor(currentDate.getTime() / 1000),
      endDate: Math.floor(ramadanEndDate.getTime() / 1000),
      remainingDays: Math.ceil((ramadanEndDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24))
    };
  } else {
    // If we're not in Ramadan, use the full period
    return {
      startDate: Math.floor(ramadanStartDate.getTime() / 1000),
      endDate: Math.floor(ramadanEndDate.getTime() / 1000),
      remainingDays: 30 // Full Ramadan period
    };
  }
}

export async function createRecurringDonation(
  amount: number,
  email: string,
  name: string
) {
  try {
    const { startDate, endDate, remainingDays } = calculateRamadanPeriod();

    // Create a product for the donation
    const product = await stripe.products.create({
      name: 'Ramadan Daily Donation',
      description: `Daily donation during Ramadan 2025 (${new Date(startDate * 1000).toISOString().split('T')[0]} to ${new Date(endDate * 1000).toISOString().split('T')[0]})`,
    });

    // Create a price with recurring parameters
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: amount * 100, // Convert to cents
      currency: process.env.NEXT_PUBLIC_CURRENCY?.toLowerCase() || 'cad',
      recurring: {
        interval: 'day',
      },
    });

    // Create a Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      metadata: {
        start_date: new Date(startDate * 1000).toISOString().split('T')[0],
        end_date: new Date(endDate * 1000).toISOString().split('T')[0],
        remaining_days: remainingDays.toString(),
      },
      subscription_data: {
        metadata: {
          cancel_at: endDate,
        },
        description: `Daily Ramadan donation for ${remainingDays} days, starting ${new Date(startDate * 1000).toLocaleDateString()} until ${new Date(endDate * 1000).toLocaleDateString()}`,
      },
      customer_email: email,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    });

    return {
      sessionId: session.id,
      sessionUrl: session.url,
      remainingDays,
      startDate: new Date(startDate * 1000).toISOString(),
      endDate: new Date(endDate * 1000).toISOString(),
    };
  } catch (error) {
    console.error('Error creating recurring donation:', error);
    throw error;
  }
} 