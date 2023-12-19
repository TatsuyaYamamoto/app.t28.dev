<template>
  <div class="canvas-wrapper">
    <TresCanvas
      id="three-renderer"
      clear-color="#82DBC5"
      :output-color-space="
        /* https://discourse.threejs.org/t/why-the-color-palette-change-from-v0-150-1-to-v0-152-2/51417/2 */
        LinearSRGBColorSpace
      "
    >
      <ThreeOrbitControls />
      <TresPerspectiveCamera
        :args="[32, 2.3]"
        :position="[0, 0, 1000]"
        :look-at="[0, 0, 0]"
      />
      <LoadingPage
        v-if="currentPage === 'loading'"
        @loadCompleted="onLoadCompleted"
      />
      <TitlePage v-if="currentPage === 'title'" @start="onGameStart" />
      <GamePage v-if="currentPage === 'game'" @finish="onGameFinish" />
    </TresCanvas>

    <GameResultModal
      v-if="shouldShowGameResultModal"
      :image-type="1"
      @click-button="onClickButtonGameResultModal"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { extend } from "@tresjs/core";
import { LinearSRGBColorSpace } from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { useWindowSize } from "@vueuse/core";

import LoadingPage from "./pages/LoadingPage.vue";
import TitlePage from "./pages/TitlePage.vue";
import GamePage from "./pages/GamePage.vue";
import ThreeOrbitControls from "./components/ThreeOrbitControls.vue";
import GameResultModal from "./components/GameResultModal.vue";

extend({ OrbitControls });

const pageMap = {
  loading: "loading",
  title: "title",
  game: "game",
};

const { width: windowWidth } = useWindowSize();
const rendererHeight = computed(() => `${windowWidth.value * (4226 / 6868)}px`);

const currentPage = ref<keyof typeof pageMap>("loading");
const shouldShowGameResultModal = ref(true);

const onLoadCompleted = () => {
  currentPage.value = "title";
};

const onGameStart = () => {
  currentPage.value = "game";
};

const onGameFinish = () => {
  shouldShowGameResultModal.value = true;
};

const onClickButtonGameResultModal = () => {
  currentPage.value = "title";
  shouldShowGameResultModal.value = false;
};
watch([windowWidth], ([currentWidth]) => {
  const baseWidth = 2500;
  const fontSize = (currentWidth / baseWidth) * 100;
  document.documentElement.style.fontSize = `${fontSize}px`;
});
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
  align-items: center;
}
</style>

<style scoped>
.canvas-wrapper {
  position: relative;
  width: 100%;
  height: v-bind(rendererHeight);
}
</style>
