import { defineConfig } from "vite";
import yamlPlugin from "./plugins/rollup-plugin-yaml.js";

export default defineConfig({
  build: {
    ssr: true,
    outDir: "dist/vite",
    minify: false,
    rollupOptions: {
      input: "./src/index.js",
    },
  },
  plugins: [yamlPlugin()],
});
