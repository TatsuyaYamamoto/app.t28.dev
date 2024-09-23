<template>
  <TresGroup ref="groupRef">
    <CanvasPortal>
      <Transition name="fade">
        <TapAnnounce v-if="gameState.shouldShowTapAnnounce" />
      </Transition>
    </CanvasPortal>
  </TresGroup>
</template>

<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, reactive, ref } from "vue";
import type { Group } from "three";
import { useRenderLoop } from "@tresjs/core";

import { wait } from "shared/helpers/utils.ts";
import CanvasPortal from "shared/components/CanvasPortal.vue";

import TapAnnounce from "../components/TapAnnounce.vue";
import { useAssetLoader } from "../hooks/useAssetLoader.ts";
import {
  createSkeletonMesh,
  startRandomLoopAnimation,
  StopRandomLoopAnimation,
} from "../utils.ts";

const emit = defineEmits<{
  (e: "finish", resultNumber: 1 | 2 | 3): void;
}>();

const { onLoop } = useRenderLoop();
const { getSpine } = useAssetLoader();

const himeSkeletonMesh = createSkeletonMesh(getSpine("hime"));

const groupRef = ref<Group>();

const gameState = reactive<{
  type: "title" | "game";
  canClick: boolean;
  shouldShowTapAnnounce: boolean;
}>({ type: "title", canClick: false, shouldShowTapAnnounce: false });
// @ts-expect-error
let stopLoopBlinkAnimation: StopRandomLoopAnimation | undefined;

const initSpine = async () => {
  himeSkeletonMesh.position.set(0, 0, 0);
  himeSkeletonMesh.scale.setScalar(0.138);
  groupRef.value?.add(himeSkeletonMesh);

  himeSkeletonMesh.state.setAnimation(0, "idle", true);
  stopLoopBlinkAnimation = startRandomLoopAnimation(
    himeSkeletonMesh.state,
    "blink",
    5,
    () => Math.random() * 4 + 0.5,
  );
};

const initTitle = async () => {
  gameState.type = "title";
  gameState.canClick = false;

  himeSkeletonMesh.state.setAnimation(2, "show_title");

  await wait(300);
  gameState.canClick = true;
};

const initGame = async () => {
  gameState.type = "game";
  gameState.canClick = false;

  await wait(300);

  await nextTick();
  gameState.shouldShowTapAnnounce = true;
  gameState.canClick = true;

  wait(3000).then(() => {
    gameState.shouldShowTapAnnounce = false;
  });
};

const onClickInTitle = async () => {
  if (gameState.type !== "title") {
    return;
  }
  if (!gameState.canClick) {
    return;
  }

  gameState.canClick = false;
  // hide title
  himeSkeletonMesh.state.setAnimation(2, "hide_title");

  // start game
  await initGame();
};

const onClickInGame = async () => {
  console.log("onClickInGame");
  if (gameState.type !== "game") {
    return;
  }
  if (!gameState.canClick) {
    return;
  }
  // gameState.canClick = false;
  // gameState.shouldShowTapAnnounce = false;

  const entry = himeSkeletonMesh.state.setAnimation(1, "eat", false);
  entry.mixDuration = 0.2;
};

const onClick = async () => {
  if (gameState.type === "title") {
    await onClickInTitle();
    return;
  }
  if (gameState.type === "game") {
    await onClickInGame();
    return;
  }
};

const goToTitle = async () => {
  await initSpine();
  await initTitle();
};

onLoop(({ delta }) => {
  himeSkeletonMesh?.update(delta);
});

onMounted(() => {
  initSpine();
  initTitle();

  window.addEventListener("click", onClick);
});

onUnmounted(() => {
  window.removeEventListener("click", onClick);
});

defineExpose({
  goToTitle,
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
