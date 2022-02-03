const colors = require('tailwindcss/colors')
module.exports = {
  content: ['./components/**/*.tsx', './pages/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontSize: {
      'xs': '12px',
      'sm': '13px',
      'tiny': '14px',
      'base': '15px',
      'lg': '17px',
      'xl': '20px',
      '2xl': '28px',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
