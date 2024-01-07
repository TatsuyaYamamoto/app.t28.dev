import title_sayaka_atlas from "../../spines/title-sayaka/out/title.atlas?raw";
import title_sayaka_skeleton from "../../spines/title-sayaka/out/title.json";
import title_sayaka_sprite from "../../spines/title-sayaka/out/title.png";

export const IMAGE_MANIFEST = [
  // {
  //   id: "table",
  //   src: table,
  // },
] as const;

export type ImageKey = (typeof IMAGE_MANIFEST)[number]["id"];

export const SPINE_MANIFEST = [
  {
    id: "title_sayaka",
    atlas: title_sayaka_atlas,
    skeleton: title_sayaka_skeleton,
    sprite: title_sayaka_sprite,
  },
];

export type SpineKey = (typeof SPINE_MANIFEST)[number]["id"];
