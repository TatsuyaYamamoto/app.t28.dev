import title_kozue_atlas from "../../spines/exports/kozue-title.atlas?raw";
import title_kozue_skeleton from "../../spines/exports/kozue-title.json";
import title_kozue_sprite from "../../spines/exports/kozue-title.png";

import title_logo_atlas from "../../spines/exports/title-logo.atlas?raw";
import title_logo_skeleton from "../../spines/exports/title-logo.json";
import title_logo_sprite from "../../spines/exports/title-logo.png";

import game_kozue_atlas from "../../spines/exports/kozue-game.atlas?raw";
import game_kozue_skeleton from "../../spines/exports/kozue-game.json";
import game_kozue_sprite from "../../spines/exports/kozue-game.png";

import back from "./back.jpg";
import desk from "./desk.png";
import kekka_share from "./kekka_share.png";
import kekka_title from "./kekka_title.png";
import pot_and_cup from "./pot-and-cup.png";
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
    id: "pot_and_cup",
    src: pot_and_cup,
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
    id: "title_kozue",
    atlas: title_kozue_atlas,
    skeleton: title_kozue_skeleton,
    sprite: title_kozue_sprite,
  },
  {
    id: "title_logo",
    atlas: title_logo_atlas,
    skeleton: title_logo_skeleton,
    sprite: title_logo_sprite,
  },
  {
    id: "game_kozue",
    atlas: game_kozue_atlas,
    skeleton: game_kozue_skeleton,
    sprite: game_kozue_sprite,
  },
] as const;

export type SpineKey = (typeof SPINE_MANIFEST)[number]["id"];
