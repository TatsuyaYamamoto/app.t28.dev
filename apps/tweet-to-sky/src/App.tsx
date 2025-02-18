import { Box } from "@chakra-ui/react";
import { FC } from "react";

import { useAgent } from "@/components/AgentProvider.tsx";
import PostView from "@/components/PostView/PostView.tsx";
import SignInForm, { type SignInInputs } from "@/components/SignInForm.tsx";
import { BlueskyEmbedImage, postToBluesky } from "@/helpers/bluesky.ts";
import { useTweetInUrl } from "@/hooks/useTweetInUrl.ts";
import { AtUri } from "@atproto/api";

const App: FC = () => {
  const { agent, isSessionAvailable } = useAgent();
  const tweetId = useTweetInUrl();

  const onPost = async (
    text: string,
    images?: BlueskyEmbedImage[] | undefined,
  ) => {
    const res = await postToBluesky(agent, text, images);
    const atUri = new AtUri(res.uri);
    const htmlUrl = `https://bsky.app/profile/${agent.session?.handle}/post/${atUri.rkey}`;

    if (confirm("Go to Bluesky?")) {
      location.href = htmlUrl;
    }
  };

  const onRequestSingIn = async (inputs: SignInInputs) => {
    return agent
      .login({
        identifier: inputs.identifier,
        password: inputs.password,
      })
      .then(() => ({ isSuccess: true }))
      .catch(() => ({ isSuccess: false }));
  };

  const onRequestSingOut = async () => {
    await agent.logout();
  };

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
