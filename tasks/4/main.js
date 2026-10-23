import fs from "node:fs";
import { transformer } from "./transformer.js";
import * as astring from "astring";
import { parse } from "acorn";

// read file with source code
const file = fs.readFileSync("./entry.js", "utf-8");
const parsed = parse(file, { ecmaVersion: "latest" });
const transformed = transformer(parsed);
const result = astring.generate(transformed);
// get ast from source code

// transform ast

// convert ast to source code

// write source code to file
fs.writeFileSync("./result.js", result);
