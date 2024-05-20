import title_sayaka_atlas from "../../spines/exports/sayaka.atlas?raw";
import title_sayaka_skeleton from "../../spines/exports/sayaka.json";
import title_sayaka_sprite from "../../spines/exports/sayaka.png";
import title_logo_atlas from "../../spines/exports/logo.atlas?raw";
import title_logo_skeleton from "../../spines/exports/logo.json";
import title_logo_sprite from "../../spines/exports/logo.png";
import game_kaho_atlas from "../../spines/exports/kaho-game.atlas?raw";
import game_kaho_skeleton from "../../spines/exports/kaho-game.json";
import game_kaho_sprite from "../../spines/exports/kaho-game.png";

import back from "./back.png";
import desk from "./desk.png";
import bento_1 from "./bento_1.png";
import bento_2 from "./bento_2.png";
import bento_3 from "./bento_3.png";
import kekka_share from "./kekka_share.png";
import kekka_title from "./kekka_title.png";
import tea_step_1 from "./tea-step-1.png";
import tea_step_2 from "./tea-step-2.png";

export const IMAGE_MANIFEST = [
  {
    id: "back",
    src: back,
  },
  {
    id: "desk",
    src: desk,
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
  {
    id: "tea_step_1",
    src: tea_step_1,
  },
  {
    id: "tea_step_2",
    src: tea_step_2,
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
    id: "game_kaho",
    atlas: game_kaho_atlas,
    skeleton: game_kaho_skeleton,
    sprite: game_kaho_sprite,
  },
] as const;

export type SpineKey = (typeof SPINE_MANIFEST)[number]["id"];
