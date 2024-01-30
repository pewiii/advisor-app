/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  darkMode: 'class', // or 'media' or 'class'
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
        "primary": "#2176ae",
        "secondary": "#71697a"
      },
      textColor: {
        "primary": "#2176ae",
        "secondary": "#71697a"
      },
      borderColor: {
        "primary": "#2176ae",
        "secondary": "#71697a"
      },
      outlineColor: {
        "primary": "#2176ae",
        "secondary": "#71697a"
      }
    },
    container: {
      screens: {
        sm: '600px',
        md: '728px',
        lg: '984px',
        xl: '1240px',
        '2xl': '1496px',
      },
    }
  },
  plugins: [],
}

/* background:rgba(33,118,174); primary */
/* background:rgba(113,105,122); secondary */