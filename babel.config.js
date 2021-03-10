module.exports = {
  presets: ["@babel/preset-react", "@babel/preset-typescript"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["."],
        alias: {
          "~": "./src",
        },
      },
    ],
  ],
}
