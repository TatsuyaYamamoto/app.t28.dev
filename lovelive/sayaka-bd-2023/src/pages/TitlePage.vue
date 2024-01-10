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

import { wait } from "shared/helpers/utils.ts";

import { useAssetLoader } from "../hooks/useAssetLoader.ts";

const emit = defineEmits<{
  (e: "start"): void;
}>();

const { onLoop } = useRenderLoop();
const { getSpine, getTexture } = useAssetLoader();

const groupRef = ref<Group>();
let sayakaSkeletonMesh: SkeletonMesh | null = null;
let logoSkeletonMesh: SkeletonMesh | null = null;
const backTexture = getTexture("back");

const sayaka = getSpine("title_sayaka");
const logo = getSpine("title_logo");

const createSkeletonMesh = (spine: ReturnType<typeof getSpine>) => {
  const atlasLoader = new AtlasAttachmentLoader(spine.textureAtlas);
  const skeletonJson = new SkeletonJson(atlasLoader);
  const skeletonData = skeletonJson.readSkeletonData(spine.skeleton);

  return new SkeletonMesh(skeletonData, (parameters) => {
    parameters.depthWrite = false;
  });
};

const init = async () => {
  logoSkeletonMesh = createSkeletonMesh(logo);
  logoSkeletonMesh.position.set(-450, 250, 0);
  logoSkeletonMesh.scale.setScalar(0.125);

  sayakaSkeletonMesh = createSkeletonMesh(sayaka);
  sayakaSkeletonMesh.position.set(-400, 250, 0);
  sayakaSkeletonMesh.scale.setScalar(0.125);
  sayakaSkeletonMesh.visible = false;

  groupRef.value?.add(logoSkeletonMesh, sayakaSkeletonMesh);

  await wait(1000);

  sayakaSkeletonMesh.state.addListener({
    start: (entry) => {
      if (entry.animation?.name === "start") {
        setTimeout(() => {
          if (sayakaSkeletonMesh) {
            sayakaSkeletonMesh.visible = true;
          }
        }, 0);
      }
    },
  });
  sayakaSkeletonMesh.state.setAnimation(0, "start");
  sayakaSkeletonMesh.state.addAnimation(0, "idle", true);
};

const onClick = () => {
  emit("start");
};

onLoop(({ delta }) => {
  sayakaSkeletonMesh?.update(delta);
  logoSkeletonMesh?.update(delta);
});

onMounted(() => {
  init();
});
</script>
