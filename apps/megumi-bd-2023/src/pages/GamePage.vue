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
    <TresMesh v-if="shouldShowIndicator" :position="[0, -200, 0]">
      <TresTorusGeometry
        ref="indicatorRef"
        :args="[indicatorArgs.radius, indicatorArgs.tube]"
      />
      <TresMeshBasicMaterial transparent />
    </TresMesh>
  </TresGroup>
</template>

<script setup lang="ts">
import { useRenderLoop } from "@tresjs/core";
import gsap from "gsap";
import { computed, onMounted, reactive, ref } from "vue";

import { useAssetLoader } from "../components/useAssetLoader.ts";

const emit = defineEmits<{
  (e: "finish"): void;
}>();

const indicatorArgs = reactive({ radius: 50, tube: 10 });
const counter = ref<"1" | "2">("1");
const shouldShowIndicator = ref(true);
let shakeCounter = 0;

const indicatorAnimation = gsap.fromTo(
  indicatorArgs,
  { radius: 50, tube: 10 },
  {
    radius: 20,
    tube: 5,
    duration: 0.8,
    repeat: -1,
    ease: "bounce.in",
    paused: true,
  },
);

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
  counter.value = counter.value === "1" ? "2" : "1";
  shakeCounter += 1;

  if (5 === shakeCounter) {
    indicatorAnimation.pause();
    shouldShowIndicator.value = false;
  }

  if (20 < shakeCounter) {
    emit("finish");
  }
};

onLoop(() => {});

onMounted(() => {
  indicatorAnimation.play();
});
</script>
