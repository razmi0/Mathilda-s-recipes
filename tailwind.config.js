/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/components/*.tsx", "./src/*.tsx"],
  theme: {
    extend: {
      colors: {
        def: {
          500: "#242424FF",
          400: "#343434FF",
          300: "#5F5F5FFF",
          200: "#AEAEAEFF",
          100: "#EBEBEBFF",
        },
        blueish: {
          500: "#1C1E24FF",
          400: "#282C34FF",
          300: "#3A4254FF",
          200: "#495778FF",
          100: "#54669DFF",
        },
      },

      fontSize: {
        "2xl": "1.5rem",
      },
    },
  },
  plugins: [
    ({ addVariant }) => {
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
    },
  ],
};
