/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transitionDuration: {
        '3000': '3000ms', // 10 seconds
      },
      boxShadow: {
        'brand': '0px 0px 6px 1px rgba(0, 0, 0, 0.1)',
        'input': 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset'
      },
      borderColor: {
        "main": '#212121'
      }
    },
  },
  plugins: [],
}

