const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
<<<<<<< HEAD
    index: "./src/controller.js",
=======
    index: "./src/main.js",
>>>>>>> 8a0b3ff6d9b3c4df41fccbc169ad17cdbd2a6d2b
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
<<<<<<< HEAD
    host: 'localhost',
    port: 8080,
=======
    static: "./dist",
>>>>>>> 8a0b3ff6d9b3c4df41fccbc169ad17cdbd2a6d2b
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
};
<<<<<<< HEAD

=======
>>>>>>> 8a0b3ff6d9b3c4df41fccbc169ad17cdbd2a6d2b
