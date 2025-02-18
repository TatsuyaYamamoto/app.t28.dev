import { AtUri } from "@atproto/api";
import { Box } from "@chakra-ui/react";
import { FC, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTweet } from "react-tweet";

import { useAgent } from "@/components/AgentProvider.tsx";
import PostView, { PostForm } from "@/components/PostView/PostView.tsx";
import SignInForm from "@/components/SignInForm.tsx";
import { postToBluesky } from "@/helpers/bluesky.ts";
import { arrayBufferToBase64 } from "@/helpers/utils.ts";
import { useTweetInUrl } from "@/hooks/useTweetInUrl.ts";

const App: FC = () => {
  const { agent, isSessionAvailable } = useAgent();
  const tweetId = useTweetInUrl();
  const { data: tweet } = useTweet(tweetId);
  const postFormMethods = useForm<PostForm>({
    defaultValues: {
      text: "",
      images: [],
    },
  });

  const onPost = async (formValue: PostForm) => {
    const res = await postToBluesky(agent, formValue.text, formValue.images);
    const atUri = new AtUri(res.uri);
    const htmlUrl = `https://bsky.app/profile/${agent.session?.handle}/post/${atUri.rkey}`;

    if (confirm("Go to Bluesky?")) {
      location.href = htmlUrl;
    }
  };

  const onRequestSingOut = async () => {
    await agent.logout();
  };

  useEffect(() => {
    if (!tweet) {
      return;
    }

    postFormMethods.setValue("text", tweet.text);

    const photosPromise = tweet.photos?.map(async (photo) => {
      const blob = await fetch(photo.url).then((res) => res.blob());
      return {
        alt: "",
        base64: arrayBufferToBase64(await blob.arrayBuffer()),
        mediaType: blob.type,
      };
    });
    Promise.all(photosPromise ?? []).then((photos) => {
      postFormMethods.setValue("images", photos);
    });
  }, [tweet]);

  return (
    <>
      <Box as="main" display="flex" justifyContent="center" height="100%">
        {isSessionAvailable ? (
          <FormProvider {...postFormMethods}>
            <PostView onPost={onPost} onRequestSingOut={onRequestSingOut} />
          </FormProvider>
        ) : (
          <SignInForm />
        )}
      </Box>
    </>
  );
};

export default App;
