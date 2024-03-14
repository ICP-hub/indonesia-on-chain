/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme")
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        "5rem": "5rem",
      },
      fontFamily: {
        poppins: ["poppins", "sans-serif"],
        nunitoSans: ["nunitoSans", "sans-serif"],
        quickSand: ["quickSand", "sans-serif"],
      },
      translate: {
        full: "100%",
        "-full": "-100%",
      },
      scale: {
        90: "0.9",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-30deg)" },
          "50%": { transform: "rotate(30deg)" },
        },
      },
      animation: {
        wiggle: "wiggle 4s ease-in-out infinite",
      },
    },
    fontFamily: {
      serif: ["Poppins", "sans-serif"],
    },
  },
  plugins: [],
}
