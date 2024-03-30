import title from "../assets/title.png";
import background_title_base from "../assets/background_title_base.png";
import background_title_line from "../assets/background_title_line.png";
import bowl1 from "../assets/bowl1.png";
import bowl2 from "../assets/bowl2.png";
import game_megumi1 from "../assets/megumi1.png";
import game_megumi2 from "../assets/megumi2.png";
import table from "../assets/table.png";
import field_grass from "../assets/field_grass.png";
import tsuzuri_walk_1 from "../assets/tsuzuri_walk_1.png";

import tsuzuri_atlas from "../../spines/aprilfool-2024-tsuzuri/out/aprilfool-2024-tsuzuri.atlas?raw";
import tsuzuri_skeleton from "../../spines/aprilfool-2024-tsuzuri/out/aprilfool-2024-tsuzuri.json";
import tsuzuri_sprite from "../../spines/aprilfool-2024-tsuzuri/out/aprilfool-2024-tsuzuri.png";

export const IMAGE_MANIFEST = [
  {
    id: "field_grass",
    src: field_grass,
  },
  {
    id: "tsuzuri_walk_1",
    src: tsuzuri_walk_1,
  },
  {
    id: "background_title_base",
    src: background_title_base,
  },
  {
    id: "background_title_line",
    src: background_title_line,
  },
  {
    id: "title",
    src: title,
  },
  {
    id: "bowl1",
    src: bowl1,
  },
  {
    id: "bowl2",
    src: bowl2,
  },
  {
    id: "game_megumi1",
    src: game_megumi1,
  },
  {
    id: "game_megumi2",
    src: game_megumi2,
  },
  {
    id: "table",
    src: table,
  },
] as const;

export type ImageKey = (typeof IMAGE_MANIFEST)[number]["id"];

export const SPINE_MANIFEST = [
  {
    id: "tsuzuri",
    atlas: tsuzuri_atlas,
    skeleton: tsuzuri_skeleton,
    sprite: tsuzuri_sprite,
  },
] as const;

export type SpineKey = (typeof SPINE_MANIFEST)[number]["id"];
