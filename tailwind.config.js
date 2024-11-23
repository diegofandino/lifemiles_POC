/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background_login': '#EDEAE3',
        'button_primary_color': '#3366CC',
        'text_base': '#4D4D4F',
      },
    },
  },
  plugins: [],
}

