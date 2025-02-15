export const BLUESKY_SERVICE = "https://bsky.social";

export const MAX_GRAPHEME_LENGTH = 300;

/**
 * https://docs.bsky.app/docs/advanced-guides/posts#images-embeds
 */
export const MAX_BLUESKY_IMAGE_FILE_SIZE_MIB =
  /* (max bytes with buffer) / kib / mib */
  (1000000 * 0.99) / 1024 / 1024;