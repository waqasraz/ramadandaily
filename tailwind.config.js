/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ramadan: {
          primary: '#1F4D36', // Deep green
          secondary: '#8E5924', // Warm brown
          accent: '#C99D45', // Gold
          light: '#F8F0E3', // Cream
          dark: '#0F2620', // Dark green
          highlight: '#E6B325', // Bright gold
        },
      },
      backgroundImage: {
        'ramadan-pattern': "url('/images/ramadan-pattern.png')",
        'crescent-moon': "url('/images/crescent-moon.svg')",
      },
      fontFamily: {
        arabic: ['var(--font-amiri)', 'serif'],
      },
    },
  },
  plugins: [],
} 