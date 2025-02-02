import field_grass from "../assets/field_grass.jpg";

import target_kaho from "../assets/target_kaho.png";
import target_kaho_item from "../assets/target_kaho_item.png";
import target_kozue from "../assets/target_kozue.png";
import target_kozue_item from "../assets/target_kozue_item.png";
import target_megumi from "../assets/target_megumi.png";
import target_megumi_item from "../assets/target_megumi_item.png";
import target_rurino from "../assets/target_rurino.png";
import target_rurino_item from "../assets/target_rurino_item.png";
import target_sayaka from "../assets/target_sayaka.png";
import target_sayaka_item from "../assets/target_sayaka_item.png";

import tsuzuri_atlas from "../../spines/aprilfool-2024-tsuzuri/exports/aprilfool-2024-tsuzuri.atlas?raw";
import tsuzuri_skeleton from "../../spines/aprilfool-2024-tsuzuri/exports/aprilfool-2024-tsuzuri.json";
import tsuzuri_sprite from "../../spines/aprilfool-2024-tsuzuri/exports/aprilfool-2024-tsuzuri.png";

export const IMAGE_MANIFEST = [
  {
    id: "field_grass",
    src: field_grass,
  },
  {
    id: "target_kaho",
    src: target_kaho,
  },
  {
    id: "target_kaho_item",
    src: target_kaho_item,
  },
  {
    id: "target_kozue",
    src: target_kozue,
  },
  {
    id: "target_kozue_item",
    src: target_kozue_item,
  },
  {
    id: "target_sayaka",
    src: target_sayaka,
  },
  {
    id: "target_sayaka_item",
    src: target_sayaka_item,
  },
  {
    id: "target_megumi",
    src: target_megumi,
  },
  {
    id: "target_megumi_item",
    src: target_megumi_item,
  },
  {
    id: "target_rurino",
    src: target_rurino,
  },
  {
    id: "target_rurino_item",
    src: target_rurino_item,
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
