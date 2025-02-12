import { AtpAgent, RichText } from "@atproto/api";

import { base64ToBinary, compressImage } from "@/utils.ts";

type PostRecord = Parameters<InstanceType<typeof AtpAgent>["post"]>[0];

export interface BlueskyEmbedImage {
  alt: string;
  base64: string;
  mediaType: string;
}

export const postToBluesky = async (
  agent: AtpAgent,
  text: string,
  images?: BlueskyEmbedImage[] | undefined,
) => {
  const richText = new RichText({ text });
  await richText.detectFacets(agent);

  const postRecord: PostRecord = {
    text,
    facets: richText.facets,
  };

  if (images && 1 <= images.length) {
    // priority #1
    // If a tweet has images, embed images as a blob
    // https://docs.bsky.app/docs/advanced-guides/posts#images-embeds

    const uploadedImagesPromise = images
      // bluesky allows to embed max 4 images
      .slice(0, 4)
      .map(async ({ alt, mediaType, base64 }) => {
        const compressed = await compressImage(
          base64ToBinary(base64),
          mediaType,
        );
        const result = await agent.uploadBlob(compressed, {
          encoding: mediaType,
        });
        return { alt, image: result.data.blob };
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
