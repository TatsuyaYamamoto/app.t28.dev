<template>
  <TresMesh>
    <TresPlaneGeometry :args="[1000, 600]" />
    <TresMeshBasicMaterial :map="background1Texture" transparent />
  </TresMesh>
  <TresMesh>
    <TresPlaneGeometry :args="[1000, 600]" />
    <TresMeshBasicMaterial :map="megumi1Texture" transparent />
  </TresMesh>
  <TresMesh>
    <TresPlaneGeometry :args="[1000, 600]" />
    <TresMeshBasicMaterial :map="tableTexture" transparent />
  </TresMesh>
  <TresMesh>
    <TresPlaneGeometry :args="[1000, 600]" />
    <TresMeshBasicMaterial :map="bowl1Texture" transparent />
  </TresMesh>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRenderLoop } from "@tresjs/core";

import { useAssetLoader } from "../components/useAssetLoader.ts";

defineEmits<{
  (e: "start"): void;
}>();

const { onLoop } = useRenderLoop();
const { getTexture } = useAssetLoader();

const tableTexture = getTexture("table");
const background1Texture = getTexture("background_title_base");
const megumi1Texture = getTexture("game_megumi1");
const bowl1Texture = getTexture("bowl1");

onLoop(() => {});

onMounted(() => {
  console.log("mount");
});
</script>
