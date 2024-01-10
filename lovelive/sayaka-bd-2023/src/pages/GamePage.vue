<template>
  <TresGroup ref="groupRef">
    <TresMesh :position="[0, 0, -1]" @click="onClick">
      <TresPlaneGeometry :args="[1200, 800]" />
      <TresMeshBasicMaterial :map="backTexture" transparent />
    </TresMesh>
    <!--    <TresMesh>-->
    <!--      <TresPlaneGeometry :args="[1000, 600]" />-->
    <!--      <TresMeshBasicMaterial :map="backgroundEffectTexture" transparent />-->
    <!--    </TresMesh>-->
    <!--    <TresMesh :position="[180, 100, 100]">-->
    <!--      <TresPlaneGeometry :args="[500, 300]" />-->
    <!--      <TresMeshBasicMaterial :map="title" transparent />-->
    <!--    </TresMesh>-->
  </TresGroup>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Group } from "three";
import { useRenderLoop } from "@tresjs/core";
import {
  AtlasAttachmentLoader,
  SkeletonMesh,
  SkeletonJson,
} from "@esotericsoftware/spine-threejs";

import { getRandomInt } from "shared/helpers/utils.ts";

import { useAssetLoader } from "../hooks/useAssetLoader.ts";

const emit = defineEmits<{
  (e: "start"): void;
}>();

const { onLoop } = useRenderLoop();
const { getSpine, getTexture } = useAssetLoader();

const groupRef = ref<Group>();
let sayakaSkeletonMesh: SkeletonMesh | null = null;
const backTexture = getTexture("back");

const sayaka = getSpine("game_sayaka");
const SKELETON_CONST = {
  SLOT: {
    VEGETABLE: "vegetable",
  },
};

let canClick = false;

const getVegetableRandomly = () => {
  const map = {
    1: "carrot",
    2: "negi",
    3: "popeye",
  };
  const random = getRandomInt(1, 3);

  return map[random];
};

const createSkeletonMesh = (spine: ReturnType<typeof getSpine>) => {
  const atlasLoader = new AtlasAttachmentLoader(spine.textureAtlas);
  const skeletonJson = new SkeletonJson(atlasLoader);
  const skeletonData = skeletonJson.readSkeletonData(spine.skeleton);

  return new SkeletonMesh(skeletonData, (parameters) => {
    parameters.depthWrite = false;
  });
};

const init = async () => {
  sayakaSkeletonMesh = createSkeletonMesh(sayaka);
  sayakaSkeletonMesh.position.set(-480, 280, 0);
  sayakaSkeletonMesh.scale.setScalar(0.138);
  sayakaSkeletonMesh.skeleton.setAttachment(
    SKELETON_CONST.SLOT.VEGETABLE,
    `${getVegetableRandomly()}1`,
  );

  groupRef.value?.add(sayakaSkeletonMesh);

  // sayakaSkeletonMesh.state.setAnimation(0, "start");
  // sayakaSkeletonMesh.state.addAnimation(0, "idle", true);

  canClick = true;
};

const onClick = () => {
  if (!canClick) {
    return;
  }

  const attachmentName = sayakaSkeletonMesh?.skeleton
    ?.findSlot(SKELETON_CONST.SLOT.VEGETABLE)
    ?.getAttachment()?.name;

  if (!attachmentName) {
    return;
  }

  const numberString = attachmentName.slice(-1);
  const number = Number(numberString);
  const type = attachmentName.replace(numberString, "");

  if (number === 1 || number === 2) {
    canClick = false;
    const cutAnim = sayakaSkeletonMesh?.state.setAnimation(0, "cut");
    if (cutAnim) {
      cutAnim.listener = {
        complete: () => {
          canClick = true;
          sayakaSkeletonMesh?.skeleton.setAttachment(
            SKELETON_CONST.SLOT.VEGETABLE,
            `${type}${number + 1}`,
          );
        },
      };
    }
    return;
  }

  if (number === 3) {
    canClick = false;
    const slideAnim = sayakaSkeletonMesh?.state.setAnimation(0, "slide");
    if (slideAnim) {
      slideAnim.listener = {
        complete: () => {
          canClick = true;
          sayakaSkeletonMesh?.skeleton.setAttachment(
            SKELETON_CONST.SLOT.VEGETABLE,
            `${getVegetableRandomly()}1`,
          );
        },
      };
    }
    return;
  }
};

onLoop(({ delta }) => {
  sayakaSkeletonMesh?.update(delta);
});

onMounted(() => {
  init();
});
</script>
