const path = require("path");
const CleanPlugin = require("clean-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/webpack/app.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist/webpack"),
    publicPath: "dist/webpack",
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.ts$/, // all ts.extension file
        use: "ts-loader", // use ts-loader
        exclude: /node-module/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [new CleanPlugin.CleanWebpackPlugin()], // delete bundle.js and build latest bundle.js
};
