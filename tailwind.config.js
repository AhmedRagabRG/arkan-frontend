/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  plugins: [
    require('tailwindcss-rtl'),
  ],
  theme: {
    container: {},
    fontFamily: {
      'cairo-bold': ['Cairo-Bold'],
      'cairo-medium': ['Cairo-Medium'],
      'cairo-light': ['Cairo-Light'],
    },
    extend: {},
  },
};
