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

      <div class="serifu">
        <img class="text-icon" :src="tsuzuri_icon" />
        <span class="text">
          {{ text }}
        </span>
      </div>

      <div class="buttons">
        <button class="button" @click="onClickForTitle">
          <img class="button-image" alt="タイトルへ" :src="kekka_continue" />
        </button>
        <button class="button" @click="onClickForShare">
          <img class="button-image" alt="結果をシェア" :src="kekka_share" />
        </button>
      </div>
      <div class="credits">
        <span>🎨 <a href="https://twitter.com/xxsanzashixx">さんざし</a></span>
        <span>💻 <a href="https://twitter.com/T28_tatsuya">T28</a></span>
      </div>
    </div>
  </v-overlay>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import kekka_continue from "../assets/kekka_continue.png";
import kekka_share from "../assets/kekka_share.png";
import tsuzuri_icon from "../assets/tsuzuri_icon.png";

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

const text = computed(() => {
  if (!model.value) {
    return;
  }

  const map = {
    kaho: `かほ、みーつけた`,
    kozue: `こず、みーつけた`,
    sayaka: `さや、みーつけた`,
    megumi: `めぐ、みーつけた`,
    rurino: `るり、みーつけた`,
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

  const hashtags = `#ハスノソラファンタジー #蓮ノ空 #lovelive`;
  const appUrl = `https://app.t28.dev/lovelive/sayaka-bd-2024`;

  const url = new URL("https://twitter.com/intent/tweet");
  url.searchParams.set(
    "text",
    `${text.value}

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

.serifu {
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 0.2rem 1rem;
  border-radius: 0.5rem;

  margin: 0.2rem 0;
}

.text-icon {
  width: 1rem;
  margin-right: 0.5rem;
}

.text {
  font-size: 0.8rem;
}

.credits {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  font-size: 0.4rem;
}
a {
  color: rgb(83, 46, 33);
  text-decoration: none;
}
</style>
