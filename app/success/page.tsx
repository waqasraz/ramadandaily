'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sessionDetails, setSessionDetails] = useState<any>(null);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (!sessionId) {
      setError('No session ID found');
      setIsLoading(false);
      return;
    }

    const fetchSession = async () => {
      try {
        const response = await axios.get(`/api/stripe/session?session_id=${sessionId}`);
        setSessionDetails(response.data);
      } catch (err) {
        setError('Failed to load session details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSession();
  }, [searchParams]);

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-ramadan-dark to-ramadan-dark/90">
      <Header />
      
      <div className="flex-grow flex items-center justify-center w-full">
        <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
          <div className="w-full max-w-2xl mx-auto backdrop-blur-lg rounded-2xl p-8 md:p-10 bg-gradient-to-br from-ramadan-dark/95 to-ramadan-dark/90 border border-ramadan-highlight/30 shadow-xl text-center">
            {isLoading ? (
              <div className="text-white">Loading...</div>
            ) : error ? (
              <div>
                <div className="text-red-500 text-xl mb-4">{error}</div>
                <Link 
                  href="/"
                  className="inline-block py-3 px-6 bg-ramadan-primary text-white rounded-lg hover:bg-ramadan-dark transition-colors duration-200"
                >
                  Return Home
                </Link>
              </div>
            ) : (
              <>
                <div className="text-ramadan-highlight text-6xl mb-6">✓</div>
                <h2 className="text-3xl font-bold text-white mb-4">Thank You!</h2>
                <p className="text-xl text-white/90 mb-4">
                  Your daily donation has been set up successfully.
                </p>
                <p className="text-base text-white/70 mb-6">
                  You will be charged daily during Ramadan 2025 (March 1-30).
                </p>
                <Link 
                  href="/"
                  className="inline-block py-3 px-6 bg-ramadan-primary text-white rounded-lg hover:bg-ramadan-dark transition-colors duration-200"
                >
                  Return Home
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
} 