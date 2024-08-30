<template>
  <CanvasRenderer :base-width="6868" :base-height="4226">
    <template #canvas>
      <LoadingPage v-if="shouldShowLoading" @loadCompleted="onLoadCompleted" />
      <GamePage v-if="shouldShowGame" @finish="onGameFinished" />
    </template>
    <template #html> </template>
  </CanvasRenderer>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { getRandomInt } from "shared/helpers/utils.ts";
import CanvasRenderer from "shared/components/CanvasRenderer.vue";

import LoadingPage from "./pages/LoadingPage.vue";
import GamePage from "./pages/GamePage.vue";

const gameResultModalTypeModel = ref<1 | 2 | 3 | undefined>();
const shouldShowLoading = ref(true);
const shouldShowGame = ref(false);

const onLoadCompleted = () => {
  shouldShowGame.value = true;
  shouldShowLoading.value = false;
};

const onGameFinished = () => {
  gameResultModalTypeModel.value = getRandomInt(1, 3);
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
