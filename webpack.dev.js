const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "cheap-module-source-map",
  entry: "./src/index.tsx",
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".html", ".css"],
  },
  output: {
    path: path.resolve(__dirname, "__dev__"),
    filename: "[name].[contenthash].bundle.js",
  },
  devServer: {
    contentBase: path.resolve(__dirname, "__dev__"),
    hot: true,
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /.(js|jsx|ts|tsx)/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /.(css)/,
        use: ["style-loader", "css-loader", "postcss-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: "./src/index.html" })],
};
