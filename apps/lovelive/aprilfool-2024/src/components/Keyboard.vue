<template>
  <div class="keyboard">
    <div class="keyboard-line">
      <div class="key" :class="{ pressed: up }" ref="upPointerEl">
        {{ isTouchDevice ? "↑" : "W" }}
      </div>
    </div>
    <div class="keyboard-line">
      <div class="key" :class="{ pressed: left }" ref="leftPointerEl">
        {{ isTouchDevice ? "←" : "A" }}
      </div>
      <div class="key" :class="{ pressed: down }" ref="downPointerEl">
        {{ isTouchDevice ? "↓" : "S" }}
      </div>
      <div class="key" :class="{ pressed: right }" ref="rightPointerEl">
        {{ isTouchDevice ? "→" : "D" }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useController } from "./useController.ts";

const {
  isTouchDevice,
  up,
  left,
  down,
  right,
  upPointerEl,
  leftPointerEl,
  downPointerEl,
  rightPointerEl,
} = useController();
</script>

<style scoped>
.keyboard {
  /* canvas portal で none にしている */
  pointer-events: auto;
  user-select: none;
  -webkit-user-select: none;

  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.keyboard-line {
  display: flex;
  justify-content: center;
  gap: 0.6rem;
}

.key {
  text-align: center;
  box-sizing: border-box;
  height: 2rem;
  width: 2.2rem;
  line-height: 1rem;
  padding: 0.1rem 0.4rem;
  user-select: none;
  border-radius: 0.2rem;
  background: #ffffff;
  box-shadow: 0 0.04rem 0 0.08rem #ddddff;
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.pressed {
  background: #cccccc;
}
</style>
