export default {
  build: {
    outDir: "./dist/vite",
    minify: false,
    rollupOptions: {
      input: {
        entry: "./src/entry.js",
        performance: "./src/performance.js",
      },
      output: {
        entryFileNames: "[name].js",
      },
    },
  },
};
