<template>
  <div class="keyboard">
    <div class="keyboard-line">
      <div class="key" :class="{ pressed: w }">W</div>
    </div>
    <div class="keyboard-line">
      <div class="key" :class="{ pressed: a }">A</div>
      <div class="key" :class="{ pressed: s }">S</div>
      <div class="key" :class="{ pressed: d }">D</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useMagicKeys } from "@vueuse/core";

const { w, a, s, d } = useMagicKeys();
</script>

<style scoped>
.keyboard {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}
.keyboard-line {
  display: flex;
  justify-content: center;
  gap: 0.2rem;
}

.key {
  text-align: center;
  box-sizing: border-box;
  height: 1.2rem;
  line-height: 1rem;
  padding: 0.1rem 0.4rem;
  user-select: none;
  border-radius: 0.2rem;
  background: #ffffff;
  box-shadow: 0 0.04rem 0 0.08rem #ddddff;
  cursor: pointer;
  position: relative;
}
.pressed {
  background: #cccccc;
}
</style>
