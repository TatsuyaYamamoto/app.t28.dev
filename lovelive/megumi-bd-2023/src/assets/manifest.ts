import background_title_base from "../../spines/title-megumi/images/背景（外まで）.png";
import background_title_line from "../../spines/title-megumi/images/集中線.png";

import title_megumi_atlas from "../../spines/title-megumi/out/megumi-title.atlas?raw";
import title_megumi_skeleton from "../../spines/title-megumi/out/megumi-title.json";
import title_megumi_sprite from "../../spines/title-megumi/out/megumi-title.png";

export const IMAGE_MANIFEST = [
  {
    id: "background_title_base",
    src: background_title_base,
  },
  {
    id: "background_title_line",
    src: background_title_line,
  },
];

export const SPINE_MANIFEST = [
  {
    id: "title_megumi",
    atlas: title_megumi_atlas,
    skeleton: title_megumi_skeleton,
    sprite: title_megumi_sprite,
  },
];
