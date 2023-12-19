<template>
  <TresOrbitControls v-if="camera" :args="[camera, renderer.domElement]" />
</template>

<script setup lang="ts">
import { useTresContext } from "@tresjs/core";

const { camera, renderer } = useTresContext();
</script>
