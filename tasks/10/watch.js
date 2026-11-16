import fg from "fast-glob";
import chokidar from "chokidar";
import { once } from "node:events";

const changedFilesLog = [];
let watcher;

export function getLog() {
  return changedFilesLog;
}

export async function subscribe() {
  const pathes = await fg("src/**/*.js");
  watcher = chokidar.watch(pathes);
  watcher.on("change", (filePath) => {
    changedFilesLog.push(filePath);
  });
  await once(watcher, "ready");
}

export function unsubscribe() {
  return watcher.close();
}
