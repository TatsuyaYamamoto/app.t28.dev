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
    </div>
  </v-overlay>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import back from "../assets/back.jpg";
import bento1 from "../assets/bento_1.png";
import bento2 from "../assets/bento_2.png";
import bento3 from "../assets/bento_3.png";

const model = defineModel<1 | 2 | 3 | undefined>({ required: true });

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
}

.image {
  width: 10rem;
}
</style>
