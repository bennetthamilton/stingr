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
          charcoal: '#212121',
          offWhite: '#fdf9e9',
          lightHoney: '#ffd54f',
          honeyGold: '#fd8500',
          deepHoney: '#d77d00',
          brown: '#724800',
          teal: '#26a69a',
        },
        fontFamily: {
          righteous: ['Righteous', 'cursive'],       // Logo only
          heading: ['Montserrat', 'sans-serif'],     // Headings
          body: ['Raleway', 'sans-serif'],           // Body text
        },
      },
    },
    plugins: [],
  };
  