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
          light: '#4F8AFC',   // Light Sky Blue
          DEFAULT: '#2563EB', // Tailwind Blue-600
          dark: '#1E40AF',    // Tailwind Blue-800
        },
        secondary: {
          light: '#E5E7EB',   // Tailwind Gray-200
          DEFAULT: '#6B7280', // Tailwind Gray-500
          dark: '#374151',    // Tailwind Gray-700
        },
        accent: {
          light: '#FCD34D',   // Tailwind Yellow-300
          DEFAULT: '#F59E0B', // Tailwind Amber-500
          dark: '#B45309',    // Tailwind Amber-700
        },
        neutral: {
          light: '#F9FAFB',   // Tailwind Gray-50
          DEFAULT: '#F3F4F6', // Tailwind Gray-100
          dark: '#1F2937',    // Tailwind Gray-800
        }
      }
    },
  },
  plugins: [],
}


// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         primary: {
//           light: '#4d7c0f',
//           DEFAULT: '#3f6212',
//           dark: '#365314',
//         },
//         secondary: {
//           light: '#a8a29e',
//           DEFAULT: '#78716c',
//           dark: '#57534e',
//         }
//       }
//     },
//   },
//   plugins: [],
// } 