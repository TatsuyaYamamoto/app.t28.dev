<template>
  <div class="canvas-wrapper">
    <TresCanvas
      clear-color="#FCFCFC"
      :output-color-space="
        /* https://discourse.threejs.org/t/why-the-color-palette-change-from-v0-150-1-to-v0-152-2/51417/2 */
        LinearSRGBColorSpace
      "
      :toneMapping="
        /* https://github.com/Tresjs/tres/issues/492 */
        NoToneMapping
      "
    >
      <TresPerspectiveCamera
        :args="[/* fov */ 32, /* aspect */ 2.3]"
        :position="[0, 0, 1000]"
        :look-at="[0, 0, 0]"
      />
      <CameraControls v-if="debugCamera" />
      <TresGridHelper
        v-if="debugGrid"
        :args="[
          /* size */ 1000,
          /* divisions */ 10,
          /* colorCenterLine */ '#ff0000',
        ]"
        :rotate-x="-(Math.PI / 2)"
      />

      <slot name="canvas"></slot>
    </TresCanvas>

    <slot name="html"></slot>
  </div>
</template>

<script setup lang="ts">
import { LinearSRGBColorSpace, NoToneMapping } from "three";
import { CameraControls } from "@tresjs/cientos";

import { useRendererSize } from "../hooks/useRendererSize";

const props = defineProps<{
  baseWidth: number;
  baseHeight: number;
  debugCamera?: boolean;
  debugGrid?: boolean;
}>();

const { rendererRotate, rendererWidthPx, rendererHeightPx } = useRendererSize(
  props.baseWidth,
  props.baseHeight,
);
</script>

<style scoped>
.canvas-wrapper {
  position: relative;
  flex-shrink: 0;
  width: v-bind(rendererWidthPx);
  height: v-bind(rendererHeightPx);
  transform: rotate(v-bind(rendererRotate));
}
</style>
