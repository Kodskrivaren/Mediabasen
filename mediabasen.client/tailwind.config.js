/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    fontFamily: {
      sans: ["Alice"],
    },
    extend: {
      colors: {
        primary: "#000000",
        bright: "#ffffff",
        accent: "#57A2EF",
        dark: "#24272B",
        light: "#4A525A",
        middle: "#404040",
      },
      screens: {},
    },
  },
  plugins: [import("flowbite/plugin")],
};
