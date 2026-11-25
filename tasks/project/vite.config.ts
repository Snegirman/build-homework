import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  base: "/vite/",
  build: {
    outDir: "dist/vite",
    sourcemap: "hidden",
    rollupOptions: {
      output: {
        entryFileNames: "[name]_[hash:8].js",
        chunkFileNames: "[name]_[hash:8].js",
        assetFileNames: "[name]_[hash:8][extname]",
        hashCharacters: "hex",
      },
    },
  },
});
