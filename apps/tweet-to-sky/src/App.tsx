import { Box } from "@chakra-ui/react";
import { FC, useEffect } from "react";

import PostView from "@/components/PostView/PostView.tsx";
import SignInForm, { type SignInInputs } from "@/components/SignInForm.tsx";
import { BlueskyEmbedImage } from "@/helpers/bluesky.ts";
import { useAgent } from "@/hooks/useAgent.ts";
import { useTweetInUrl } from "@/hooks/useTweetInUrl.ts";

const App: FC = () => {
  const { login, logout, post, tryResumeSession, isSessionAvailable } =
    useAgent();
  const tweetId = useTweetInUrl();

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
