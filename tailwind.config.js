/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";

const colors = {
  ...defaultTheme.colors,
  highlight: "#2DD4BF",
};

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,mdx}", "./node_modules/primereact/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors,
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
