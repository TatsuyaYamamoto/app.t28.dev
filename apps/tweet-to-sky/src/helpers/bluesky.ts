import { MAX_BLUESKY_IMAGE_FILE_SIZE_MIB } from "@/constants.ts";
import { AtpAgent, RichText, type AppBskyEmbedDefs } from "@atproto/api";
import imageCompression from "browser-image-compression";

type PostRecord = Parameters<InstanceType<typeof AtpAgent>["post"]>[0];

export interface BlueskyEmbedImage {
  alt: string;
  file: File;
  aspectRatio: AppBskyEmbedDefs.AspectRatio;
}

export const postToBluesky = async (
  agent: AtpAgent,
  text: string,
  embeds?: {
    images?: BlueskyEmbedImage[];
  },
) => {
  const richText = new RichText({ text });
  await richText.detectFacets(agent);

  const postRecord: PostRecord = {
    text,
    facets: richText.facets,
  };

  if (embeds?.images && 1 <= embeds.images.length) {
    // priority #1
    // If a tweet has images, embed images as a blob
    // https://docs.bsky.app/docs/advanced-guides/posts#images-embeds

    const uploadedImagesPromise = embeds.images
      // bluesky allows to embed max 4 images
      .slice(0, 4)
      .map(async ({ alt, file, aspectRatio }) => {
        console.log(alt, file);
        const compressed = await imageCompression(file, {
          // https://github.com/Donaldcwl/browser-image-compression/blob/master/lib/image-compression.js#L51
          maxSizeMB: MAX_BLUESKY_IMAGE_FILE_SIZE_MIB,
        });
        const result = await agent.uploadBlob(compressed);
        return {
          alt,
          image: result.data.blob,
          aspectRatio,
        };
      });

    postRecord.embed = {
      $type: "app.bsky.embed.images",
      images: await Promise.all(uploadedImagesPromise),
    };
  } else {
    // priority #2
    // If tweet has links, embed a "first" link as a website card
    // https://docs.bsky.app/docs/advanced-guides/posts#website-card-embeds
    // TODO
  }

  return agent.post(postRecord);
};
