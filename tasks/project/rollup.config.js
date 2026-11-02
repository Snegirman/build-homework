import css from "rollup-plugin-import-css";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import html from "@rollup/plugin-html";
import typescript from "@rollup/plugin-typescript";
import replace from "@rollup/plugin-replace";

export default {
  input: "./src/index.tsx",
  output: {
    dir: "./dist/rollup",
    format: "es",
  },
  plugins: [
    replace({
      preventAssignment: true,
      "process.env.NODE_ENV": JSON.stringify("development"),
    }),
    typescript(),
    nodeResolve({ browser: true }),
    commonjs(),
    css(),
    html({
      publicPath: "/rollup/",
      template: ({ files, publicPath }) => {
        const links = files.css
          .map(
            ({ fileName }) =>
              `<link rel="stylesheet" href="${publicPath}${fileName}">`,
          )
          .join("\n");
        const scripts = files.js
          .map(
            ({ fileName }) =>
              `<script type="module" src="${publicPath}${fileName}"></script>`,
          )
          .join("\n");

        return `<head>${links}</head><body>${scripts}<div id="root"></div></body>`;
      },
    }),
  ],
};
