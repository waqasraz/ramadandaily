'use client';

import { useState } from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import DonationBox from '@/app/components/DonationBox';
import CheckoutForm from '@/app/components/CheckoutForm';

export default function Home() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  
  const handleBack = () => {
    setSelectedAmount(null);
  };
  
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-ramadan-dark to-ramadan-dark/90">
      <Header />
      
      <div className="flex-grow flex items-center justify-center w-full">
        <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
          <div className="w-full">
            {!selectedAmount ? (
              <DonationBox
                onSelectAmount={setSelectedAmount}
                selectedAmount={selectedAmount}
              />
            ) : (
              <CheckoutForm 
                amount={selectedAmount}
                onBack={handleBack}
              />
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
