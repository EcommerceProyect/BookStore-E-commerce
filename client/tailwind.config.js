/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/flowbite-react/lib/esm/**/*.js',
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
<<<<<<< HEAD
  plugins: [require('flowbite/plugin')],
}
=======
  plugins: [],
};
>>>>>>> 4f7b99096a94584891135b801521357fa5e5bd6b
