/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme")
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    screens: {
      dxs: "375px",
      xxs: "405px",
      xxs1: "425px",
      sm1: "480px",
      sm4: "508px",
      smx: "508px",
      sm2: "538px",
      sm3: "550px",
      sm: "640px",
      md: "768px",
      md1: "870px",
      md2: "914px",
      lg: "976px",
      dlg: "1024px",
      lg1: "1100px",
      lgx: "1134px",
      dxl: "1380px",
      xl: "1440px",
      xl2: "1600px",
    },
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
