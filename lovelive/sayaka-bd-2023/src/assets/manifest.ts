import title_sayaka_atlas from "../../spines/exports/sayaka.atlas?raw";
import title_sayaka_skeleton from "../../spines/exports/sayaka.json";
import title_sayaka_sprite from "../../spines/exports/sayaka.png";
import title_logo_atlas from "../../spines/exports/logo.atlas?raw";
import title_logo_skeleton from "../../spines/exports/logo.json";
import title_logo_sprite from "../../spines/exports/logo.png";
import game_sayaka_atlas from "../../spines/exports/game-sayaka.atlas?raw";
import game_sayaka_skeleton from "../../spines/exports/game-sayaka.json";
import game_sayaka_sprite from "../../spines/exports/game-sayaka.png";

import back from "./back.jpg";
import bento_1 from "./bento_1.png";
import bento_2 from "./bento_2.png";
import bento_3 from "./bento_3.png";
import kekka_share from "./kekka_share.png";
import kekka_title from "./kekka_title.png";

export const IMAGE_MANIFEST = [
  {
    id: "back",
    src: back,
  },
  {
    id: "bento_1",
    src: bento_1,
  },
  {
    id: "bento_2",
    src: bento_2,
  },
  {
    id: "bento_3",
    src: bento_3,
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
  {
    id: "game_sayaka",
    atlas: game_sayaka_atlas,
    skeleton: game_sayaka_skeleton,
    sprite: game_sayaka_sprite,
  },
];

export type SpineKey = (typeof SPINE_MANIFEST)[number]["id"];
