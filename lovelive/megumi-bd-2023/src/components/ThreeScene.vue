<template>
  <TresOrbitControls v-if="camera" :args="[camera, renderer.domElement]" />
  <TresPerspectiveCamera :position="[3, 3, 3]" :look-at="[0, 0, 0]" />
  <TresMesh>
    <TresTorusGeometry :args="[1, 0.5, 16, 32]" />
    <TresMeshBasicMaterial />
  </TresMesh>
  <TresAmbientLight :intensity="1" />
</template>

<script setup lang="ts">
import { useTresContext } from "@tresjs/core";

const { camera, renderer } = useTresContext();
</script>
