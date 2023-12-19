<template>
  <TresGroup ref="groupRef">
    <TresMesh @click="onClick">
      <TresPlaneGeometry :args="[1000, 600]" />
      <TresMeshBasicMaterial :map="background1Texture" transparent />
    </TresMesh>
    <TresMesh>
      <TresPlaneGeometry :args="[1000, 600]" />
      <TresMeshBasicMaterial :map="backgroundEffectTexture" transparent />
    </TresMesh>
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

import { useAssetLoader } from "../components/useAssetLoader.ts";

const emit = defineEmits<{
  (e: "start"): void;
}>();

const { onLoop } = useRenderLoop();
const { getTexture, getSpine } = useAssetLoader();

const groupRef = ref<Group>();
let skeletonMesh: SkeletonMesh | null = null;

const background1Texture = getTexture("background_title_base");
const backgroundEffectTexture = getTexture("background_title_line");
const megumi = getSpine("title_megumi");

const init = async () => {
  const atlasLoader = new AtlasAttachmentLoader(megumi.textureAtlas);
  const skeletonJson = new SkeletonJson(atlasLoader);
  skeletonJson.scale = 0.1;
  const skeletonData = skeletonJson.readSkeletonData(megumi.skeleton);

  skeletonMesh = new SkeletonMesh(skeletonData, (parameters) => {
    parameters.alphaTest = 0.5;
    parameters.blendDst = 205;
    parameters.blendEquation = 100;
    parameters.blendSrc = 204;
    parameters.blending = 1;
    parameters.depthFunc = 3;
    parameters.transparent = true;
    parameters.depthTest = false;
    parameters.depthWrite = false;
    parameters.lights = false;
    parameters.side = 2;
    parameters.transparent = true;
  });
  skeletonMesh.state.setAnimation(0, "idling", true);
  skeletonMesh.position.y = -300;
  groupRef.value?.add(skeletonMesh);
};

const onClick = () => {
  console.log("title:onClick");
  emit("start");
};

onLoop(({ delta }) => {
  skeletonMesh?.update(delta);
});

onMounted(() => {
  init();
  console.log("mount");
});
</script>
