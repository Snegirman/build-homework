import path from "node:path";

export default {
  entry: {
    entry: "./src/entry.js",
    performance: "./src/performance.js",
  },
  output: {
    path: path.resolve(import.meta.dirname, "./dist/webpack"),
    filename: "[name].js",
  },
};
