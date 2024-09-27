/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  colors: {
    laal: '#c54545',
  },
  theme: {
    extend: {},
  },
  plugins: [require('tailwindcss-animated')],
};
