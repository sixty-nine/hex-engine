const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.ts",

  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        loader: "babel-loader",
        options: Object.assign(
          {
            babelrc: false,
          },
          require("./babel.config")
        ),
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin()],
};