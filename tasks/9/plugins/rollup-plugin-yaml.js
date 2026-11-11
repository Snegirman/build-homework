import { parse } from "yaml";

export default () => ({
  name: "pl",
  transform: (code, id) => {
    if (!id.endsWith(".yaml") && !id.endsWith(".yml")) {
      return null;
    }

    const data = parse(code);

    return `export default ${JSON.stringify(data)}`;
  },
});
