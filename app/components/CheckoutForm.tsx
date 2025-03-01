import { useState, FormEvent } from 'react';
import { formatCurrency } from '@/app/lib/utils';
import axios from 'axios';

interface CheckoutFormProps {
  amount: number;
  onBack: () => void;
}

export default function CheckoutForm({ amount, onBack }: CheckoutFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [donationDetails, setDonationDetails] = useState<{
    remainingDays: number;
    startDate: string;
    endDate: string;
  } | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Create the checkout session via our API
      const response = await axios.post('/api/stripe', {
        amount,
        name,
        email,
      });

      const { sessionUrl, remainingDays, startDate, endDate } = response.data;
      setDonationDetails({ remainingDays, startDate, endDate });

      // Redirect to Stripe Checkout
      window.location.href = sessionUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setIsLoading(false);
    }
  };

  const totalDonation = amount * (donationDetails?.remainingDays || 30); // Default to 30 days if not calculated yet

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <button
        onClick={onBack}
        className="flex items-center text-white/80 hover:text-ramadan-highlight transition-colors group mb-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2 transform transition-transform group-hover:-translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Change donation amount
      </button>

      <div className="backdrop-blur-lg rounded-2xl p-8 md:p-10 bg-gradient-to-br from-ramadan-dark/95 to-ramadan-dark/90 border border-ramadan-highlight/30 shadow-xl">
        <h3 className="text-2xl font-semibold text-white mb-6">Donation Summary</h3>
        <div className="flex justify-between mb-3 text-lg">
          <span className="text-white/80">Daily amount:</span>
          <span className="font-medium text-ramadan-highlight">{formatCurrency(amount)}</span>
        </div>
        <div className="flex justify-between mb-3 text-lg">
          <span className="text-white/80">Duration:</span>
          <span className="font-medium text-ramadan-highlight">
            {donationDetails?.remainingDays || 30} days (Ramadan 2025)
          </span>
        </div>
        <div className="flex justify-between pt-4 border-t border-ramadan-highlight/20 mt-3 text-lg">
          <span className="text-white font-semibold">Total donation:</span>
          <span className="font-bold text-ramadan-highlight">{formatCurrency(totalDonation)}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 backdrop-blur-lg rounded-2xl p-8 md:p-10 bg-gradient-to-br from-ramadan-dark/95 to-ramadan-dark/90 border border-ramadan-highlight/30 shadow-xl">
        <div>
          <label htmlFor="name" className="block text-lg font-medium text-white mb-3">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-6 py-4 rounded-xl border-2 border-ramadan-highlight/30 focus:outline-none focus:border-ramadan-highlight bg-ramadan-dark/50 text-white placeholder-white/50 text-lg transition-all duration-300 hover:bg-ramadan-dark/70 hover:border-ramadan-highlight/50"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-lg font-medium text-white mb-3">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-6 py-4 rounded-xl border-2 border-ramadan-highlight/30 focus:outline-none focus:border-ramadan-highlight bg-ramadan-dark/50 text-white placeholder-white/50 text-lg transition-all duration-300 hover:bg-ramadan-dark/70 hover:border-ramadan-highlight/50"
            placeholder="Enter your email address"
          />
        </div>

        {error && (
          <div className="p-4 bg-red-900/50 backdrop-blur-sm border-2 border-red-500/30 text-red-200 rounded-xl text-lg">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-5 px-8 bg-gradient-to-r from-ramadan-highlight to-ramadan-primary text-white rounded-xl font-medium text-xl transition-all transform hover:scale-105 duration-300 disabled:opacity-70 border-2 border-ramadan-highlight shadow-lg hover:shadow-2xl shadow-ramadan"
        >
          {isLoading ? 'Processing...' : 'Proceed to Payment'}
        </button>

        <p className="text-base text-white/70 text-center">
          Your card will be charged {formatCurrency(amount)} daily for {donationDetails?.remainingDays || 30} days
          {donationDetails ? 
            ` from ${new Date(donationDetails.startDate).toLocaleDateString()} to ${new Date(donationDetails.endDate).toLocaleDateString()}`
            : ' during Ramadan 2025'}.
          You can cancel anytime before the start date.
        </p>
      </form>
    </div>
  );
} 