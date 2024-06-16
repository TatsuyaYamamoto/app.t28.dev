<template>
  <CanvasRenderer :base-width="6868" :base-height="4226">
    <template #canvas>
      <LoadingPage v-if="shouldShowLoading" @loadCompleted="onLoadCompleted" />
      <TitlePage v-if="shouldShowTitle" @start="onGameStart" />
      <GamePage v-if="shouldShowGame" @finish="onGameFinished" />
    </template>
    <template #html>
      <ResultModal
        v-model="gameResultModalTypeModel"
        @click-button="onClickResultButton"
      />
    </template>
  </CanvasRenderer>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { getRandomInt } from "shared/helpers/utils.ts";
import CanvasRenderer from "shared/components/CanvasRenderer.vue";

import LoadingPage from "./pages/LoadingPage.vue";
import TitlePage from "./pages/TitlePage.vue";
import GamePage from "./pages/GamePage.vue";
import ResultModal from "./components/ResultModal.vue";

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
