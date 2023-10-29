/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      borderWidth: {
        "1": "1px"
      },
      screens: {
        "xs": "360px"
      },
      minWidth: {
        "2": "200px"
      },
      minHeight: {
        "3/4": "3/4vh"
      },
      backgroundColor: {
      }
    },
  },
  plugins: [],
}

