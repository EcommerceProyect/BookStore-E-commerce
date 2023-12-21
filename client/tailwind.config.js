/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/flowbite-react/lib/esm/**/*.js',
    './node_modules/flowbite/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#590925', //navbar y footer
        accents: '#E71D3', //botones
        textLight: '#F6F8FF',
        textDark: '#2E3138',
        textGray: '#6C6F7D', // color gris para textos no importantes
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
