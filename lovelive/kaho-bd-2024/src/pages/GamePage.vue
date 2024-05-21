<template>
  <TresGroup ref="groupRef">
    <TresMesh :position="[0, 0, -1]" @click="onClick">
      <TresPlaneGeometry :args="[1717 * 0.6, 1057 * 0.6]" />
      <TresMeshBasicMaterial :map="textures.back" transparent />
    </TresMesh>

    <TresMesh :position="[0, -230, 2]">
      <TresPlaneGeometry :args="[1717 * 0.6, 277 * 0.6]" />
      <TresMeshBasicMaterial :map="textures.desk" transparent />
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

      <Transition name="fade">
        <GameTimer
          v-if="shouldShow.timer"
          class="timer"
          :long="clockHands.long"
        />
      </Transition>

      <Transition name="fade">
        <TapAnnounce v-if="shouldShow.tapAnnounce" />
      </Transition>
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

import {
  getRandomInt,
  wait,
  promiseWithResolvers,
} from "shared/helpers/utils.ts";

import CanvasPortal from "../components/CanvasPortal.vue";
import GameTimer from "../components/GameTimer.vue";
import TapAnnounce from "../components/TapAnnounce.vue";
import { useAssetLoader } from "../hooks/useAssetLoader.ts";
import { loopBlinkAnim } from "../utils.ts";

const emit = defineEmits<{
  (e: "finish"): void;
}>();

const { onLoop } = useRenderLoop();
const { getSpine, getTexture } = useAssetLoader();

const textures = {
  back: getTexture("back"),
  desk: getTexture("desk"),
  teaStep1: getTexture("tea_step_1"),
  teaStep2: getTexture("tea_step_2"),
};

let kahoSkeletonMesh: SkeletonMesh | null = null;
const kaho = getSpine("game_kaho");

const SKELETON_CONST = {
  SLOT: {
    VEGETABLE: "vegetable",
    BOWL: "bowl",
  },
};

const groupRef = ref<Group>();
const shouldShow = reactive({
  readyStepAnimation: false,
  timer: false,
  tapAnnounce: false,
});
const clockHands = reactive({ short: 0, long: 0 });

const classes = {
  teaStep1: "tea-step-1",
  teaStep2: "tea-step-2",
};

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
          { top: "2rem", left: "2rem" },
          { left: "5rem", duration: 1.5 },
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
          { top: "7rem", left: "14rem" },
          { left: "17rem", duration: 1.5 },
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
  kahoSkeletonMesh = createSkeletonMesh(kaho);
  kahoSkeletonMesh.position.set(0, -200, 0);
  kahoSkeletonMesh.scale.setScalar(0.138);

  groupRef.value?.add(kahoSkeletonMesh);
  const animationName = getRandomInt(0, 1) === 0 ? "think" : "idle";
  kahoSkeletonMesh.state.setAnimation(0, animationName, true);
  loopBlinkAnim(kahoSkeletonMesh.state, 1);

  canClick = true;

  await wait(300);

  shouldShow.readyStepAnimation = true;
  await nextTick();
  await playReadyTimeline();
  shouldShow.readyStepAnimation = false;
  shouldShow.timer = true;
  shouldShow.tapAnnounce = true;
  await wait(3000);
  shouldShow.tapAnnounce = false;
};

const isFinished = () => {
  return requiredCount <= currentCount;
};

const onClick = () => {
  if (!canClick || !kahoSkeletonMesh) {
    return;
  }

  const vegetableAttachment = kahoSkeletonMesh.skeleton
    ?.findSlot(SKELETON_CONST.SLOT.VEGETABLE)
    ?.getAttachment()?.name;

  if (!vegetableAttachment) {
    return;
  }

  const numberString = vegetableAttachment.slice(-1);
  const number = Number(numberString);
  const type = vegetableAttachment.replace(numberString, "");

  if (number === 1 || number === 2) {
    canClick = false;
    currentCount += 1;

    const cutAnim = kahoSkeletonMesh.state.setAnimation(0, "cut");
    cutAnim.listener = {
      complete: () => {
        canClick = true;
        kahoSkeletonMesh?.skeleton.setAttachment(
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

    const slideAnim = kahoSkeletonMesh.state.setAnimation(0, "slide");
    slideAnim.listener = {
      complete: () => {
        canClick = true;

        const bowlNumber = Math.min(1 + Math.floor(currentCount / 3), 3);
        kahoSkeletonMesh?.skeleton.setAttachment(
          SKELETON_CONST.SLOT.BOWL,
          `bowl${bowlNumber}`,
        );

        if (isFinished()) {
          emit("finish");
        } else {
          kahoSkeletonMesh?.skeleton.setAttachment(
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
  kahoSkeletonMesh?.update(delta);

  clockHands.long += delta * 120;
  clockHands.short += delta * 10;
});

onMounted(() => {
  init();
});
</script>

<style scoped>
.tea-step {
  position: absolute;
  width: 6rem;
}

.timer {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 4rem;
  height: 4rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
