<template>
  <div class="canvas-wrapper">
    <TresCanvas id="three-renderer" clear-color="#82DBC5">
      <ThreeOrbitControls />
      <TresPerspectiveCamera
        :args="[32, 2.3]"
        :position="[0, 0, 1000]"
        :look-at="[0, 0, 0]"
      />
      <TitlePage />
    </TresCanvas>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { extend } from "@tresjs/core";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { useWindowSize } from "@vueuse/core";

import TitlePage from "./pages/TitlePage.vue";
import ThreeOrbitControls from "./components/ThreeOrbitControls.vue";

extend({ OrbitControls });

const { width: windowWidth } = useWindowSize();
const rendererHeight = computed(() => `${windowWidth.value * (4226 / 6868)}px`);
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
