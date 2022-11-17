/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/*.{js,ts,tsx,jsx}", "./src/*/*/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "blue": {
          "700": "#080831",
          "800": "#08082C"
        },
        "yellow": {
          "700": "#CD8605"
        }
      }
    },
  },
  plugins: [],
}
