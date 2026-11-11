import { parse } from "yaml";

export default (source) => {
  const data = parse(source);

  return `export default ${JSON.stringify(data)}`;
};
