<template>
  <CanvasRenderer :base-width="6868" :base-height="4226">
    <template #canvas>
      <LoadingPage
        v-if="currentPage === 'loading'"
        @loadCompleted="onLoadCompleted"
      />
      <GamePage
        v-if="currentPage === 'game'"
        v-model:game-result="gameResult"
      />
    </template>
    <template #html>
      <ResultModal v-model="gameResult" @click-button="onClickContinue" />
    </template>
  </CanvasRenderer>
</template>

<script setup lang="ts">
import { ref } from "vue";

import CanvasRenderer from "shared/components/CanvasRenderer.vue";

import ResultModal from "./components/ResultModal.vue";
import GamePage from "./pages/GamePage.vue";
import LoadingPage from "./pages/LoadingPage.vue";

const pageMap = {
  loading: "loading",
  game: "game",
};

const gameResult = ref<
  "kaho" | "kozue" | "sayaka" | "megumi" | "rurino" | null
>(null);
const currentPage = ref<keyof typeof pageMap>("loading");

const onLoadCompleted = () => {
  currentPage.value = "game";
};

const onClickContinue = () => {
  gameResult.value = null;
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
