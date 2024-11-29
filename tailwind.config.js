/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        Text: "#dcdcdb",
        Text2: "#383837",
        Text3: "#b5b5b5",
        Text4: "#7b7a79",
        Background: "#e9e8e4",
      },
    },
  },
  plugins: [],
};
