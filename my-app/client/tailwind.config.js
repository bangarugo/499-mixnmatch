/** @type {import('tailwindcss').Config} */
//prettier-ignore
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "raisin-black": "#211A1D",
        "electric-indigo": "#6320EE",
        "medium-slate-blue": "#8075FF",
        "magnolia": "#F8F0FB",
        "ash-gray": "#CAD5CA",
        "mint-green" : "#BFEDEF",
        "tiffany-blue": "#98E2C6",
        "fairy-tale" : "#D9B8C4",
        "mountbatten-pink":"#957186",
        "eggplant":"#703D57",
        "rich-black":"#121420",
        "gunmetal":"#1B2432",
        "timberwolf":"#CBD2D0",
        "pomp-and-purple":"#706993",
        "dark-purple":"#331E38",
        "moonstone":"#70A0AF"
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], 
      },
      spacing: {
        20: "4.5rem",
        128: "36rem",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },

      },
      animation: {
        fadeUp:'fadeUp 1s ease-out',
        fadeDown:'fadeDown 1s ease-in'
      },
    },
  },
  plugins: [],
};
