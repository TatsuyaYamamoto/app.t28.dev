<template>
  <TresGroup ref="groupRef">
    <!--    <TresMesh @click="onClick">-->
    <!--      <TresPlaneGeometry :args="[1000, 600]" />-->
    <!--      <TresMeshBasicMaterial :map="background1Texture" transparent />-->
    <!--    </TresMesh>-->
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
const { getSpine } = useAssetLoader();

const groupRef = ref<Group>();
let skeletonMesh: SkeletonMesh | null = null;

const sayaka = getSpine("title_sayaka");

const init = async () => {
  const atlasLoader = new AtlasAttachmentLoader(sayaka.textureAtlas);
  const skeletonJson = new SkeletonJson(atlasLoader);
  const skeletonData = skeletonJson.readSkeletonData(sayaka.skeleton);

  skeletonMesh = new SkeletonMesh(skeletonData, (parameters) => {
    parameters.depthWrite = false;
  });
  skeletonMesh.position.set(-300, 200, 0);
  skeletonMesh.scale.setScalar(0.1);
  skeletonMesh.state.setAnimation(0, "idling", true);
  groupRef.value?.add(skeletonMesh);
};

onLoop(({ delta }) => {
  skeletonMesh?.update(delta);
});

onMounted(() => {
  init();
});
</script>
