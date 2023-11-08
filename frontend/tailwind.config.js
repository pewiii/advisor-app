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
        "primary": "rgb(33,118,174)",
        "secondary": "rgb(113,105,122)"
      },
      textColor: {
        "primary": "rgb(33,118,174)",
        "secondary": "rgb(113,105,122)"
      },
      borderColor: {
        "primary": "rgb(33,118,174)",
        "secondary": "rgb(113,105,122)"
      },
      outlineColor: {
        "primary": "rgb(33,118,174)",
        "secondary": "rgb(113,105,122)"
      }
    },
  },
  plugins: [],
}

/* background:rgba(33,118,174); primary */
/* background:rgba(113,105,122); secondary */