const HtmlWebpackPlugin = require("html-webpack-plugin");
const {
  ModuleFederationPlugin,
} = require("@module-federation/enhanced/webpack");
const mfConfig = require("./module-federation.config");

module.exports = {
  mode: "development",
  entry: "./src/bootstrap.js",
  output: {
    publicPath: "auto",
  },
  devServer: {
    port: 3001,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "swc-loader",
          options: {
            jsc: {
              parser: {
                syntax: "ecmascript",
                jsx: true,
              },
            },
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./template.html",
    }),
    new ModuleFederationPlugin(mfConfig),
  ],
};
