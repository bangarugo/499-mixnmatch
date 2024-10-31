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
      },
      spacing: {
        128: "36rem", // Change this value as needed
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
