<template>
  <TresGroup ref="groupRef">
    <TresMesh :position="[0, 0, -1]" @click="onClick">
      <TresPlaneGeometry :args="[1200, 800]" />
      <TresMeshBasicMaterial :map="backTexture" transparent />
    </TresMesh>
    <!--    <TresMesh>-->
    <!--      <TresPlaneGeometry :args="[1000, 600]" />-->
    <!--      <TresMeshBasicMaterial :map="backgroundEffectTexture" transparent />-->
    <!--    </TresMesh>-->
    <!--    <TresMesh :position="[180, 100, 100]">-->
    <!--      <TresPlaneGeometry :args="[500, 300]" />-->
    <!--      <TresMeshBasicMaterial :map="title" transparent />-->
    <!--    </TresMesh>-->
  </TresGroup>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Group } from "three";
import { useRenderLoop } from "@tresjs/core";
import {
  AtlasAttachmentLoader,
  SkeletonMesh,
  SkeletonJson,
} from "@esotericsoftware/spine-threejs";

import { useAssetLoader } from "../hooks/useAssetLoader.ts";

const emit = defineEmits<{
  (e: "start"): void;
}>();

const { onLoop } = useRenderLoop();
const { getSpine, getTexture } = useAssetLoader();

const groupRef = ref<Group>();
let sayakaSkeletonMesh: SkeletonMesh | null = null;
const backTexture = getTexture("back");

const sayaka = getSpine("game_sayaka");

const createSkeletonMesh = (spine: ReturnType<typeof getSpine>) => {
  const atlasLoader = new AtlasAttachmentLoader(spine.textureAtlas);
  const skeletonJson = new SkeletonJson(atlasLoader);
  const skeletonData = skeletonJson.readSkeletonData(spine.skeleton);

  return new SkeletonMesh(skeletonData, (parameters) => {
    parameters.depthWrite = false;
  });
};

const init = async () => {
  sayakaSkeletonMesh = createSkeletonMesh(sayaka);
  sayakaSkeletonMesh.position.set(-480, 280, 0);
  sayakaSkeletonMesh.scale.setScalar(0.138);

  groupRef.value?.add(sayakaSkeletonMesh);

  // sayakaSkeletonMesh.state.setAnimation(0, "start");
  // sayakaSkeletonMesh.state.addAnimation(0, "idle", true);
};

const onClick = () => {
  sayakaSkeletonMesh?.state.setAnimation(0, "cut");
};

onLoop(({ delta }) => {
  sayakaSkeletonMesh?.update(delta);
});

onMounted(() => {
  init();
});
</script>
