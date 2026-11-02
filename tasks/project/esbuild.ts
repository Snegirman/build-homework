import esbuild from "esbuild";
import { htmlPlugin } from "@craftamap/esbuild-plugin-html";

const options = {
  entryPoints: ["./src/index.tsx"],
  bundle: true,
  outdir: "./dist/esbuild",
  publicPath: "/esbuild/",
  plugins: [
    htmlPlugin({
      files: [
        {
          entryPoints: ["src/index.tsx"],
          filename: "index.html",
          htmlTemplate: `<div id="root"></div>`,
        },
      ],
    }),
  ],
};

esbuild.build(options).catch(() => process.exit(1));
