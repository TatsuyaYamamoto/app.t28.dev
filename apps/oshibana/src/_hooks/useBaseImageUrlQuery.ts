import { useState } from "react";

const ALLOW_HOSTS = ["pbs.twimg.com"];

export const useBaseImageUrlQuery = () => {
  const [baseImageUrl, setBaseImageUrl] = useState<string | undefined>(() => {
    const baseImageUrlQuery = new URLSearchParams(location.search).get(
      "baseImageUrl",
    );

    if (!baseImageUrlQuery) {
      return;
    }

    let url;
    try {
      url = new URL(baseImageUrlQuery);
    } catch (e) {
      return; // parse error
    }

    if (!ALLOW_HOSTS.includes(url.hostname)) {
      return;
    }

    return baseImageUrlQuery;
  });

  return { baseImageUrl, setBaseImageUrl };
};
