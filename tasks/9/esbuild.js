import esbuild from "esbuild";
import yamlPlugin from "./plugins/esbuild-plugin-yaml.js";

const options = {
  entryPoints: ["src/index.js"],
  bundle: true,
  format: "esm",
  outdir: "dist/esbuild",
  plugins: [yamlPlugin],
};

esbuild.build(options).catch(() => process.exit(1));
