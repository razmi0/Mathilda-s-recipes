/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/components/*.tsx", "./src/*.tsx"],
  theme: {
    extend: {
      cs: {
        500: "#242424FF",
        400: "#343434FF",
        300: "#5F5F5FFF",
        200: "#AEAEAEFF",
        100: "#EBEBEBFF",
      },
      fontSize: {
        "2xl": "1.5rem",
      },
    },
  },
  plugins: [],
};
