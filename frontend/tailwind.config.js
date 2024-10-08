// /** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  important: "#root",
  darkMode: "selector",
  theme: {
    extend: {
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
      },
      height: {
        102: "28rem",
        128: "32rem",
      },
      width: {
        102: "28rem",
      },
    },
  },
  plugins: [],
};
