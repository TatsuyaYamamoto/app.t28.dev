<template>
  <TresGroup ref="groupRef">
    <TresMesh :position="[0, 0, -1]" @click="onClick">
      <TresPlaneGeometry :args="[1717 * 0.6, 1057 * 0.6]" />
      <TresMeshBasicMaterial :map="textures.back" transparent />
    </TresMesh>

    <CanvasPortal>
      <div v-if="shouldShow.readyStepAnimation">
        <img
          :class="['tea-step', classes.teaStep1]"
          :src="textures.teaStep1.image.src"
        />
        <img
          :class="['tea-step', classes.teaStep2]"
          :src="textures.teaStep2.image.src"
        />
      </div>

      <Transition name="fade">
        <TapAnnounce v-if="shouldShow.tapAnnounce" />
      </Transition>
    </CanvasPortal>
  </TresGroup>
</template>

<script setup lang="ts">
import { nextTick, onMounted, reactive, ref } from "vue";
import type { Group } from "three";
import { useRenderLoop } from "@tresjs/core";
import {
  AtlasAttachmentLoader,
  SkeletonMesh,
  SkeletonJson,
} from "@esotericsoftware/spine-threejs";

import { wait } from "shared/helpers/utils.ts";
import CanvasPortal from "shared/components/CanvasPortal.vue";

import TapAnnounce from "../components/TapAnnounce.vue";
import { useAssetLoader } from "../hooks/useAssetLoader.ts";
import { loopBlinkAnim } from "../utils.ts";

const emit = defineEmits<{
  (e: "finish"): void;
}>();

const { onLoop } = useRenderLoop();
const { getSpine, getTexture } = useAssetLoader();

const textures = {
  back: getTexture("back"),
  desk: getTexture("desk"),
  teaStep1: getTexture("tea_step_1"),
  teaStep2: getTexture("tea_step_2"),
  potAndCup: getTexture("pot_and_cup"),
};

let rurinoSkeletonMesh: SkeletonMesh | null = null;
const rurino = getSpine("rurino");

const groupRef = ref<Group>();
const shouldShow = reactive({
  readyStepAnimation: false,
  tapAnnounce: false,
});

const classes = {
  teaStep1: "tea-step-1",
  teaStep2: "tea-step-2",
};

let canClick = false;
let stopLoopBlinkAnim: (() => void) | null = null;

const createSkeletonMesh = (spine: ReturnType<typeof getSpine>) => {
  const atlasLoader = new AtlasAttachmentLoader(spine.textureAtlas);
  const skeletonJson = new SkeletonJson(atlasLoader);
  const skeletonData = skeletonJson.readSkeletonData(spine.skeleton);

  return new SkeletonMesh(skeletonData, (parameters) => {
    parameters.depthWrite = false;
  });
};

const init = async () => {
  rurinoSkeletonMesh = createSkeletonMesh(rurino);
  rurinoSkeletonMesh.position.set(0, 0, 0);
  rurinoSkeletonMesh.scale.setScalar(0.138);

  groupRef.value?.add(rurinoSkeletonMesh);
  rurinoSkeletonMesh.state.setAnimation(0, "idle", true);
  stopLoopBlinkAnim = loopBlinkAnim(rurinoSkeletonMesh.state, 5);

  await wait(300);

  shouldShow.readyStepAnimation = true;
  await nextTick();
  shouldShow.readyStepAnimation = false;
  shouldShow.tapAnnounce = true;
  canClick = true;

  wait(3000).then(() => {
    shouldShow.tapAnnounce = false;
  });
};

const onClick = async () => {
  if (!canClick || !rurinoSkeletonMesh) {
    return;
  }

  stopLoopBlinkAnim?.();

  const entry = rurinoSkeletonMesh.state.setAnimation(0, "success", false);
  entry.mixDuration = 0.5;

  await wait(1500);
  emit("finish");
};

onLoop(({ delta }) => {
  rurinoSkeletonMesh?.update(delta);
});

onMounted(() => {
  init();
});
</script>

<style scoped>
.tea-step {
  position: absolute;
  width: 7rem;
  border-radius: 1rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
