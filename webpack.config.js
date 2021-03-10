const path = require("path")
// Webpack Plugins
const HtmlWebpackPlugin = require("html-webpack-plugin")
const webpack = require("webpack")
const Dotenv = require("dotenv-webpack")
const WebpackBar = require("webpackbar")

// Helpers
const dev = process.env.NODE_ENV === "development"

// Variables
const devFolderPath = path.resolve(__dirname, "__dev__")
const prodFolderPath = path.resolve(__dirname, "dist")

module.exports = {
  mode: dev ? "development" : "production",
  devtool: dev ? "cheap-module-source-map" : false,
  entry: path.resolve(__dirname, "src", "entry", "index.tsx"),
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".html", ".css"],
  },
  output: {
    path: dev ? devFolderPath : prodFolderPath,
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
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "entry", "index.html"),
    }),
    new Dotenv({
      path: path.resolve(__dirname, ".env"),
      safe: true,
      systemvars: true,
      silent: true,
    }),
    new WebpackBar(),
  ],
}
