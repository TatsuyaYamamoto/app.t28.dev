import { useState } from "react";
import { useNextRouterQuery } from "../../../helper/utils";

const ALLOW_HOSTS = ["pbs.twimg.com"];

export const useBaseImageUrlQuery = () => {
  const { baseImageUrl: baseImageUrlQuery } = useNextRouterQuery();
  const [baseImageUrl, setBaseImageUrl] = useState<string | undefined>(() => {
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
