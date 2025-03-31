/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        'white': '0 5px 5px #818cf8',
      },
      spacing: {
        '128': '32rem',
        '256': '64rem',
        '512': '128rem',
        '1024': '256rem',
      },
      colors:{
        CarbonicBlue : {
          500: '#0455cf',
        },
        Aqua : {
          500: '#00FFFF',
        },
        Teal : {
          500: '#03fcfc',
        },
        Purple : {
          500: '#bc1ee8',
        },
        Amber : {
          500: '#FDC004',
        }
      },
      fontFamily:{
        EstedadExtraBold:['EstedadExtraBold', 'serif'],
        EstedadMedium:['EstedadMedium', 'serif'],
        EstedadLight:['EstedadLight', 'serif'],
      }
    },
  },
  plugins: [],
}