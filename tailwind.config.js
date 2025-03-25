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
      backgroundImage: {
        pattern: "url('/src/assets/bg-pattern-dark.svg')",
        'pattern-primary': "url('/src/assets/bg-pattern-primary.svg')",
      },
      scale: {
        115: '1.15',
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
          success: '#43A047',
        },
      },
    ],
  },
};
