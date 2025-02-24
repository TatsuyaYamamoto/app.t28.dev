import { useState } from "react";

const TWEET_QUERY_KEY = "tweet";

export const useTweetInUrl = () => {
  const [tweetId, setTweetId] = useState<string | undefined>(() => {
    const url = new URL(window.location.href);
    const maybyTweetIdOrUrl = url.searchParams.get(TWEET_QUERY_KEY);

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

  const clearTweetId = () => {
    setTweetId(undefined);
    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.delete(TWEET_QUERY_KEY);
    history.replaceState(null, "", nextUrl);
  };

  return [tweetId, clearTweetId] as const;
};
