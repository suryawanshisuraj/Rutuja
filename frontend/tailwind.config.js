/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'surface': '#fff8f7',
        'surface-container': '#ffe9e7',
        'primary': '#b0004a',
        'primary-container': '#d81b60',
        'secondary': '#ab2c5d',
        'secondary-container': '#fd6c9c',
        'tertiary': '#735c00',
        'tertiary-container': '#cca730',
        'on-surface': '#3d0506',
        'on-surface-variant': '#5a4044',
        'outline': '#8e6f74',
        'outline-variant': '#e3bdc3',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Quicksand', 'sans-serif'],
        handwriting: ['Caveat', 'cursive'],
      },
    },
  },
  plugins: [],
}
