<template>
  <CanvasRenderer :base-width="6868" :base-height="4226">
    <template #canvas>
      <LoadingPage v-if="shouldShowLoading" @loadCompleted="onLoadCompleted" />
      <GamePage
        ref="gamePageInstance"
        v-if="shouldShowGame"
        @finish="onGameFinished"
      />
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

import CanvasRenderer from "shared/components/CanvasRenderer.vue";

import ResultModal from "./components/ResultModal.vue";
import GamePage from "./pages/GamePage.vue";
import LoadingPage from "./pages/LoadingPage.vue";

const gameResultModalTypeModel = ref<1 | 2 | 3 | undefined>();
const shouldShowLoading = ref(true);
const shouldShowGame = ref(false);
const gamePageInstance = ref();

const onLoadCompleted = () => {
  shouldShowGame.value = true;
  shouldShowLoading.value = false;
};

const onGameFinished = (resultNumber: 1 | 2 | 3) => {
  gameResultModalTypeModel.value = resultNumber;
};

const onClickResultButton = () => {
  gameResultModalTypeModel.value = undefined;
  gamePageInstance.value.goToTitle();
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
