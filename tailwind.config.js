/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Make sure to include TypeScript files
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
