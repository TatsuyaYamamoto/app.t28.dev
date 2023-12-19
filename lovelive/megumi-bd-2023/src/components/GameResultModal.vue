<template>
  <div class="modal-wrapper">
    <div class="modal" :style="{ backgroundImage: `url(${back})` }">
      <img :src="srcs.tkg" class="modal-tkg-image" />
      <img :src="srcs.result" class="modal-result-label" />
      <div>
        <button class="button" @click="onClickForTitle">
          <img class="button-image" alt="タイトルへ" :src="button1" />
        </button>
        <button class="button" @click="onClickForShare">
          <img class="button-image" alt="結果をシェア" :src="button2" />
        </button>
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
import button1 from "../assets/button_1.png";
import button2 from "../assets/button_2.png";

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
  const hashtags = `#めぐちゃんのTKG #蓮ノ空 #藤島慈生誕祭2023`;
  const appUrl = `https://app.t28.dev/lovelive/megumi-bd-2023`;

  const texts = {
    1: `おいちおいち💕`,
    2: `おいしそう！`,
    3: `めぐちゃんの TKG が...`,
  };

  const url = new URL("https://twitter.com/intent/tweet");
  url.searchParams.set(
    "text",
    `${texts[props.imageType]}

${hashtags}
${appUrl}`,
  );
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
  width: 15rem;
}

.modal-result-label {
  width: 15rem;
  transform: translateY(-1rem);
}

.button {
  width: 10rem;
  border: 0;
  background: transparent;
}

.button-image {
  width: 100%;
}
</style>
