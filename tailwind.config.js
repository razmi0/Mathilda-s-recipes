import { postcss } from "tailwindcss";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/components/*.tsx", "./src/*.tsx", "./src/components/ui/*.tsx"],
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
          450: "#2B2F38FF",
          400: "#282C34FF",
          300: "#3A4254FF",
          200: "#495778FF",
          100: "#54669DFF",
          50: "#7A85BBFF",
        },

        card: {
          500: "rgb(58 66 84 / 0.95)",
        },
      },

      fontSize: {
        "2xl": "1.5rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.1s ease-out",
        "accordion-up": "accordion-up 0.1s ease-out",
      },
    },
  },
  plugins: [
    ({ addVariant }) => {
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
    },
    ({ addVariant, e, postcss }) => {
      addVariant("hover", ({ container, separator }) => {
        const hoverRule = postcss.atRule({ name: "media", params: "(hover: hover)" });
        hoverRule.append(container.nodes);
        container.append(hoverRule);
        hoverRule.walkRules((rule) => {
          rule.selector = `.${e(`hover${separator}${rule.selector.slice(1)}`)}:hover`;
        });
      });
    },
  ],
};
