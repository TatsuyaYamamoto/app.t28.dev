<template>
  <TresGroup>
    <TresMesh>
      <TresPlaneGeometry :args="[1000, 600]" />
      <TresMeshBasicMaterial :map="background1Texture" transparent />
    </TresMesh>
    <TresMesh>
      <TresPlaneGeometry :args="[1000, 600]" />
      <TresMeshBasicMaterial :map="megumiTexture" transparent />
    </TresMesh>
    <TresMesh>
      <TresPlaneGeometry :args="[1000, 600]" />
      <TresMeshBasicMaterial :map="tableTexture" transparent />
    </TresMesh>
    <TresMesh @click="onClickBowl">
      <TresPlaneGeometry :args="[1000, 600]" />
      <TresMeshBasicMaterial :map="bowlTexture" transparent />
    </TresMesh>
  </TresGroup>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRenderLoop } from "@tresjs/core";

import { useAssetLoader } from "../components/useAssetLoader.ts";

const emit = defineEmits<{
  (e: "finish"): void;
}>();

const counter = ref<"1" | "2">("1");
let shakeCounter = 0;

const { onLoop } = useRenderLoop();
const { getTexture } = useAssetLoader();

const tableTexture = getTexture("table");
const background1Texture = getTexture("background_title_base");
const megumi1Texture = getTexture("game_megumi1");
const megumi2Texture = getTexture("game_megumi2");
const bowl1Texture = getTexture("bowl1");
const bowl2Texture = getTexture("bowl2");

const megumiTexture = computed(() => {
  return counter.value === "1" ? megumi1Texture : megumi2Texture;
});

const bowlTexture = computed(() => {
  return counter.value === "1" ? bowl1Texture : bowl2Texture;
});

const onClickBowl = () => {
  console.log("game:onClickBowl");
  counter.value = counter.value === "1" ? "2" : "1";
  shakeCounter += 1;

  if (20 < shakeCounter) {
    emit("finish");
  }
};

onLoop(() => {});

onMounted(() => {
  console.log("mount");
});
</script>
