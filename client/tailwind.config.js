/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FEE2D7',
        accents: '#367391',
        textLight: '#EFEFEF',
        textDark: '#333333',
      },
    },
  },
  plugins: [],
}
