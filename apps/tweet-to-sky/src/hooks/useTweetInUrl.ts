import { useState } from "react";

export const useTweetInUrl = () => {
  const [tweetId] = useState<string | undefined>(() => {
    const url = new URL(window.location.href);
    const maybyTweetIdOrUrl = url.searchParams.get("tweet");

    if (!maybyTweetIdOrUrl) {
      return undefined;
    }

    if (/^[1-9][0-9]*$/.test(maybyTweetIdOrUrl)) {
      // This text is tweet id format.
      return maybyTweetIdOrUrl;
    }

    try {
      const maybyTweetUrl = new URL(maybyTweetIdOrUrl);
      if (
        maybyTweetUrl.hostname !== "twitter.com" &&
        maybyTweetUrl.hostname !== "x.com"
      ) {
        return undefined;
      }

      const pathParts = maybyTweetUrl.pathname.split("/");
      if (pathParts[2] === "status" && /^[1-9][0-9]*$/.test(pathParts[3])) {
        return pathParts[3];
      }
    } catch {
      // do nothing
    }

    return undefined;
  });

  return tweetId;
};
