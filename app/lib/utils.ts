import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Combine class names with tailwind-merge
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
}

// Calculate days remaining until Ramadan 2025
export function getDaysUntilRamadan(): number {
  const today = new Date();
  const ramadanStart = new Date(process.env.NEXT_PUBLIC_RAMADAN_START_DATE || '2025-03-01');
  
  // Calculate the difference in days
  const diffTime = ramadanStart.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays > 0 ? diffDays : 0;
}

// Calculate days of Ramadan
export function getRamadanDays(): number {
  const ramadanStart = new Date(process.env.NEXT_PUBLIC_RAMADAN_START_DATE || '2025-03-01');
  const ramadanEnd = new Date(process.env.NEXT_PUBLIC_RAMADAN_END_DATE || '2025-03-30');
  
  // Calculate the difference in days
  const diffTime = ramadanEnd.getTime() - ramadanStart.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include the end date
  
  return diffDays;
} 