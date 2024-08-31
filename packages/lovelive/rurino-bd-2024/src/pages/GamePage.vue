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
  (e: "finish", resultNumber: 1 | 2 | 3): void;
}>();

const { onLoop } = useRenderLoop();
const { getSpine } = useAssetLoader();

const rurinoSkeletonMesh = createSkeletonMesh(getSpine("rurino"));

const groupRef = ref<Group>();

const gameState = reactive<{
  type: "title" | "game";
  canClick: boolean;
  shouldShowTapAnnounce: boolean;
}>({ type: "title", canClick: false, shouldShowTapAnnounce: false });
let stopLoopBlinkAnimation: StopRandomLoopAnimation | undefined;
let stopLoopReactionAnimation: StopRandomLoopAnimation | undefined;

const initSpine = async () => {
  rurinoSkeletonMesh.position.set(0, 0, 0);
  rurinoSkeletonMesh.scale.setScalar(0.138);
  groupRef.value?.add(rurinoSkeletonMesh);

  rurinoSkeletonMesh.state.setAnimation(0, "idle", true);
  rurinoSkeletonMesh.state.setAnimation(1, "background", true);
  stopLoopBlinkAnimation = startRandomLoopAnimation(
    rurinoSkeletonMesh.state,
    "blink",
    5,
    () => Math.random() * 4 + 0.5,
  );
};

const initTitle = async () => {
  gameState.type = "title";
  gameState.canClick = false;

  rurinoSkeletonMesh.state.setAnimation(2, "show_title");

  await wait(300);
  gameState.canClick = true;
};

const initGame = async () => {
  gameState.type = "game";
  gameState.canClick = false;

  stopLoopReactionAnimation = startRandomLoopAnimation(
    rurinoSkeletonMesh.state,
    "fish_reaction",
    6,
    () => Math.random() * 4 + 1.5,
  );

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
  rurinoSkeletonMesh.state.setAnimation(2, "hide_title");

  // start game
  await initGame();
};

const onClickInGame = async () => {
  if (gameState.type !== "game") {
    return;
  }
  if (!gameState.canClick) {
    return;
  }
  gameState.canClick = false;
  gameState.shouldShowTapAnnounce = false;

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
  rurinoSkeletonMesh?.update(delta);
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
