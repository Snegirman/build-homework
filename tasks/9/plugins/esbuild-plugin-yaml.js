import { readFile } from "node:fs/promises";
import { parse } from "yaml";

export default {
  name: "pl",
  setup: (build) => {
    build.onLoad({ filter: /\.ya?ml$/ }, async (args) => {
      const source = await readFile(args.path, "utf8");

      const data = parse(source);

      return {
        contents: `export default ${JSON.stringify(data)}`,
        loader: "js",
      };
    });
  },
};
