<template>
  <div class="modal-wrapper">
    <div class="modal">
      <img :src="src" class="modal-tkg-image" />
      <button @click="onClickForTitle">タイトルへ</button>
      <button @click="onClickForShare">結果をシェア</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import tkg1 from "../assets/tkg_1.png";
import tkg2 from "../assets/tkg_2.png";
import tkg3 from "../assets/tkg_3.png";

const props = defineProps<{ imageType: 1 | 2 | 3 }>();
const emit = defineEmits<{ (e: "clickButton"): void }>();

const src = computed(() => {
  const map = {
    1: tkg1,
    2: tkg2,
    3: tkg3,
  };

  return map[props.imageType];
});

const onClickForTitle = () => {
  emit("clickButton");
};

const onClickForShare = () => {
  const url = new URL("https://twitter.com/intent/tweet");
  url.searchParams.set("text", `共有分！`);
  location.href = url.toString();
};
</script>

<style scoped>
.modal-wrapper {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.3);

  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  width: 80%;
  height: 80%;

  background: #ffffff;
}

.modal-tkg-image {
  width: 30rem;
}
</style>
