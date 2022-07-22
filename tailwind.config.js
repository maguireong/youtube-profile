/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.tsx",
    "./features/**/*.tsx",
    "./pages/**/*.tsx",
    "./views/**/*.tsx",
    "./lib/color.ts",
  ],
  theme: {
    extend: {},
    extend: {
      colors: {
        youtubeRed: "#FF0000",
        youtubeBlack: "#282828",
      },
    },
  },
  plugins: [],
};
