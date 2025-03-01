export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full py-8 text-white">
      <div className="container mx-auto px-4">
        
        <div className="mt-6 pt-6 border-t border-white/10 text-center text-white/70 text-sm">
          <p>© {currentYear} Ramadan Daily Giving. All rights reserved.</p>
          <p className="mt-2">
            Powered by <a href="https://stripe.com" className="text-ramadan-highlight hover:underline">Stripe</a>
          </p>
        </div>
      </div>
    </footer>
  );
} 