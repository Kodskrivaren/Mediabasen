/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,jsx}"],
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
      boxShadow: {
        modal: "0 0 125px 50px",
      },
      width: {
        card: "48%",
      },
      gap: {
        card: "4%",
      },
      screens: {},
    },
  },
};
