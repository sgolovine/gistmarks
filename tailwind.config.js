module.exports = {
  purge: ["./src/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    minWidth: {
      0: "0",
      "1/4": "25%",
      "1/2": "50%",
      "3/4": "75%",
      full: "100%",
      "create-panel": "32rem",
      sidebar: "24rem",
    },
    extend: {
      boxShadow: ["active"],
      backgroundColor: ["active"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
