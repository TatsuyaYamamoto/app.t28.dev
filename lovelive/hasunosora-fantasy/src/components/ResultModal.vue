<template>
  <v-overlay
    class="overlay"
    v-model="model"
    :contained="true"
    :persistent="true"
  >
    <div
      class="content"
      :style="{
        // backgroundImage: `url(${back})`,
        backgroundPosition: 'center',
        backgroundSize: '140%',
      }"
    >
      <img v-if="imageUrl" :src="imageUrl" class="image" />

      <div class="buttons">
        <button class="button" @click="onClickForTitle">
          <img class="button-image" alt="タイトルへ" :src="kekka_retry" />
        </button>
        <button class="button" @click="onClickForShare">
          <img class="button-image" alt="結果をシェア" :src="kekka_share" />
        </button>
      </div>
    </div>
  </v-overlay>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import kekka_retry from "../assets/kekka_retry.png";
import kekka_share from "../assets/kekka_share.png";

import kaho from "../assets/target_kaho.png";
import kozue from "../assets/target_kozue.png";
import sayaka from "../assets/target_sayaka.png";
import megumi from "../assets/target_megumi.png";
import rurino from "../assets/target_rurino.png";

const model = defineModel<
  "kaho" | "kozue" | "sayaka" | "megumi" | "rurino" | null
>({ required: true });

const emit = defineEmits<{
  (e: "clickButton"): void;
}>();

const imageUrl = computed(() => {
  if (!model.value) {
    return;
  }

  const map = {
    kaho,
    kozue,
    sayaka,
    megumi,
    rurino,
  };
  return map[model.value];
});

const onClickForTitle = () => {
  emit("clickButton");
};

const onClickForShare = () => {
  if (!model.value) {
    return;
  }

  const hashtags = `#さやかちゃんのおべんとう #蓮ノ空 #村野さやか生誕祭2024`;
  const appUrl = `https://app.t28.dev/lovelive/sayaka-bd-2024`;

  const texts = {
    kaho: `かほ`,
    kozue: `こず`,
    sayaka: `さや`,
    megumi: `める`,
    rurino: `るり`,
  };

  const url = new URL("https://twitter.com/intent/tweet");
  url.searchParams.set(
    "text",
    `${texts[model.value]}

${hashtags}
${appUrl}`,
  );

  location.href = url.toString();
};
</script>

<style scoped>
.overlay {
  align-items: center;
  justify-content: center;
  margin: auto;
}

.content {
  width: 20rem;
  height: 10rem;
  border-radius: 30px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.image {
  height: 8rem;
}
.buttons {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.button {
  width: 4rem;
  border: 0;
  background: transparent;
}

.button-image {
  width: 100%;
}
</style>
