import fs from "node:fs";
import { createHash } from "node:crypto";

import { bundle } from "./bundle.js";
import { log } from "node:console";

const { output } = bundle(process.argv[2]);

fs.mkdirSync("./dist", { recursive: true });
const hash = createHash("md5").update(output).digest("hex").slice(0, 6);
console.log(hash);

fs.writeFileSync(`./dist/main.${hash}.js`, output);
