import { build } from "esbuild";

await build({
  entryPoints: ["./src/entry.js", "./src/performance.js"],
  outdir: "./dist/esbuild",
  bundle: true,
});
