import fs from "node:fs";
import path from "node:path";

const packageJSON = JSON.parse(fs.readFileSync("./package.json", "utf-8"));

const { imports } = packageJSON;
const rootDir = path.resolve(".");

const extensionsToResolve = ["js", "ts", "json"];

export function resolve(importPath, parentPath) {
  let absImportPath = null;
  if (importPath.startsWith("#")) {
    for (const [alias, target] of Object.entries(imports)) {
      const prefix = alias.slice(0, -1);

      if (importPath.startsWith(prefix)) {
        const secondPart = importPath.slice(prefix.length);
        const restoredPath = target.replace("*", secondPart);
        absImportPath = path.resolve(rootDir, restoredPath);
        break;
      }
    }
  } else {
    const parentDir = path.dirname(parentPath);
    absImportPath = path.resolve(parentDir, importPath);
  }

  if (absImportPath === null) return null;

  const ext = path.extname(absImportPath);

  if (ext) return isFileExists(absImportPath);

  for (const extention of extensionsToResolve) {
    const fullPath = absImportPath + "." + extention;
    if (isFileExists(fullPath)) {
      return fullPath;
    }
  }

  return null;
}

function isFileExists(filePath) {
  try {
    fs.readFileSync(filePath);
    return filePath;
  } catch (err) {
    return null;
  }
}
