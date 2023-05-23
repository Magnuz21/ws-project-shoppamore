const {fontFamily} = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
  ],
  theme: {
    maxWidth:{
     container:"1520px",
     contentContainer:"1280px",
    },
    extend: {
      screens:{
        xs: "320px",
        sm: "375px",
        sml: "500px",
        md: "667px",
        mdl: "768px",
        lg: "960px",
        lgl: "1024px",
        x1:  "1280px",
        "2x1":"1400px",

      },
      colors:{
       blue:"#16003B",
       lightPink:"#FCDBD2",
       yellow:"#ffc220",
       orange:"#FF633C",
       hoverBg:"#189AB4",
       lightText:"#46474a",
       yel: "#0081A7",
       green: "#4E9F3D",
       gold: "#C07F00",
       gina: "#FE346E",
      },
      boxShadow:{
        bannerShadow: "0 1px 2px 1px #00000026",
      },
      fontFamily:{
        sans: ["var(--font-open_sans)", ...fontFamily.sans],
      }
    },
  },
  plugins: [],
}

