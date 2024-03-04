import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#cdcdcd",
          200: "#9b9b9b",
          300: "#696969",
          400: "#373737",
          500: "#090909",
          600: "#070707",
          700: "#050505",
          800: "#030303",
          900: "#010101"
        },
        black: {
          100: "#cdcdcd",
          200: "#9b9b9b",
          300: "#696969",
          400: "#373737",
          500: "#050505",
          600: "#040404",
          700: "#030303",
          800: "#020202",
          900: "#010101"
        },
        secondary: {
          100: "#ffffff",
          200: "#ffffff",
          300: "#ffffff",
          400: "#ffffff",
          500: "#ffffff",
          600: "#cccccc",
          700: "#999999",
          800: "#666666",
          900: "#333333"
        },
        white: {
          100: "#ffffff",
          200: "#ffffff",
          300: "#ffffff",
          400: "#ffffff",
          500: "#ffffff",
          600: "#cccccc",
          700: "#999999",
          800: "#666666",
          900: "#333333"
        },
        highlight: {
          100: "#fee7cc",
          200: "#fdce99",
          300: "#fdb666",
          400: "#fc9d33",
          500: "#fb8500",
          600: "#c96a00",
          700: "#975000",
          800: "#643500",
          900: "#321b00"
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
