<template>
  <CanvasPortal>
    <div class="announce">よみこみちゅう...</div>
  </CanvasPortal>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

import { useAssetLoader } from "../components/useAssetLoader.ts";
import CanvasPortal from "../components/CanvasPortal.vue";

const emit = defineEmits<{
  (e: "loadCompleted"): void;
}>();

const { load } = useAssetLoader();

onMounted(() => {
  load().then(() => {
    emit("loadCompleted");
  });
});
</script>

<style scoped>
.announce {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 1rem;
}
</style>
