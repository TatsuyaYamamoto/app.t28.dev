<template>
  <TresGroup>
    <TresGroup :position="charaPosition">
      <template v-for="(tiles, i) in FIELD_TILE_BLOCKS">
        <template v-for="(_tile, j) in tiles">
          <TresMesh
            :position="[FIELD_TILE_WIDTH * i, FIELD_TILE_HEIGHT * j, 0]"
          >
            <TresPlaneGeometry :args="[FIELD_TILE_WIDTH, FIELD_TILE_HEIGHT]" />
            <TresMeshBasicMaterial :map="textures.fieldGrass" transparent />
          </TresMesh>
        </template>
      </template>
    </TresGroup>
    <TresMesh :position="[0, 0, 0]">
      <TresPlaneGeometry :args="[100, 100]" />
      <TresMeshBasicMaterial :map="textures.tsuzuriWalk1" transparent />
    </TresMesh>

    <!-- TresGroup の中で CanvasPortal を定義しないと、unmount 時に tres が止まる -->
    <CanvasPortal>
      <div class="keyboard-area">
        <Keyboard />
      </div>
    </CanvasPortal>
  </TresGroup>
</template>

<script setup lang="ts">
import { computed, onMounted, shallowRef } from "vue";
import { useRenderLoop } from "@tresjs/core";
import { useMagicKeys } from "@vueuse/core";

import CanvasPortal from "../components/CanvasPortal.vue";
import { useAssetLoader } from "../components/useAssetLoader.ts";
import Keyboard from "../components/Keyboard.vue";

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

const FIELD_TILE_WIDTH = 600;
const FIELD_TILE_HEIGHT = 600;
const FIELD_TILE_BLOCKS = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
] as const;
const fieldWidth = FIELD_TILE_WIDTH * FIELD_TILE_BLOCKS[0].length;
const fieldHeight = FIELD_TILE_HEIGHT * FIELD_TILE_BLOCKS.length;

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

const charaPosition = shallowRef<[number, number, number]>([0, 0, 0]);

onLoop(({ delta }) => {
  charaPosition.value = [
    charaPosition.value[0] - velocity.value.x * delta,
    charaPosition.value[1] - velocity.value.y * delta,
    charaPosition.value[2],
  ];
});

onMounted(() => {});
</script>

<style scoped>
.keyboard-area {
  position: absolute;

  left: 0.5rem;
  bottom: 0.5rem;
}
</style>
