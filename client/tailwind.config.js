import daisyui from 'daisyui';

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
        primary: '#FEE2D7',
        accents: '#367391',
        textLight: '#EFEFEF',
        textDark: '#333333',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
