/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    `./components/**/*.{js,vue,ts}`,
    `./layouts/**/*.vue`,
    `./pages/**/*.vue`,
    `./plugins/**/*.{js,ts`,
    `./nuxt.config.{js,ts}`,
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        roboto: ["Roboto Mono", "sans-serif"],
        lexend: ["Lexend Deca", "sans-serif"],
      },
      colors: {
        primary: "#000",
        light: "#f9f9f9",
      },
    },
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require("windicss/plugin/typography")({
      dark: true,
    }),
  ],
};
