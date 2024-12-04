/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  plugins: [
    require('tailwindcss-rtl'),
  ],
  theme: {
    container: {
      padding: {
        // 'sm': '2rem',
        // 'lg': '2rem',
        // 'xl': '2rem',
        // '2xl': '2rem',
      },
    },
    fontFamily: {
      'cairo-bold': ['Cairo-Bold'],
      'cairo-medium': ['Cairo-Medium'],
      'cairo-light': ['Cairo-Light'],
    },
    extend: {},
  },
};
