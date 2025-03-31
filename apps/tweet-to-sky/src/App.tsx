import { AtUri } from "@atproto/api";
import { Box, Flex } from "@chakra-ui/react";
import { FC } from "react";
import { FormProvider } from "react-hook-form";
import { useTweet } from "react-tweet";

import { useAgent } from "@/components/AgentProvider.tsx";
import Header from "@/components/Header.tsx";
import LoadingOverlay from "@/components/LoadingOverlay.tsx";
import { Toaster, toaster } from "@/components/PostSuccessToaster.tsx";
import PostView, { PostForm } from "@/components/PostView/PostView.tsx";
import SignInForm from "@/components/SignInForm.tsx";
import { BORDER_COLOR } from "@/constants.ts";
import { postToBluesky } from "@/helpers/bluesky.ts";
import { usePostForm } from "@/hooks/usePostForm.ts";
import { useTweetInUrl } from "@/hooks/useTweetInUrl.ts";

const App: FC = () => {
  const { agent, isSessionAvailable } = useAgent();
  const [tweetId, clearTweetId] = useTweetInUrl();
  const { data: tweet, isLoading } = useTweet(tweetId);
  const postFormMethods = usePostForm(tweet ?? undefined);

  const onPost = async (formValue: PostForm) => {
    const res = await postToBluesky(agent, formValue.text, {
      images: formValue.images,
    });

    postFormMethods.reset();
    clearTweetId();

    const atUri = new AtUri(res.uri);
    toaster.create({
      meta: {
        postHtmlUrl: `https://bsky.app/profile/${agent.session?.handle}/post/${atUri.rkey}`,
      },
    });
  };

  if (!isSessionAvailable) {
    return (
      <Box as="main" display="flex" justifyContent="center" height="100%">
        <SignInForm />
      </Box>
    );
  }

  return (
    <>
      <LoadingOverlay open={isLoading} />
      <Box as="main" display="flex" justifyContent="center" height="100%">
        <Flex
          direction="column"
          maxWidth={600}
          width="100%"
          height="100%"
          borderColor={BORDER_COLOR}
          borderLeftWidth={1}
          borderRightWidth={1}
        >
          <FormProvider {...postFormMethods}>
            <Header onPost={onPost} />
            <PostView />
          </FormProvider>
        </Flex>
      </Box>
      <Toaster />
    </>
  );
};

export default App;
