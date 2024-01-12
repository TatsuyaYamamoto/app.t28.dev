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
        backgroundImage: `url(${back})`,
        backgroundPosition: 'center',
        backgroundSize: '140%',
      }"
    >
      <img v-if="imageUrl" :src="imageUrl" class="image" />

      <div class="buttons">
        <button class="button" @click="onClickForTitle">
          <img class="button-image" alt="タイトルへ" :src="buttonTitleImage" />
        </button>
        <button class="button" @click="onClickForShare">
          <img
            class="button-image"
            alt="結果をシェア"
            :src="buttonTitleShare"
          />
        </button>
      </div>
    </div>
  </v-overlay>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import back from "../assets/back.jpg";
import bento1 from "../assets/bento_1.png";
import bento2 from "../assets/bento_2.png";
import bento3 from "../assets/bento_3.png";
import buttonTitleImage from "../assets/kekka_title.png";
import buttonTitleShare from "../assets/kekka_share.png";

const model = defineModel<1 | 2 | 3 | undefined>({ required: true });
const emit = defineEmits<{
  (e: "clickButton"): void;
}>();

const imageUrl = computed(() => {
  if (!model.value) {
    return;
  }

  const map = {
    bento1,
    bento2,
    bento3,
  };
  return map[`bento${model.value}`];
});

const onClickForTitle = () => {
  emit("clickButton");
};

const onClickForShare = () => {
  if (!model.value) {
    return;
  }

  const hashtags = `#さやかちゃんのおべんとう #蓮ノ空 #村野さやか生誕祭2023`;
  const appUrl = `https://app.t28.dev/lovelive/sayaka-bd-2023`;

  const texts = {
    1: `ずっとたべたいからあげ`,
    2: `おーかわいい`,
    3: `ねるねるおいしいね`,
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
  width: 10rem;
}
.buttons {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.button {
  width: 3rem;
  border: 0;
  background: transparent;
}

.button-image {
  width: 100%;
}
</style>
