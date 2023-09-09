const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    index: "./src/controller.js",
  },
  devtool: "inline-source-map",
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "styles", to: "styles" },
        { from: "img", to: "img" },
      ],
    }),
    new HtmlWebpackPlugin({
      title: "Development",
      template: "index.html",
    }),
  ],
  devServer: {
    host: 'localhost',
    port: 8080,
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
};
