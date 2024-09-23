import rurino_atlas from "../../spines/exports/rurino.atlas?raw";
import rurino_skeleton from "../../spines/exports/rurino.json";
import rurino_sprite from "../../spines/exports/rurino.png";

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
    id: "rurino",
    atlas: rurino_atlas,
    skeleton: rurino_skeleton,
    sprite: rurino_sprite,
  },
] as const;

export type SpineKey = (typeof SPINE_MANIFEST)[number]["id"];
