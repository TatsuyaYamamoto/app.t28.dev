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
        backgroundImage: `url(${kekka_back})`,
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
import kekka_back from "../assets/kekka_back.png";
import result_1 from "../assets/result_1.png";
import result_2 from "../assets/result_2.png";
import result_3 from "../assets/result_3.png";
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
    result_1,
    result_2,
    result_3,
  };
  return map[`result_${model.value}`];
});

const onClickForTitle = () => {
  emit("clickButton");
};

const onClickForShare = () => {
  if (!model.value) {
    return;
  }

  const hashtags = `#ひめちゃんのはやぐい #蓮ノ空 ##安養寺姫芽生誕祭2024`;
  const appUrl = `https://app.t28.dev/lovelive/hime-bd-2024`;

  const texts = {
    1: `ゆっくりたべた方がおいしいと思う...お茶飲む？`,
    2: `おまんじゅうおいしかったね　こすずもよろこんでた`,
    3: `さすが姫芽だね！`,
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
