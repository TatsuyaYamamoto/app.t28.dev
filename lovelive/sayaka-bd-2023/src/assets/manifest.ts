import title_sayaka_atlas from "../../spines/title-sayaka/out/sayaka.atlas?raw";
import title_sayaka_skeleton from "../../spines/title-sayaka/out/sayaka.json";
import title_sayaka_sprite from "../../spines/title-sayaka/out/sayaka.png";
import title_logo_atlas from "../../spines/title-sayaka/out/logo.atlas?raw";
import title_logo_skeleton from "../../spines/title-sayaka/out/logo.json";
import title_logo_sprite from "../../spines/title-sayaka/out/logo.png";

import back from "./back.jpg";

export const IMAGE_MANIFEST = [
  {
    id: "back",
    src: back,
  },
] as const;

export type ImageKey = (typeof IMAGE_MANIFEST)[number]["id"];

export const SPINE_MANIFEST = [
  {
    id: "title_sayaka",
    atlas: title_sayaka_atlas,
    skeleton: title_sayaka_skeleton,
    sprite: title_sayaka_sprite,
  },
  {
    id: "title_logo",
    atlas: title_logo_atlas,
    skeleton: title_logo_skeleton,
    sprite: title_logo_sprite,
  },
];

export type SpineKey = (typeof SPINE_MANIFEST)[number]["id"];
