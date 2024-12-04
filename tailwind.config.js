/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#262625",
        Text: "#dcdcdb",
        Text2: "#383837",
        Text3: "#b5b5b5",
        Text4: "#7b7a79",
        Background: "#e9e8e4",
      },
      backgroundImage: {
        "ellipse-8": "url('../../assets/Ellipse 8.png')",
      },
    },
  },
  plugins: [],
};
