import { getDaysUntilRamadan } from '@/app/lib/utils';

export default function Header() {
  const daysUntil = getDaysUntilRamadan();
  
  return (
    <header className="w-full text-white text-center relative">
      <div className="container mx-auto px-4">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-ramadan-highlight rounded-full flex items-center justify-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-transparent rounded-full border-4 border-ramadan-primary"></div>
            </div>
            <div className="absolute top-1 right-1 w-4 h-4 bg-ramadan-highlight rounded-full"></div>
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-arabic">
          Ramadan Daily Giving
        </h1>
        
        <p className="text-lg md:text-xl text-ramadan-light opacity-90 max-w-2xl mx-auto mb-6">
          Donate daily automatically on your behalf so that you don't miss Laylatul Qadr
        </p>
        
        {daysUntil > 0 ? (
          <div className="inline-block bg-ramadan-highlight text-white px-6 py-3 rounded-full text-lg md:text-xl font-medium shadow-lg transition-transform transform hover:scale-105">
            {daysUntil} days until Ramadan 2025
          </div>
        ) : (
          <div className="inline-block bg-ramadan-highlight text-white px-6 py-3 rounded-full text-lg md:text-xl font-medium shadow-lg transition-transform transform hover:scale-105">
            Ramadan Mubarak!
          </div>
        )}
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 md:left-20 opacity-30">
        <div className="w-16 h-16 border-2 border-ramadan-highlight rounded-full"></div>
      </div>
      <div className="absolute bottom-10 right-10 md:right-20 opacity-30">
        <div className="w-16 h-16 border-2 border-ramadan-highlight rounded-full"></div>
      </div>
    </header>
  );
} 