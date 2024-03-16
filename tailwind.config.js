/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/components/*.tsx", "./src/*.tsx"],
  theme: {
    extend: {
      fontSize: {
        "2xl": "1.5rem",
      },
    },
  },
  plugins: [],
};
