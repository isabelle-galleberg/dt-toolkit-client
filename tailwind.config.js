/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        empathize: '#12824E',
        define: '#BBFABB',
        ideate: '#1BB3F7',
        prototype: '#E9D7FA',
        test: '#907AFF',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#BEEBFA',
          'base-100': '#112E45',
          success: '#12824E',
        },
      },
    ],
  },
};
