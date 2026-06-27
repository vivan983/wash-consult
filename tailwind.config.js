/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
    './layouts/**/*.{vue,js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0B1E3D',
          50: '#E8EDF5',
          100: '#C5D1E6',
          200: '#9EB3CE',
          300: '#7795B6',
          400: '#50779E',
          500: '#0B1E3D',
          600: '#091A34',
          700: '#07152B',
          800: '#051022',
          900: '#030B19',
        },
        accent: {
          DEFAULT: '#D4A017',
          50: '#FBF3D8',
          100: '#F7E7B1',
          200: '#EFD474',
          300: '#E7C137',
          400: '#D4A017',
          500: '#B88A14',
          600: '#9C7411',
          700: '#805E0E',
          800: '#64480B',
          900: '#483208',
        },
        light: '#F8F9FA',
        text: '#1A1A2E',
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Open Sans', 'sans-serif'],
      },
      fontSize: {
        'body': '16px',
        'caption': '13px',
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
};
