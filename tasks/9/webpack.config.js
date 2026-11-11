import path from "node:path";

const config = {
  entry: "./src/index.js",
  mode: "development",
  devtool: false,
  output: {
    library: {
      type: "module",
    },
    path: path.resolve(import.meta.dirname, "dist/webpack"),
  },
  experiments: {
    outputModule: true,
  },
  module: {
    rules: [
      {
        test: /\.ya?ml$/,
        use: path.resolve(import.meta.dirname, "./plugins/yaml-loader.js"),
      },
    ],
  },
};

export default config;
