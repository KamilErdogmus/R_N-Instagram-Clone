/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      colors: { bg: "#fafafa", btn: "#0095F6" },
      fontFamily: {
        proxima: ["Nova", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
