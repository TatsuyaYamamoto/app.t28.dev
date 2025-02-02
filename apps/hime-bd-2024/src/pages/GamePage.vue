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
import { useRenderLoop } from "@tresjs/core";
import type { Group } from "three";
import { nextTick, onMounted, onUnmounted, reactive, ref } from "vue";

import CanvasPortal from "shared/components/CanvasPortal.vue";
import { getRandomInt, wait } from "shared/helpers/utils.ts";

import TapAnnounce from "../components/TapAnnounce.vue";
import { useAssetLoader } from "../hooks/useAssetLoader.ts";
import {
  StopRandomLoopAnimation,
  addAnimationEventListener,
  changeAttachment,
  createSkeletonMesh,
  startRandomLoopAnimation,
  waitAnimationEnd,
} from "../utils.ts";

const emit = defineEmits<{
  finish: [resultNumber: 1 | 2 | 3];
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
let stopLoopBlinkAnimation: StopRandomLoopAnimation | undefined;
let isChewing = false;
let swallowedCount = 0;

const initSpine = async () => {
  himeSkeletonMesh.position.set(0, 0, 0);
  himeSkeletonMesh.scale.setScalar(0.136);
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
  changeAttachment(
    himeSkeletonMesh.skeleton,
    "manju_table",
    "manju_table_many",
  );

  himeSkeletonMesh.state.setAnimation(2, "title_entry");

  await wait(300);
  himeSkeletonMesh.state.setAnimation(2, "title_idle", true);
  gameState.canClick = true;
};

const initGame = async () => {
  gameState.type = "game";
  gameState.canClick = false;
  swallowedCount = 0;

  await wait(300);

  await nextTick();

  gameState.canClick = true;

  gameState.shouldShowTapAnnounce = true;
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
  const titleLeaveAnimation = himeSkeletonMesh.state.setAnimation(
    2,
    "title_leave",
  );
  waitAnimationEnd(titleLeaveAnimation).then(() => {
    // start game
    initGame();
  });
};

const onClickInGame = async () => {
  console.log("onClickInGame");
  if (gameState.type !== "game") {
    return;
  }
  if (!gameState.canClick) {
    return;
  }
  if (isChewing) {
    return;
  }

  if (swallowedCount === 2) {
    gameState.canClick = false;
  }

  const eatAnimation = himeSkeletonMesh.state.setAnimation(1, "eat", false);
  eatAnimation.mixDuration = 0.2;

  addAnimationEventListener(eatAnimation, "pickup", () => {
    console.log("pickup");

    if (swallowedCount === 1) {
      changeAttachment(
        himeSkeletonMesh.skeleton,
        "manju_table",
        "manju_table_few",
      );
      return;
    }

    if (swallowedCount === 2) {
      changeAttachment(himeSkeletonMesh.skeleton, "manju_table", null);
      return;
    }
  });
  addAnimationEventListener(eatAnimation, "chewing_start", () => {
    console.log("chewing_start");
    isChewing = true;
  });
  addAnimationEventListener(eatAnimation, "chewing_end", async () => {
    console.log("chewing_end");
    isChewing = false;
    swallowedCount++;

    if (swallowedCount === 3) {
      await wait(500);
      emit("finish", getRandomInt(1, 3));
      return;
    }
  });
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
  stopLoopBlinkAnimation?.();
  window.removeEventListener("click", onClick);
});

defineExpose({
  goToTitle,
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
