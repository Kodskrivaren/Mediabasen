/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,jsx}"],
  theme: {
    fontFamily: {
      sans: ["Alice"],
    },
    extend: {
      gridTemplateRows: {
        closed: "0fr",
        open: "1fr",
      },
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
        note: "0 0 15px 5px",
      },
      width: {
        "card-mobile": "48%",
        "card-tablet": "31%",
        "card-desktop": "23%",
      },
      gap: {
        "card-mobile": "4%",
        "card-tablet": "3.5%",
        "card-desktop": "2.75%",
        line: "1px",
      },
      screens: {},
      animation: {
        note: "slide-in 5s ease-in forwards",
      },
      keyframes: {
        "slide-in": {
          "0%": { transform: "translateX(100%)" },
          "10%": { transform: "translateX(0)" },
          "90%": { opacity: "1" },
          "100%": { transform: "translateX(0)", opacity: "0" },
        },
      },
    },
  },
};
