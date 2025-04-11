/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4d7c0f',
          DEFAULT: '#3f6212',
          dark: '#365314',
        },
        secondary: {
          light: '#a8a29e',
          DEFAULT: '#78716c',
          dark: '#57534e',
        }
      }
    },
  },
  plugins: [],
} 