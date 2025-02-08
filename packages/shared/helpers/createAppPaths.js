import path from "node:path";
import url from "node:url";

export const createAppPaths = (importMeta) => {
  const dirBaseName = path.basename(
    path.dirname(url.fileURLToPath(importMeta.url)),
  );
  const base = path.resolve("/", ...dirBaseName.split("."));

  return {
    base,
    outDir: `../../dist${base}`,
  };
};
