import { Configuration } from "webpack";
import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import rsdoctor from "@rsdoctor/webpack-plugin";

const { RsdoctorWebpackPlugin } = rsdoctor;

const config: Configuration = {
  mode: "development",
  entry: "./src/index.tsx",
  plugins: [
    new HtmlWebpackPlugin({
      templateContent: `<div id="root"></div>`,
    }),
    new RsdoctorWebpackPlugin(),
  ],
  output: {
    path: path.resolve(import.meta.dirname, "./dist/webpack"),
    filename: "main.js",
    publicPath: "/webpack/",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    plugins: [
      new TsconfigPathsPlugin({
        extensions: [".ts", ".tsx", ".js"],
      }),
    ],
  },
  experiments: {
    css: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          // `.swcrc` can be used to configure swc
          loader: "swc-loader",
          options: {
            jsc: {
              parser: {
                syntax: "typescript",
                tsx: true,
              },
              transform: {
                react: {
                  runtime: "automatic",
                },
              },
            },
          },
        },
      },
    ],
  },
  devtool: "hidden-source-map",
};

export default config;
