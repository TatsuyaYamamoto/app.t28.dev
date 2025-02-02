import hime_atlas from "../../spines/exports/hime.atlas?raw";
import hime_skeleton from "../../spines/exports/hime.json";
import hime_sprite from "../../spines/exports/hime.png";

import kekka_back from "./kekka_back.png";
import kekka_share from "./kekka_share.png";
import kekka_title from "./kekka_title.png";

export const IMAGE_MANIFEST = [
  {
    id: "kekka_back",
    src: kekka_back,
  },
  {
    id: "kekka_share",
    src: kekka_share,
  },
  {
    id: "kekka_title",
    src: kekka_title,
  },
] as const;

export type ImageKey = (typeof IMAGE_MANIFEST)[number]["id"];

export const SPINE_MANIFEST = [
  {
    id: "hime",
    atlas: hime_atlas,
    skeleton: hime_skeleton,
    sprite: hime_sprite,
  },
] as const;

export type SpineKey = (typeof SPINE_MANIFEST)[number]["id"];
