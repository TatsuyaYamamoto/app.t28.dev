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
        :args="[32, 2.3]"
        :position="[0, 0, 1000]"
        :look-at="[0, 0, 0]"
      />
      <CameraControls v-if="false" />
      <LoadingPage
        v-if="currentPage === 'loading'"
        @loadCompleted="onLoadCompleted"
      />
      <TitlePage v-if="currentPage === 'title'" @start="onGameStart" />
      <GamePage v-if="currentPage === 'game'" @finish="onGameFinish" />
    </TresCanvas>

    <StartAnnounce v-if="currentPage === 'title'" @click="onGameStart" />

    <GameResultModal
      v-if="gameResultModalType !== null"
      :image-type="gameResultModalType"
      @click-button="onClickButtonGameResultModal"
    />

    <Credits v-if="currentPage === 'title'" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { LinearSRGBColorSpace } from "three";
import { CameraControls } from "@tresjs/cientos";

import { getRandomInt } from "shared/helpers/utils";
import { useRendererSize } from "shared/hooks/useRendererSize";

import LoadingPage from "./pages/LoadingPage.vue";
import TitlePage from "./pages/TitlePage.vue";
import GamePage from "./pages/GamePage.vue";
import GameResultModal from "./components/GameResultModal.vue";
import StartAnnounce from "./components/StartAnnounce.vue";
import Credits from "./components/Credits.vue";

const pageMap = {
  loading: "loading",
  title: "title",
  game: "game",
};

const { rendererRotate, rendererWidthPx, rendererHeightPx } = useRendererSize(
  6868,
  4226,
);

const currentPage = ref<keyof typeof pageMap>("loading");
const gameResultModalType = ref<1 | 2 | 3 | null>(null);

const onLoadCompleted = () => {
  currentPage.value = "title";
};

const onGameStart = () => {
  currentPage.value = "game";
};

const onGameFinish = () => {
  gameResultModalType.value = getRandomInt(1, 3);
};

const onClickButtonGameResultModal = () => {
  currentPage.value = "title";
  gameResultModalType.value = null;
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
