import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import rsdoctor from "@rsdoctor/webpack-plugin";

const { RsdoctorWebpackPlugin } = rsdoctor;

const config = {
  entry: "./src/main.tsx",
  mode: "production",
  // TODO
  devtool: false,
  experiments: {
    css: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
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
      {
        test: /\.(ttf|png)$/,
        type: "asset/resource",
      },
      {
        test: /\.svg$/,
        resourceQuery: /url/,
        type: "asset/resource",
      },
      {
        test: /\.svg$/,
        resourceQuery: /component/,
        use: ["@svgr/webpack"],
      },
    ],
  },
  plugins: [new RsdoctorWebpackPlugin()],
  resolve: {
    extensions: [".ts", ".tsx", "..."],
    plugins: [new TsconfigPathsPlugin()],
    fallback: {
      fs: false,
      path: false,
      crypto: false,
    },
  },
};

export default config;
