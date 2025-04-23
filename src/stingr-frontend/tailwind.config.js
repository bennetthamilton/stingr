/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // (Optional) If you want to use bg-background, text-honeyGold, etc.
      colors: {
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        honeyGold: "var(--color-honeyGold)",
        offWhite: "var(--color-offWhite)",
      },
    },
  },
  plugins: [],
};
  