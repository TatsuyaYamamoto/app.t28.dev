<template>
  <CanvasRenderer :base-width="6868" :base-height="4226">
    <template #canvas>
      <LoadingPage
        v-if="currentPage === 'loading'"
        @loadCompleted="onLoadCompleted"
      />
      <TitlePage v-if="currentPage === 'title'" @start="onGameStart" />
      <GamePage v-if="currentPage === 'game'" @finish="onGameFinish" />
    </template>
    <template #html>
      <StartAnnounce v-if="currentPage === 'title'" @click="onGameStart" />
      <GameResultModal
        v-if="gameResultModalType !== null"
        :image-type="gameResultModalType"
        @click-button="onClickButtonGameResultModal"
      />
      <Credits v-if="currentPage === 'title'" />
    </template>
  </CanvasRenderer>
</template>

<script setup lang="ts">
import { ref } from "vue";

import CanvasRenderer from "shared/components/CanvasRenderer.vue";
import { getRandomInt } from "shared/helpers/utils";

import Credits from "./components/Credits.vue";
import GameResultModal from "./components/GameResultModal.vue";
import StartAnnounce from "./components/StartAnnounce.vue";
import GamePage from "./pages/GamePage.vue";
import LoadingPage from "./pages/LoadingPage.vue";
import TitlePage from "./pages/TitlePage.vue";

const pageMap = {
  loading: "loading",
  title: "title",
  game: "game",
};

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
