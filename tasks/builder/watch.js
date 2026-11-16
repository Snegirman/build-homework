import fs from "node:fs";
import chokidar from "chokidar";

import { bundle } from "./bundle.js";

const entryPath = process.argv[2];
const { output, files } = bundle(entryPath);
const watcher = chokidar.watch(files);
watcher.on("change", () => {
  const { output } = bundle(entryPath);
  fs.writeFileSync(`./dist/main.js`, output);
});

fs.mkdirSync("./dist", { recursive: true });
fs.writeFileSync(`./dist/main.js`, output);

// Реализуйте watch здесь
