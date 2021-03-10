const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const webpack = require("webpack")

const devFolder = "__dev__"
const devFolderPath = path.resolve(__dirname, devFolder)

module.exports = {
  mode: "development",
  devtool: "cheap-module-source-map",
  entry: "./src/entry/index.tsx",
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".html", ".css"],
  },
  output: {
    path: devFolderPath,
    filename: "[name].[contenthash].bundle.js",
  },
  devServer: {
    contentBase: devFolderPath,
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
  plugins: [
    new HtmlWebpackPlugin({ template: "./src/entry/index.html" }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      GITHUB_CLIENT_ID: JSON.stringify(process.env.GITHUB_CLIENT_ID),
      REDIRECT_URI: JSON.stringify(process.env.REDIRECT_URI),
    }),
  ],
}
