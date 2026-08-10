/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', 'Segoe UI', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Segoe UI', 'system-ui', 'sans-serif'],
        heading: ['Outfit', 'Segoe UI', 'system-ui', 'sans-serif'],
        body: ['Nunito', 'Segoe UI', 'system-ui', 'sans-serif'],
      },
      colors: {
        tiktok: {
          red: '#fe2c55',
          black: '#010101',
          teal: '#69c9d0',
        },
      },
      animation: {
        'slideUp': 'slideUp 0.3s ease-out',
        'slideDown': 'slideDown 0.3s ease-out',
        'pulse-ring': 'pulse-ring 2.5s ease-in-out infinite',
      },
      keyframes: {
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          from: { opacity: '0', transform: 'translateY(-10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
