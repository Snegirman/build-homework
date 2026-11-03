import path from "node:path";

export default {
  input: {
    entry: "./src/entry.js",
    performance: "./src/performance.js",
  },
  output: {
    dir: path.resolve(import.meta.dirname, "./dist/rollup"),
    entryFileNames: "[name].js",
  },
};
