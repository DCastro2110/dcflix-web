/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,tsx,jsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'main-gradient-bottom':
          'linear-gradient(to bottom, transparent 10%, #08082C 80%)',
        'home-gradient-bottom':
          'linear-gradient(to bottom, transparent 10%, #08082C 95%)',
        'home-gradient-left':
          'linear-gradient(to left, transparent 10%, #08082C 95%)',
      },
      colors: {
        blue: {
          700: '#0A1641',
          800: '#08082C',
        },
        yellow: {
          700: '#CD8605',
        },
      },
      container: {
        center: true,
        padding: '2rem',
      },
    },
  },
  plugins: [],
};
