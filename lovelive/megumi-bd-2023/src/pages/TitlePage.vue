<template>
  <TresMesh>
    <!--    <TresBoxGeometry :args="[200, 200, 200]" />-->
    <TresPlaneGeometry :args="[1000, 600]" />
    <TresMeshBasicMaterial :map="background1Texture" transparent />
  </TresMesh>
  <TresMesh>
    <TresPlaneGeometry :args="[1000, 600]" />
    <TresMeshBasicMaterial :map="backgroundEffectTexture" transparent />
  </TresMesh>

  <TresMesh ref="meshRef" :position="[0, -300, 0]">
    <TresMeshBasicMaterial :color="wireframeColor" :wireframe="true" />
  </TresMesh>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { Mesh, Color } from "three";
import { useRenderLoop } from "@tresjs/core";
import {
  AtlasAttachmentLoader,
  SkeletonMesh,
  SkeletonJson,
} from "@esotericsoftware/spine-threejs";

import { useAssetLoader } from "../components/useAssetLoader.ts";

const { onLoop } = useRenderLoop();
const { getTexture, getSpine } = useAssetLoader();

const wireframeColor = new Color(0xffffff);

const meshRef = ref<Mesh>();
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
  meshRef.value?.add(skeletonMesh);
};

onLoop(({ delta }) => {
  skeletonMesh?.update(delta);
});

onMounted(() => {
  init();
});

onUnmounted(() => {
  if (skeletonMesh) {
    meshRef.value?.remove(skeletonMesh);
  }
});
</script>
