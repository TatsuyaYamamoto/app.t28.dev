<template>
  <TresGroup ref="groupRef">
    <TresMesh :position="[0, 0, -1]" @click="onClick">
      <TresPlaneGeometry :args="[1717 * 0.6, 1057 * 0.6]" />
      <TresMeshBasicMaterial transparent />
    </TresMesh>

    <CanvasPortal>
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

import { getRandomInt, wait } from "shared/helpers/utils.ts";
import CanvasPortal from "shared/components/CanvasPortal.vue";

import TapAnnounce from "../components/TapAnnounce.vue";
import { useAssetLoader } from "../hooks/useAssetLoader.ts";
import {
  changeAttachment,
  createSkeletonMesh,
  startRandomLoopAnimation,
  StopRandomLoopAnimation,
} from "../utils.ts";

const emit = defineEmits<{
  (e: "finish", resultNumber: number): void;
}>();

const { onLoop } = useRenderLoop();
const { getSpine } = useAssetLoader();

const rurinoSkeletonMesh = createSkeletonMesh(getSpine("rurino"));

const groupRef = ref<Group>();
const shouldShow = reactive({
  tapAnnounce: false,
});

let canClick = false;
let stopLoopBlinkAnimation: StopRandomLoopAnimation | undefined;
let stopLoopReactionAnimation: StopRandomLoopAnimation | undefined;

const init = async () => {
  rurinoSkeletonMesh.position.set(0, 0, 0);
  rurinoSkeletonMesh.scale.setScalar(0.138);
  groupRef.value?.add(rurinoSkeletonMesh);

  rurinoSkeletonMesh.state.setAnimation(0, "idle", true);
  stopLoopBlinkAnimation = startRandomLoopAnimation(
    rurinoSkeletonMesh.state,
    "blink",
    5,
    () => Math.random() * 4 + 0.5,
  );
  stopLoopReactionAnimation = startRandomLoopAnimation(
    rurinoSkeletonMesh.state,
    "fish_reaction",
    6,
    () => Math.random() * 4 + 1.5,
  );

  await wait(300);

  await nextTick();
  shouldShow.tapAnnounce = true;
  canClick = true;

  wait(3000).then(() => {
    shouldShow.tapAnnounce = false;
  });
};

const onClick = async () => {
  if (!canClick || !rurinoSkeletonMesh) {
    return;
  }

  const resultNumber = getRandomInt(1, 3);
  stopLoopReactionAnimation?.();
  stopLoopBlinkAnimation?.();

  changeAttachment(
    rurinoSkeletonMesh.skeleton,
    "fishing_result",
    `fishing_result_${resultNumber}`,
  );

  const entry = rurinoSkeletonMesh.state.setAnimation(
    0,
    "fish_catching",
    false,
  );
  entry.mixDuration = 0.5;

  await wait(1500);

  emit("finish", resultNumber);
};

onLoop(({ delta }) => {
  rurinoSkeletonMesh?.update(delta);
});

onMounted(() => {
  init();
});

defineExpose({
  init,
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
