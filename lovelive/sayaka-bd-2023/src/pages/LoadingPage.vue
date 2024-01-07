<template></template>

<script setup lang="ts">
import { onMounted } from "vue";

import { useAssetLoader } from "../hooks/useAssetLoader.ts";

const emit = defineEmits<{
  (e: "loadCompleted"): void;
}>();

const { load } = useAssetLoader();

onMounted(() => {
  load().then(() => {
    console.log("load!!");
    emit("loadCompleted");
  });
});
</script>
