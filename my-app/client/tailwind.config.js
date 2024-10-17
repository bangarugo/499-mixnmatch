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
        '128': '42rem', // Change this value as needed
      },
    },
  },
  plugins: [],
};
