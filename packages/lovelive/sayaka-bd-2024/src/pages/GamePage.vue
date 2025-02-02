<template>
  <TresGroup ref="groupRef">
    <TresMesh :position="[0, 0, -1]" @click="onClick">
      <TresPlaneGeometry :args="[1200, 800]" />
      <TresMeshBasicMaterial :map="backTexture" transparent />
    </TresMesh>
    <TresMesh v-if="shouldShowIndicator" :position="[0, -200, -1]">
      <!-- 本当は平面のわっかを描画したい-->
      <TresTorusGeometry :args="[indicatorArgs.radius, indicatorArgs.tube]" />
      <TresMeshBasicMaterial transparent />
    </TresMesh>
  </TresGroup>
</template>

<script setup lang="ts">
import {
  AtlasAttachmentLoader,
  SkeletonJson,
  SkeletonMesh,
} from "@esotericsoftware/spine-threejs";
import { useRenderLoop } from "@tresjs/core";
import type { Group } from "three";
import { onMounted, reactive, ref } from "vue";

import { getRandomInt, wait } from "shared/helpers/utils.ts";

import gsap from "gsap";
import { useAssetLoader } from "../hooks/useAssetLoader.ts";
import { loopBlinkAnim } from "../utils.ts";

const emit = defineEmits<{
  (e: "finish"): void;
}>();

const { onLoop } = useRenderLoop();
const { getSpine, getTexture } = useAssetLoader();

let sayakaSkeletonMesh: SkeletonMesh | null = null;
const backTexture = getTexture("back");
const sayaka = getSpine("game_sayaka");

const SKELETON_CONST = {
  SLOT: {
    VEGETABLE: "vegetable",
    BOWL: "bowl",
  },
};

const groupRef = ref<Group>();
const indicatorArgs = reactive({ radius: 50, tube: 10 });
const shouldShowIndicator = ref(false);
let canClick = false;
let requiredCount = 3 * 3;
let currentCount = 0;

const indicatorAnimation = gsap.fromTo(
  indicatorArgs,
  { radius: 50, tube: 5 },
  {
    radius: 20,
    tube: 2,
    duration: 0.8,
    repeat: -1,
    ease: "bounce.in",
    paused: true,
  },
);

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

  loopBlinkAnim(sayakaSkeletonMesh.state, 1);

  canClick = true;
  indicatorAnimation.play();

  await wait(800);
  shouldShowIndicator.value = true;
};

const isFinished = () => {
  return requiredCount <= currentCount;
};

const onClick = () => {
  if (!canClick || !sayakaSkeletonMesh) {
    return;
  }

  const vegetableAttachment = sayakaSkeletonMesh.skeleton
    ?.findSlot(SKELETON_CONST.SLOT.VEGETABLE)
    ?.getAttachment()?.name;

  if (!vegetableAttachment) {
    return;
  }

  shouldShowIndicator.value = false;

  const numberString = vegetableAttachment.slice(-1);
  const number = Number(numberString);
  const type = vegetableAttachment.replace(numberString, "");

  if (number === 1 || number === 2) {
    canClick = false;
    currentCount += 1;

    const cutAnim = sayakaSkeletonMesh.state.setAnimation(0, "cut");
    cutAnim.listener = {
      complete: () => {
        canClick = true;
        sayakaSkeletonMesh?.skeleton.setAttachment(
          SKELETON_CONST.SLOT.VEGETABLE,
          `${type}${number + 1}`,
        );
      },
    };
    return;
  }

  if (number === 3) {
    canClick = false;
    currentCount += 1;

    const slideAnim = sayakaSkeletonMesh.state.setAnimation(0, "slide");
    slideAnim.listener = {
      complete: () => {
        canClick = true;

        const bowlNumber = Math.min(1 + Math.floor(currentCount / 3), 3);
        sayakaSkeletonMesh?.skeleton.setAttachment(
          SKELETON_CONST.SLOT.BOWL,
          `bowl${bowlNumber}`,
        );

        if (isFinished()) {
          emit("finish");
        } else {
          sayakaSkeletonMesh?.skeleton.setAttachment(
            SKELETON_CONST.SLOT.VEGETABLE,
            `${getVegetableRandomly()}1`,
          );
        }
      },
    };
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
