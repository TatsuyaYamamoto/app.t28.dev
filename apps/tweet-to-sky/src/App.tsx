import { AtUri } from "@atproto/api";
import { Box } from "@chakra-ui/react";
import { FC, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTweet } from "react-tweet";

import { useAgent } from "@/components/AgentProvider.tsx";
import PostView, { PostForm } from "@/components/PostView/PostView.tsx";
import SignInForm from "@/components/SignInForm.tsx";
import { postToBluesky } from "@/helpers/bluesky.ts";
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
    const res = await postToBluesky(agent, formValue.text, {
      images: formValue.images,
    });
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

    const imagesPromise = tweet.mediaDetails?.flatMap((media) => {
      if (media.type !== "photo") {
        return [];
      }

      return fetch(media.media_url_https)
        .then((res) => res.blob())
        .then(async (blob) => {
          return {
            alt: media.ext_alt_text ?? "",
            file: new File([blob], media.display_url, { type: blob.type }),
            aspectRatio: {
              width: media.sizes.large.w,
              height: media.sizes.large.h,
            },
            objectUrl: URL.createObjectURL(blob),
          };
        });
    });
    Promise.all(imagesPromise ?? []).then((images) => {
      postFormMethods.setValue("images", images);
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
