/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/@relume_io/relume-ui/dist/**/*.{js,ts,jsx,tsx}", // Relume UI components
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [require("@relume_io/relume-tailwind")], // Relume preset
  theme: {
    extend: {
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
  