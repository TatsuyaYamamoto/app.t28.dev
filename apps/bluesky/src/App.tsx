import { Box } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";

import PostView from "@/components/PostView/PostView.tsx";
import SignInForm, { type SignInInputs } from "@/components/SignInForm.tsx";
import { BlueskyEmbedImage } from "@/helpers/bluesky.ts";
import { useAgent } from "@/hooks/useAgent.ts";

const App: FC = () => {
  const { login, logout, post, tryResumeSession, isSessionAvailable } =
    useAgent();
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

  const onPost = async (
    text: string,
    images?: BlueskyEmbedImage[] | undefined,
  ) => {
    const { htmlUrl } = await post(text, images);

    if (confirm("Go to Bluesky?")) {
      location.href = htmlUrl;
    }
  };

  const onRequestSingIn = async (inputs: SignInInputs) => {
    return login(inputs.identifier, inputs.password)
      .then(() => ({ isSuccess: true }))
      .catch(() => ({ isSuccess: false }));
  };

  const onRequestSingOut = async () => {
    await logout();
  };

  useEffect(
    () => {
      void tryResumeSession();
    },
    [
      /* onMount only */
    ],
  );

  return (
    <>
      <Box as="main" display="flex" justifyContent="center" height="100%">
        {isSessionAvailable ? (
          <PostView
            tweetId={tweetId}
            onPost={onPost}
            onRequestSingOut={onRequestSingOut}
          />
        ) : (
          <SignInForm onRequestSingIn={onRequestSingIn} />
        )}
      </Box>
    </>
  );
};

export default App;
