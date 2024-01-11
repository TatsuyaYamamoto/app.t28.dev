<template>
  <v-overlay
    class="overlay"
    v-model="model"
    :contained="true"
    :persistent="true"
  >
    <div class="content">RESULT</div>
  </v-overlay>
</template>

<script lang="ts" setup>
const model = defineModel<boolean>({ required: true });
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
  background-color: #ffffff;
  border-radius: 30px;
}
</style>
