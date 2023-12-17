<template>
  <TresCanvas clear-color="#82DBC5" window-size>
    <ThreeScene />
  </TresCanvas>
</template>

<script setup lang="ts">
import ThreeScene from "./components/ThreeScene.vue";
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
#app {
  height: 100%;
  width: 100%;
}
</style>
