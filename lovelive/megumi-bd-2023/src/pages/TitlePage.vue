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
import { Mesh, TextureLoader, Color } from "three";
import { useRenderLoop } from "@tresjs/core";
import {
  ThreeJsTexture,
  AtlasAttachmentLoader,
  SkeletonMesh,
  SkeletonJson,
  TextureAtlas,
} from "@esotericsoftware/spine-threejs";

import background1 from "../../spines/title-megumi/images/背景（外まで）.png";
import backgroundEffect from "../../spines/title-megumi/images/集中線.png";
import skeletonFile from "../../spines/title-megumi/out/megumi-title.json";
import atlasText from "../../spines/title-megumi/out/megumi-title.atlas?raw";
import atlasImage from "../../spines/title-megumi/out/megumi-title.png";

const { onLoop } = useRenderLoop();

const wireframeColor = new Color(0xffffff);

const meshRef = ref<Mesh>();
let skeletonMesh: SkeletonMesh | null = null;

const background1Texture = new TextureLoader().load(background1);
const backgroundEffectTexture = new TextureLoader().load(backgroundEffect);

const init = async () => {
  const i = new Image();
  await new Promise((resolve) => {
    i.onload = resolve;
    i.src = atlasImage;
  });

  const atlas = new TextureAtlas(atlasText);
  atlas.pages.forEach((page) => {
    page.setTexture(new ThreeJsTexture(i));
  });
  // Create a AtlasAttachmentLoader that resolves region, mesh, boundingbox and path attachments
  const atlasLoader = new AtlasAttachmentLoader(atlas);

  // Create a SkeletonJson instance for parsing the .json file.
  let skeletonJson = new SkeletonJson(atlasLoader);

  // Set the scale to apply during parsing, parse the file, and create a new skeleton.
  skeletonJson.scale = 0.1;
  const skeletonData = skeletonJson.readSkeletonData(
    // assetManager.require(skeletonFile),
    skeletonFile,
  );

  // Create a SkeletonMesh from the data and attach it to the scene
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
