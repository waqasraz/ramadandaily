import { useState } from 'react';
import { cn } from '@/app/lib/utils';

interface DonationBoxProps {
  onSelectAmount: (amount: number) => void;
  selectedAmount: number | null;
}

const predefinedAmounts = [1, 5, 10, 15, 20, 25, 50, 100];

export default function DonationBox({ onSelectAmount, selectedAmount }: DonationBoxProps) {
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isCustomActive, setIsCustomActive] = useState<boolean>(false);

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow any positive number with up to 2 decimal places
    if (value === '' || /^\d+\.?\d{0,2}$/.test(value)) {
      setCustomAmount(value);
      const numValue = parseFloat(value);
      if (!isNaN(numValue) && numValue > 0) {
        setIsCustomActive(true);
      } else {
        setIsCustomActive(false);
      }
    }
  };

  const handlePredefinedAmountClick = (amount: number) => {
    setCustomAmount('');
    setIsCustomActive(false);
    onSelectAmount(amount);
  };

  const handleContinue = () => {
    if (isCustomActive && customAmount) {
      const numValue = parseFloat(customAmount);
      if (!isNaN(numValue) && numValue > 0) {
        onSelectAmount(numValue);
      }
    }
  };

  const isValidAmount = selectedAmount !== null || (isCustomActive && customAmount && !isNaN(parseFloat(customAmount)) && parseFloat(customAmount) > 0);

  return (
    <div className="w-full max-w-3xl mx-auto backdrop-blur-lg rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 bg-gradient-to-br from-ramadan-dark/95 to-ramadan-dark/90 border border-ramadan-highlight/30 shadow-xl">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-6 sm:mb-8 md:mb-10 text-center font-arabic">
        Select Donation Amount
      </h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-5 mb-6 sm:mb-8">
        {predefinedAmounts.map((amount) => (
          <button
            key={amount}
            onClick={() => handlePredefinedAmountClick(amount)}
            className={cn(
              "py-4 sm:py-5 px-3 sm:px-4 rounded-xl text-lg sm:text-xl md:text-2xl font-medium transition-all duration-300 shadow-lg transform hover:scale-105 hover:shadow-2xl",
              selectedAmount === amount && !isCustomActive
                ? "bg-gradient-to-r from-ramadan-highlight to-ramadan-primary text-white border-2 border-ramadan-highlight shadow-ramadan"
                : "bg-ramadan-dark/50 text-white border-2 border-ramadan-highlight/30 hover:border-ramadan-highlight hover:bg-ramadan-dark/70"
            )}
          >
            ${amount}
          </button>
        ))}
      </div>
      
      <div className="relative mb-6 sm:mb-8">
        <div className={cn(
          "flex items-center rounded-xl overflow-hidden transition-all duration-300 border-2",
          isCustomActive
            ? "border-ramadan-highlight shadow-lg bg-ramadan-dark/50 shadow-ramadan"
            : "border-ramadan-highlight/30 bg-ramadan-dark/50 hover:border-ramadan-highlight hover:bg-ramadan-dark/70"
        )}>
          <span className="text-white text-lg sm:text-xl md:text-2xl font-medium pl-4 sm:pl-6">$</span>
          <input
            type="text"
            value={customAmount}
            onChange={handleCustomAmountChange}
            placeholder="Enter custom amount"
            className="w-full py-4 sm:py-5 md:py-6 px-3 sm:px-4 text-lg sm:text-xl md:text-2xl focus:outline-none text-white bg-transparent placeholder-white/50 transition-colors duration-300"
            onFocus={() => setIsCustomActive(true)}
          />
        </div>
      </div>

      <button
        onClick={handleContinue}
        disabled={!isValidAmount}
        className={cn(
          "w-full py-4 sm:py-5 px-6 rounded-xl text-lg sm:text-xl font-medium transition-all duration-300 shadow-lg transform hover:scale-105 hover:shadow-2xl",
          isValidAmount
            ? "bg-gradient-to-r from-ramadan-highlight to-ramadan-primary text-white border-2 border-ramadan-highlight shadow-ramadan"
            : "bg-ramadan-dark/30 text-white/50 border-2 border-ramadan-highlight/10 cursor-not-allowed"
        )}
      >
        Continue
      </button>
      
      <p className="mt-4 text-sm sm:text-base text-white/80 text-center px-2">
        Your selected amount will be donated daily during Ramadan 2025
      </p>
    </div>
  );
} 