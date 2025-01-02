/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // primary: "rgb(26,185,167)",
        primary: "rgb(0,215,192)",
        p: "rgb(127,127,127)",
      },
      fontFamily: {
        row: '"Rowdies", sans-serif',
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
};
