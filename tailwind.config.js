/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
  ],
  theme: {
    extend: {
      colors:{
        'white': '#ffff',
        'delf-blue': '#3A405A',
        'rose-taupe': '#875053',
        'oxford-blue': '#011936',
        'skobeloff': '#1D7874',
        'mikado-yellow': '#FFC60A',
      },
    },
  },
  plugins: [],
}