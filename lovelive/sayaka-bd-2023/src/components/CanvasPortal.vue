<template>
  <!-- do not use -->
</template>

<script setup lang="ts">
import {
  computed,
  ref,
  type VNode,
  render,
  createVNode,
  watchEffect,
  Fragment,
  onUnmounted,
} from "vue";

const props = withDefaults(defineProps<{ as?: string }>(), {
  as: "div",
});
const slots = defineSlots<{
  default(): any;
}>();

const portalTargetEl = document
  .getElementsByClassName("canvas-wrapper")
  .item(0);
const innerEl = computed(() => {
  const el = document.createElement(props.as);
  el.style.position = "absolute";
  el.style.top = "0px";
  el.style.width = "100%";
  el.style.height = "100%";
  el.style.pointerEvents = "none";
  return el;
});
const vNode = ref<VNode>();

console.log("!");

watchEffect(() => {
  if (portalTargetEl && !innerEl.value.parentNode) {
    portalTargetEl.appendChild(innerEl.value);
  }

  vNode.value = createVNode(Fragment, null, slots.default?.());

  render(vNode.value, innerEl.value);
});

onUnmounted(() => {
  innerEl.value.remove();
});
</script>
