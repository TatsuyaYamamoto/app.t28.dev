<template>
  <div class="canvas-wrapper">
    <TresCanvas
      clear-color="#82DBC5"
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

      <LoadingPage
        v-if="currentPage === 'loading'"
        @loadCompleted="onLoadCompleted"
      />
      <GamePage v-if="currentPage === 'game'" @finish="onGameFinished" />
    </TresCanvas>

    <ResultModal v-model="gameResult" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { LinearSRGBColorSpace } from "three";
import { CameraControls } from "@tresjs/cientos";

import { useRendererSize } from "shared/hooks/useRendererSize";

import LoadingPage from "./pages/LoadingPage.vue";
import GamePage from "./pages/GamePage.vue";
import ResultModal from "./components/ResultModal.vue";

const pageMap = {
  loading: "loading",
  game: "game",
};

const { rendererRotate, rendererWidthPx, rendererHeightPx } = useRendererSize(
  6868,
  4226,
);

const gameResult = ref<
  "kaho" | "kozue" | "sayaka" | "megumi" | "rurino" | null
>(null);
const currentPage = ref<keyof typeof pageMap>("loading");

const onLoadCompleted = () => {
  currentPage.value = "game";
};

const onGameFinished = (
  result: "kaho" | "kozue" | "sayaka" | "megumi" | "rurino",
) => {
  console.log("finish!", result);
  gameResult.value = result;
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
