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

    <TresMesh :position="[0, -200, 2]">
      <TresPlaneGeometry :args="[539 * 0.6, 170 * 0.6]" />
      <TresMeshBasicMaterial :map="textures.potAndCup" transparent />
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
  potAndCup: getTexture("pot_and_cup"),
};

let kahoSkeletonMesh: SkeletonMesh | null = null;
const kaho = getSpine("game_kaho");

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
let isFinished = false;

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

  await wait(300);

  shouldShow.readyStepAnimation = true;
  await nextTick();
  await playReadyTimeline();
  shouldShow.readyStepAnimation = false;
  shouldShow.timer = true;
  shouldShow.tapAnnounce = true;
  canClick = true;

  wait(3000).then(() => {
    shouldShow.tapAnnounce = false;
  });
};

const onClick = async () => {
  if (!canClick || !kahoSkeletonMesh) {
    return;
  }

  isFinished = true;
  kahoSkeletonMesh.state.clearTrack(1); // stop blink
  const entry = kahoSkeletonMesh.state.setAnimation(0, "success", false);
  entry.mixDuration = 0.3;

  await wait(500);
  emit("finish");
};

onLoop(({ delta }) => {
  kahoSkeletonMesh?.update(delta);

  if (!isFinished) {
    clockHands.long += delta * 120;
    clockHands.short += delta * 10;
  }
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
