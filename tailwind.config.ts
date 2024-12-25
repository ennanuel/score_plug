import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      'tiny': '.5rem',
      '3xs': '.6rem',
      '2xs': '.65rem',
      'xs': '.7rem',
      'sm': '.75rem',
      'base': '.85rem',
    },
    fontFamily: {
      'figtree': 'Figtree'
    },
    extend: {
      colors: {
        primary: {
          100: "#cdcdcd",
          200: "#9b9b9b",
          300: "#696969",
          400: "#373737",
          500: "#101010",
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
    animation: {
      loadgradient: 'loadinggradient 1s linear infinite',
      loadopacity: 'loadingopacity 500ms linear var(--delay) infinite alternate'
    },
    keyframes: {
      loadinggradient: {
        '0%': { backgroundPosition: '200% 0' },
        '100%': { backgroundPosition: '0% 0' }
      },
      loadingopacity: {
        from: { opacity: '0.4' },
        to: { opacity: '1' }
      }
    }
  },
  plugins: [],
};

export default config;
