<template>
  <div class="modal-wrapper">
    <div class="modal" :style="{ backgroundImage: `url(${back})` }">
      <img :src="srcs.tkg" class="modal-tkg-image" />
      <img :src="srcs.result" class="modal-result-label" />
      <div>
        <button @click="onClickForTitle">タイトルへ</button>
        <button @click="onClickForShare">結果をシェア</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import back from "../assets/back.jpg";
import tkg1 from "../assets/tkg_1.png";
import tkg2 from "../assets/tkg_2.png";
import tkg3 from "../assets/tkg_3.png";
import result_1 from "../assets/result_1.png";
import result_2 from "../assets/result_2.png";
import result_3 from "../assets/result_3.png";

const props = defineProps<{ imageType: 1 | 2 | 3 }>();
const emit = defineEmits<{ (e: "clickButton"): void }>();

const srcs = computed(() => {
  const tkgs = {
    1: tkg1,
    2: tkg2,
    3: tkg3,
  };
  const results = {
    1: result_1,
    2: result_2,
    3: result_3,
  };

  return {
    tkg: tkgs[props.imageType],
    result: results[props.imageType],
  };
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
  border-radius: 10%;
  background-size: 70%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.modal-tkg-image {
  width: 10rem;
}

.modal-result-label {
  width: 10rem;
  transform: translateY(-1rem);
}
</style>
