<template>
  <div class="canvas-wrapper">
    <TresCanvas
      clear-color="#FCFCFC"
      :output-color-space="
        /* https://discourse.threejs.org/t/why-the-color-palette-change-from-v0-150-1-to-v0-152-2/51417/2 */
        LinearSRGBColorSpace
      "
    >
      <TresPerspectiveCamera
        :args="[/* fov */ 32, /* aspect */ 2.3]"
        :position="[0, 0, 1000]"
        :look-at="[0, 0, 0]"
      />
      <CameraControls v-if="false" />
      <TresGridHelper
        v-if="false"
        :args="[
          /* size */ 1000,
          /* divisions */ 10,
          /* colorCenterLine */ '#ff0000',
        ]"
        :rotate-x="-(Math.PI / 2)"
      />

      <LoadingPage v-if="shouldShowLoading" @loadCompleted="onLoadCompleted" />
      <TitlePage v-if="shouldShowTitle" @start="onGameStart" />
      <GamePage v-if="shouldShowGame" @finish="onGameFinished" />
    </TresCanvas>

    <ResultModal
      v-model="gameResultModalTypeModel"
      @click-button="onClickResultButton"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { LinearSRGBColorSpace } from "three";
import { CameraControls } from "@tresjs/cientos";

import { useRendererSize } from "shared/hooks/useRendererSize";
import { getRandomInt } from "shared/helpers/utils.ts";

import LoadingPage from "./pages/LoadingPage.vue";
import TitlePage from "./pages/TitlePage.vue";
import GamePage from "./pages/GamePage.vue";
import ResultModal from "./components/ResultModal.vue";

const { rendererRotate, rendererWidthPx, rendererHeightPx } = useRendererSize(
  6868,
  4226,
);

const gameResultModalTypeModel = ref<1 | 2 | 3 | undefined>();
const shouldShowLoading = ref(true);
const shouldShowTitle = ref(false);
const shouldShowGame = ref(false);

const onLoadCompleted = () => {
  shouldShowTitle.value = true;
  shouldShowLoading.value = false;
};

const onGameStart = (animationPromise: Promise<void>) => {
  shouldShowGame.value = true;

  animationPromise.then(() => {
    shouldShowTitle.value = false;
  });
};

const onGameFinished = () => {
  gameResultModalTypeModel.value = getRandomInt(1, 3);
};

const onClickResultButton = () => {
  gameResultModalTypeModel.value = undefined;
  shouldShowTitle.value = true;
  shouldShowGame.value = false;
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
#app {
  height: 100%;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<style scoped>
.canvas-wrapper {
  position: relative;
  flex-shrink: 0;
  width: v-bind(rendererWidthPx);
  height: v-bind(rendererHeightPx);
  transform: rotate(v-bind(rendererRotate));
}
</style>
