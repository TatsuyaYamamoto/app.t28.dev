<template>
  <div class="canvas-wrapper">
    <TresCanvas id="three-renderer" clear-color="#82DBC5">
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
      <TitlePage v-if="currentPage === 'title'" />
    </TresCanvas>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { extend } from "@tresjs/core";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { useWindowSize } from "@vueuse/core";

import LoadingPage from "./pages/LoadingPage.vue";
import TitlePage from "./pages/TitlePage.vue";
import ThreeOrbitControls from "./components/ThreeOrbitControls.vue";

extend({ OrbitControls });

const pageMap = {
  loading: "loading",
  title: "title",
  game: "game",
};

const { width: windowWidth } = useWindowSize();
const rendererHeight = computed(() => `${windowWidth.value * (4226 / 6868)}px`);
const currentPage = ref<keyof typeof pageMap>("loading");

const onLoadCompleted = () => {
  currentPage.value = "title";
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
  align-items: center;
}
</style>

<style scoped>
.canvas-wrapper {
  width: 100%;
  height: v-bind(rendererHeight);
}
</style>
