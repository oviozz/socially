


/** @type {import('tailwindcss').Config} */
/* eslint-env node */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        fluid: "repeat(auto-fit, minmax(15rem, 10rem))",
      }
    },
  },
  plugins: [
    require('tailwindcss-animated')
  ],
}