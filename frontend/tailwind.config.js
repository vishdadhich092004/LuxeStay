/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    container: {
      padding: {
        DEFAULT: "2rem",
        md: "10rem",
        lg: "12rem",
      }
    }
  },
  plugins: [],
}