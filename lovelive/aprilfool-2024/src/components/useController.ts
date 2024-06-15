import { useMagicKeys } from "@vueuse/core";
import { computed, onMounted, onUnmounted, ref } from "vue";

const upPointer = ref(false);
const leftPointer = ref(false);
const downPointer = ref(false);
const rightPointer = ref(false);

export const useController = () => {
  const { w, a, s, d } = useMagicKeys();

  const upPointerEl = ref<HTMLElement>();
  const leftPointerEl = ref<HTMLElement>();
  const downPointerEl = ref<HTMLElement>();
  const rightPointerEl = ref<HTMLElement>();

  // https://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript
  const isTouchDevice =
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    // @ts-expect-error
    navigator.msMaxTouchPoints > 0;

  const onTouchStart = {
    up: () => (upPointer.value = true),
    left: () => (leftPointer.value = true),
    down: () => (downPointer.value = true),
    right: () => (rightPointer.value = true),
  };
  const onTouchEnd = {
    up: () => (upPointer.value = false),
    left: () => (leftPointer.value = false),
    down: () => (downPointer.value = false),
    right: () => (rightPointer.value = false),
  };

  onMounted(() => {
    if (isTouchDevice) {
      upPointerEl.value?.addEventListener("touchstart", onTouchStart.up);
      leftPointerEl.value?.addEventListener("touchstart", onTouchStart.left);
      downPointerEl.value?.addEventListener("touchstart", onTouchStart.down);
      rightPointerEl.value?.addEventListener("touchstart", onTouchStart.right);

      upPointerEl.value?.addEventListener("touchend", onTouchEnd.up);
      leftPointerEl.value?.addEventListener("touchend", onTouchEnd.left);
      downPointerEl.value?.addEventListener("touchend", onTouchEnd.down);
      rightPointerEl.value?.addEventListener("touchend", onTouchEnd.right);
    }
  });

  onUnmounted(() => {
    if (isTouchDevice) {
      upPointerEl.value?.removeEventListener("touchstart", onTouchStart.up);
      leftPointerEl.value?.removeEventListener("touchstart", onTouchStart.left);
      downPointerEl.value?.removeEventListener("touchstart", onTouchStart.down);
      rightPointerEl.value?.removeEventListener(
        "touchstart",
        onTouchStart.right,
      );

      upPointerEl.value?.removeEventListener("touchend", onTouchEnd.up);
      leftPointerEl.value?.removeEventListener("touchend", onTouchEnd.left);
      downPointerEl.value?.removeEventListener("touchend", onTouchEnd.down);
      rightPointerEl.value?.removeEventListener("touchend", onTouchEnd.right);
    }
  });

  return {
    up: computed(() => {
      return w?.value || upPointer.value;
    }),
    left: computed(() => {
      return a?.value || leftPointer.value;
    }),
    down: computed(() => {
      return s?.value || downPointer.value;
    }),
    right: computed(() => {
      return d?.value || rightPointer.value;
    }),
    isTouchDevice,
    upPointerEl,
    leftPointerEl,
    downPointerEl,
    rightPointerEl,
  };
};
