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
      <CameraControls v-if="true" />
      <TresGridHelper
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
      <TitlePage v-if="currentPage === 'title'" @start="onGameStart" />
    </TresCanvas>
  </div>
</template>

<script setup lang="ts">
import { LinearSRGBColorSpace } from "three";
import { CameraControls } from "@tresjs/cientos";

import { useRendererSize } from "shared/hooks/useRendererSize";

import { usePageHandler } from "./hooks/usePageHandler";
import LoadingPage from "./pages/LoadingPage.vue";
import TitlePage from "./pages/TitlePage.vue";

const { rendererRotate, rendererWidthPx, rendererHeightPx } = useRendererSize(
  6868,
  4226,
);
const { currentPage, changePage } = usePageHandler([
  "loading",
  "title",
  "game",
] as const);

const onLoadCompleted = () => {
  changePage("title");
};

const onGameStart = () => {
  changePage("game");
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
