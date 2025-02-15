import { Box } from "@chakra-ui/react";
import { FC, useEffect } from "react";

import PostView from "@/components/PostView/PostView.tsx";
import SignInForm, { type SignInInputs } from "@/components/SignInForm.tsx";
import { BlueskyEmbedImage } from "@/helpers/bluesky.ts";
import { useAgent } from "@/hooks/useAgent.ts";

const App: FC = () => {
  const { login, logout, post, tryResumeSession, isSessionAvailable } =
    useAgent();

  const onPost = async (
    text: string,
    images?: BlueskyEmbedImage[] | undefined,
  ) => {
    await post(text, images);
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
          <PostView onPost={onPost} onRequestSingOut={onRequestSingOut} />
        ) : (
          <SignInForm onRequestSingIn={onRequestSingIn} />
        )}
      </Box>
    </>
  );
};

export default App;
