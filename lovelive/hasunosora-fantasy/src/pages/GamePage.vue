<template>
  <TresGroup>
    <TresMesh :position="position">
      <TresPlaneGeometry :args="[1000, 600]" />
      <TresMeshBasicMaterial :map="textures.fieldGrass" transparent />
    </TresMesh>
    <TresMesh :position="[0, 0, 0]">
      <TresPlaneGeometry :args="[100, 100]" />
      <TresMeshBasicMaterial :map="textures.tsuzuriWalk1" transparent />
    </TresMesh>
  </TresGroup>
</template>

<script setup lang="ts">
import { computed, onMounted, shallowRef } from "vue";
import { useRenderLoop } from "@tresjs/core";
import { useMagicKeys } from "@vueuse/core";

import { useAssetLoader } from "../components/useAssetLoader.ts";

const emit = defineEmits<{
  (e: "finish"): void;
}>();

const { onLoop } = useRenderLoop();
const { getTexture } = useAssetLoader();
const { w: up, a: left, s: down, d: right } = useMagicKeys();

const textures = {
  fieldGrass: getTexture("field_grass"),
  tsuzuriWalk1: getTexture("tsuzuri_walk_1"),
};

const WALK_VELOCITY = 300;

const velocity = computed(() => {
  let x = 0;
  let y = 0;
  if (up.value) {
    y += 1;
  }
  if (down.value) {
    y -= 1;
  }
  if (right.value) {
    x += 1;
  }
  if (left.value) {
    x -= 1;
  }
  if (x === 0 && y === 0) {
    return { x: 0, y: 0 };
  }

  const radians = Math.atan2(y, x);

  return {
    x: WALK_VELOCITY * Number(Math.cos(radians).toFixed(5)),
    y: WALK_VELOCITY * Number(Math.sin(radians).toFixed(5)),
  };
});

const position = shallowRef<[number, number, number]>([0, 0, 0]);

onLoop(({ delta }) => {
  console.log(velocity.value);
  position.value = [
    position.value[0] - velocity.value.x * delta,
    position.value[1] - velocity.value.y * delta,
    position.value[2],
  ];
});

onMounted(() => {});
</script>
