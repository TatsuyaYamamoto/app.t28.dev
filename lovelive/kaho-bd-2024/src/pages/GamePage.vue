<template>
  <TresGroup ref="groupRef">
    <TresMesh :position="[0, 0, -1]" @click="onClick">
      <TresPlaneGeometry :args="[1200, 800]" />
      <TresMeshBasicMaterial :map="textures.back" transparent />
    </TresMesh>

    <CanvasPortal>
      <div v-if="shouldShow.readyStepAnimation">
        <img
          :class="['tea-step', classes.teaStep1]"
          :src="textures.teaStep1.image.src"
        />
        <img
          :class="['tea-step', classes.teaStep2]"
          :src="textures.teaStep2.image.src"
        />
      </div>
    </CanvasPortal>
  </TresGroup>
</template>

<script setup lang="ts">
import { nextTick, onMounted, reactive, ref } from "vue";
import type { Group } from "three";
import { useRenderLoop } from "@tresjs/core";
import {
  AtlasAttachmentLoader,
  SkeletonMesh,
  SkeletonJson,
} from "@esotericsoftware/spine-threejs";
import gsap from "gsap";

import { getRandomInt, wait } from "shared/helpers/utils.ts";

import CanvasPortal from "../components/CanvasPortal.vue";
import { useAssetLoader } from "../hooks/useAssetLoader.ts";
import { loopBlinkAnim, promiseWithResolvers } from "../utils.ts";

const emit = defineEmits<{
  (e: "finish"): void;
}>();

const { onLoop } = useRenderLoop();
const { getSpine, getTexture } = useAssetLoader();

const textures = {
  back: getTexture("back"),
  teaStep1: getTexture("tea_step_1"),
  teaStep2: getTexture("tea_step_2"),
};

let sayakaSkeletonMesh: SkeletonMesh | null = null;
const sayaka = getSpine("game_sayaka");

const SKELETON_CONST = {
  SLOT: {
    VEGETABLE: "vegetable",
    BOWL: "bowl",
  },
};

const groupRef = ref<Group>();
const shouldShow = reactive({ readyStepAnimation: false });

const classes = {
  teaStep1: "tea-step-1",
  teaStep2: "tea-step-2",
};

const shouldShowIndicator = ref(false);
let canClick = false;
let requiredCount = 3 * 3;
let currentCount = 0;

const playReadyTimeline = () => {
  const { promise, resolve } = promiseWithResolvers();

  gsap
    .timeline()
    .add(
      gsap
        .timeline()
        .fromTo(
          `.${classes.teaStep1}`,
          { left: "10rem" },
          { left: "13rem", duration: 2 },
        )
        .fromTo(
          `.${classes.teaStep1}`,
          { opacity: 0 },
          { opacity: 1, duration: 1 },
          "<",
        )
        .to(`.${classes.teaStep1}`, { opacity: 0, duration: 0.7 }, ">"),
    )
    .add(
      gsap
        .timeline()
        .fromTo(
          `.${classes.teaStep2}`,
          { left: "16rem" },
          { left: "20rem", duration: 2 },
        )
        .fromTo(
          `.${classes.teaStep2}`,
          { opacity: 0 },
          { opacity: 1, duration: 1 },
          "<",
        )
        .to(`.${classes.teaStep2}`, { opacity: 0, duration: 0.7 }, ">"),
    )
    .add(() => {
      resolve();
    });

  return promise;
};

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

  await wait(800);
  shouldShowIndicator.value = true;

  shouldShow.readyStepAnimation = true;
  await nextTick();
  await playReadyTimeline();
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

<style scoped>
.tea-step {
  position: absolute;
}
</style>
