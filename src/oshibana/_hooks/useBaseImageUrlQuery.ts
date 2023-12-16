import { useState } from "react";

const ALLOW_HOSTS = ["pbs.twimg.com"];

export const useBaseImageUrlQuery = () => {
  const [baseImageUrl, setBaseImageUrl] = useState<string | undefined>(() => {
    const baseImageUrl = new URLSearchParams(location.search).get(
      "baseImageUrl"
    );

    if (!baseImageUrl) {
      return;
    }

    let url;
    try {
      url = new URL(baseImageUrl);
    } catch (e) {
      return; // parse error
    }

    if (!ALLOW_HOSTS.includes(url.hostname)) {
      return;
    }

    return baseImageUrl;
  });

  return { baseImageUrl, setBaseImageUrl };
};
