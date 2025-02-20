import { AtUri } from "@atproto/api";
import { Box, Flex } from "@chakra-ui/react";
import { FC, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { enrichTweet, useTweet } from "react-tweet";

import { useAgent } from "@/components/AgentProvider.tsx";
import Header from "@/components/Header.tsx";
import PostView, { PostForm } from "@/components/PostView/PostView.tsx";
import SignInForm from "@/components/SignInForm.tsx";
import { BORDER_COLOR } from "@/constants.ts";
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

  useEffect(() => {
    if (!tweet) {
      return;
    }

    const enrichedTweet = enrichTweet(tweet);
    const text = enrichedTweet.entities.map(({ text }) => text).join();

    postFormMethods.setValue("text", text);

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
        ) : (
          <SignInForm />
        )}
      </Box>
    </>
  );
};

export default App;
