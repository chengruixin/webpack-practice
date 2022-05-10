const path = require("path");
const HTMLWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },

  module: {
    rules: [
      {
        test: /\.txt$/,
        use: path.resolve(__dirname, 'loaders', 'rawLoader.js')
      }
    ]
  },

  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.html'
    })
  ]
};
