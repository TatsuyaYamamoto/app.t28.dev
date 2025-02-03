<template>
  <div v-if="internalOpenState" class="border">
    この先にはなにもない気がする。
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";

const openModelValue = defineModel<boolean>({ required: true });

const internalOpenState = ref(false);

let currentTimeoutId: ReturnType<typeof setTimeout> | null = null;

watch(openModelValue, (currentOpenModelValue) => {
  if (currentOpenModelValue) {
    internalOpenState.value = true;

    if (currentTimeoutId) {
      clearTimeout(currentTimeoutId);
    }

    currentTimeoutId = setTimeout(() => {
      internalOpenState.value = false;
      openModelValue.value = false;
    }, 2000);
  }
});
</script>

<style scoped>
.border {
  font-size: 0.5rem;
  display: inline-flex;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 0.1rem 0.3rem;
  border-radius: 1000px;
}
</style>
