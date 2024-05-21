import title_kaho_atlas from "../../spines/exports/title-kaho.atlas?raw";
import title_kaho_skeleton from "../../spines/exports/title-kaho.json";
import title_kaho_sprite from "../../spines/exports/title-kaho.png";
import title_logo_atlas from "../../spines/exports/title-logo.atlas?raw";
import title_logo_skeleton from "../../spines/exports/title-logo.json";
import title_logo_sprite from "../../spines/exports/title-logo.png";
import game_kaho_atlas from "../../spines/exports/kaho-game.atlas?raw";
import game_kaho_skeleton from "../../spines/exports/kaho-game.json";
import game_kaho_sprite from "../../spines/exports/kaho-game.png";

import back from "./back.jpg";
import desk from "./desk.png";
import pot_and_cup from "./pot-and-cup.png";
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
    id: "title_kaho",
    atlas: title_kaho_atlas,
    skeleton: title_kaho_skeleton,
    sprite: title_kaho_sprite,
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
