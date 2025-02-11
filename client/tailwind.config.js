/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // primary: "rgb(0,215,192)",
        primary: "rgb(0,215,192)",
        p: "rgb(127,127,127)",
        c: "#171717",
      },
      fontFamily: {
        row: '"Rowdies", sans-serif',
      },
    },
  },
  darkMode: "class",
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
};
