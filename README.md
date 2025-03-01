# Ramadan Daily Giving

A Next.js application for collecting daily donations during Ramadan 2025 (March 1-30, 2025) using Stripe for payment processing.

## Features

- Beautiful Ramadan-themed UI with responsive design
- Custom donation amounts (predefined options: $10, $40, $100, or custom amount)
- Stripe integration for secure payment processing
- Daily recurring donations that only run during Ramadan 2025
- Automatic subscription start and end dates

## Tech Stack

- Next.js 15.2.0
- React 19
- TypeScript
- Tailwind CSS 4
- Stripe API for payment processing

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- Stripe account with API keys

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ramadan-daily-giving.git
   cd ramadan-daily-giving
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
   STRIPE_SECRET_KEY=sk_test_your_secret_key
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   NEXT_PUBLIC_RAMADAN_START_DATE=2025-03-01
   NEXT_PUBLIC_RAMADAN_END_DATE=2025-03-30
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Stripe Webhook Setup

For testing webhooks locally, you can use the Stripe CLI:

1. Install the [Stripe CLI](https://stripe.com/docs/stripe-cli)
2. Run the following command:
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```
3. Copy the webhook signing secret and add it to your `.env.local` file.

## Deployment

This project can be deployed to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Framadan-daily-giving)

Make sure to set up the environment variables in your Vercel project settings.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
