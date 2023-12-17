import { useState } from "react";

const ALLOW_HOSTS = ["pbs.twimg.com"];

export const useBaseImageUrlQuery = () => {
  const [baseImageUrl, setBaseImageUrl] = useState<string | undefined>(() => {
    const search = new URL(location.href).searchParams;
    const baseImageUrlQuery = search.get("baseImageUrl");

    if (!baseImageUrlQuery) {
      return;
    }

    try {
      if (!ALLOW_HOSTS.includes(new URL(baseImageUrlQuery).hostname)) {
        return;
      }

      return baseImageUrlQuery;
    } catch (e) {
      return; // parse error
    }
  });

  return { baseImageUrl, setBaseImageUrl };
};
