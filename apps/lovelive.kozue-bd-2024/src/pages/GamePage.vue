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
        <TapAnnounce v-if="shouldShow.tapAnnounce" />
      </Transition>
    </CanvasPortal>
  </TresGroup>
</template>

<script setup lang="ts">
import {
  AtlasAttachmentLoader,
  SkeletonJson,
  SkeletonMesh,
} from "@esotericsoftware/spine-threejs";
import { useRenderLoop } from "@tresjs/core";
import gsap from "gsap";
import type { Group } from "three";
import { nextTick, onMounted, reactive, ref } from "vue";

import CanvasPortal from "shared/components/CanvasPortal.vue";
import { promiseWithResolvers, wait } from "shared/helpers/utils.ts";

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

let kozueSkeletonMesh: SkeletonMesh | null = null;
const kozue = getSpine("game_kozue");

const groupRef = ref<Group>();
const shouldShow = reactive({
  readyStepAnimation: false,
  tapAnnounce: false,
});

const classes = {
  teaStep1: "tea-step-1",
  teaStep2: "tea-step-2",
};

let canClick = false;
let stopLoopBlinkAnim: (() => void) | null = null;

const playReadyTimeline = () => {
  const { promise, resolve } = promiseWithResolvers();

  gsap
    .timeline()
    .add(
      gsap
        .timeline()
        .fromTo(
          `.${classes.teaStep1}`,
          { top: "2rem", left: "1rem" },
          { left: "3rem", duration: 1.5 },
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
  kozueSkeletonMesh = createSkeletonMesh(kozue);
  kozueSkeletonMesh.position.set(0, 0, 0);
  kozueSkeletonMesh.scale.setScalar(0.138);

  groupRef.value?.add(kozueSkeletonMesh);
  kozueSkeletonMesh.state.setAnimation(0, "idle", true);
  stopLoopBlinkAnim = loopBlinkAnim(kozueSkeletonMesh.state, 5);

  await wait(300);

  shouldShow.readyStepAnimation = true;
  await nextTick();
  await playReadyTimeline();
  shouldShow.readyStepAnimation = false;
  shouldShow.tapAnnounce = true;
  canClick = true;

  wait(3000).then(() => {
    shouldShow.tapAnnounce = false;
  });
};

const onClick = async () => {
  if (!canClick || !kozueSkeletonMesh) {
    return;
  }

  stopLoopBlinkAnim?.();

  const entry = kozueSkeletonMesh.state.setAnimation(0, "success", false);
  entry.mixDuration = 0.5;

  await wait(1500);
  emit("finish");
};

onLoop(({ delta }) => {
  kozueSkeletonMesh?.update(delta);
});

onMounted(() => {
  init();
});
</script>

<style scoped>
.tea-step {
  position: absolute;
  width: 7rem;
  border-radius: 1rem;
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
