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
          charcoal: '#212121',
          offwhite: '#FDF9E9',
          lightHoney: '#FFD54F',
          honeyGold: '#FD8500',
          deepHoney: '#D77D00',
          brown: '#724800',
          teal: '#26A69A',
        },
        fontFamily: {
          righteous: ['Righteous', 'cursive'],
        },
      },
    },
    plugins: [],
  };
  