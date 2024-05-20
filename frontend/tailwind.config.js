/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    // colors: {
    //   bgColor: "EEEEFF",
    // },
    extend: {
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
      },
      height: {
        102:"28rem",
        128: "32rem",
      },
      width:{
        102:"28rem",
      },
   
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
