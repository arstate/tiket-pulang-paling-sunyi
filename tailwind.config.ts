import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "color-mix(in srgb, var(--accent) calc(<alpha-value> * 100%), transparent)",
          hover: "var(--accent-hover)",
          light: "var(--accent-light)",
          contrast: "var(--accent-contrast)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "Inter", "sans-serif"],
        serif: ["var(--font-merriweather)", "Merriweather", "Charter", "Georgia", "serif"],
        lora: ["var(--font-lora)", "Lora", "serif"],
        georgia: ["Georgia", "Cambria", "serif"],
      },
      boxShadow: {
        subtle: "var(--shadow-sm)",
        card: "var(--shadow-md)",
        floating: "var(--shadow-lg)",
      },
    },
  },
  plugins: [],
};
export default config;
