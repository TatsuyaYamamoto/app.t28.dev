import rurino_atlas from "../../spines/exports/rurino.atlas?raw";
import rurino_skeleton from "../../spines/exports/rurino.json";
import rurino_sprite from "../../spines/exports/rurino.png";

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
    id: "rurino",
    atlas: rurino_atlas,
    skeleton: rurino_skeleton,
    sprite: rurino_sprite,
  },
] as const;

export type SpineKey = (typeof SPINE_MANIFEST)[number]["id"];
