<template>
  <TresOrbitControls v-if="camera" :args="[camera, renderer.domElement]" />
  <TresPerspectiveCamera
    :args="[32, 2.3]"
    :position="[0, 0, 1000]"
    :look-at="[0, 0, 0]"
  />
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
    <TresMeshBasicMaterial :color="new Color(0xffffff)" :wireframe="true" />
  </TresMesh>
  <TresAmbientLight :intensity="5" />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { Mesh, TextureLoader, Color } from "three";
import { useTresContext, useRenderLoop } from "@tresjs/core";
import {
  AssetManager,
  AtlasAttachmentLoader,
  SkeletonMesh,
  SkeletonJson,
} from "@esotericsoftware/spine-threejs";

import background1 from "../../spines/title-megumi/images/背景（外まで）.png";
import backgroundEffect from "../../spines/title-megumi/images/集中線.png";
import skeletonFile from "../../spines/title-megumi/out/megumi-title.json";
import atlasFile from "../../spines/title-megumi/out/megumi-title.atlas";

const { camera, renderer } = useTresContext();
const { onLoop } = useRenderLoop();

const assetManager = new AssetManager();

const meshRef = ref<Mesh>();
let skeletonMesh: SkeletonMesh | null = null;

const background1Texture = new TextureLoader().load(background1);
const backgroundEffectTexture = new TextureLoader().load(backgroundEffect);

const init = () => {
  assetManager.loadTextureAtlas(atlasFile);
  assetManager.loadAll().then(() => {
    // Load the texture atlas using name.atlas and name.png from the AssetManager.
    // The function passed to TextureAtlas is used to resolve relative paths.
    const atlas = assetManager.require(atlasFile);

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
  });
};

onLoop(({ delta }) => {
  // resize canvas to use full page, adjust camera/renderer
  // resize();
  // Update orbital controls
  // controls.update();
  // update the animation
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
