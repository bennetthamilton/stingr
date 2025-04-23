/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          background: '#212121', // charcoal
          foreground: '#fdf9e9', // offWhite
          lightHoney: '#ffd54f',
          honeyGold: '#fd8500',
          deepHoney: '#d77d00',
          brown: '#724800',
          teal: '#26a69a',
        },
        fontFamily: {
          righteous: ['var(--font-logo)', 'cursive'],
          heading: ['var(--font-heading)', 'sans-serif'],
          body: ['var(--font-body)', 'sans-serif'],
        },
      },
    },
    plugins: [],
  };
  