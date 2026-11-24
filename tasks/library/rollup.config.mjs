import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/index.ts",
  output: [
    { format: "es", file: "lib/index.mjs" },
    { format: "cjs", file: "lib/index.cjs" },
  ],
  plugins: [typescript()],
};
