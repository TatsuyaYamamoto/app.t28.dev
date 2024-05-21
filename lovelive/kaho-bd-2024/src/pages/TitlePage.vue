<template>
  <TresGroup ref="groupRef">
    <TresMesh :position="[0, 0, -1]" @click="onClick">
      <TresPlaneGeometry :args="[1200, 800]" />
      <TresMeshBasicMaterial :map="backTexture" transparent />
    </TresMesh>

    <!-- TresGroup の中で CanvasPortal を定義しないと、unmount 時に tres が止まる -->
    <CanvasPortal v-if="!isStarted">
      <div class="portal-root">
        <div class="announce" v-if="shouldShowStartAnnounce">TAP TO START</div>
        <div class="credits">
          <span>
            🎨 <a href="https://twitter.com/xxsanzashixx">さんざし</a>
          </span>
          <span>💻 <a href="https://twitter.com/T28_tatsuya">T28</a></span>
        </div>
      </div>
    </CanvasPortal>
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

import { promiseWithResolvers } from "shared/helpers/utils";

import CanvasPortal from "../components/CanvasPortal.vue";
import { useAssetLoader } from "../hooks/useAssetLoader.ts";
import { loopBlinkAnim } from "../utils.ts";

const emit = defineEmits<{
  (e: "start", animationPromise: Promise<void>): void;
}>();

const { onLoop } = useRenderLoop();
const { getSpine, getTexture } = useAssetLoader();

const groupRef = ref<Group>();
let kahoSkeletonMesh: SkeletonMesh | null = null;
let logoSkeletonMesh: SkeletonMesh | null = null;
const backTexture = getTexture("back");

const kaho = getSpine("title_kaho");
const logo = getSpine("title_logo");

const shouldShowStartAnnounce = ref(false);
const isStarted = ref(false);
let canStart = false;

const SKELETON_CONST = {
  ANIMATION: {
    idle: "idle",
    start: "start",
    start_ready: "start_ready",
    titleToGame: "titleToGame",
  },
  EVENT: {
    readyToShowGame: "readyToShowGame",
  },
};

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
  logoSkeletonMesh.position.set(-10, 0, 2);
  logoSkeletonMesh.scale.setScalar(0.125);

  kahoSkeletonMesh = createSkeletonMesh(kaho);
  kahoSkeletonMesh.position.set(20, -20, 0);
  kahoSkeletonMesh.scale.setScalar(0.125);
  kahoSkeletonMesh.visible = false;

  groupRef.value?.add(logoSkeletonMesh, kahoSkeletonMesh);

  kahoSkeletonMesh.state.data.setMix(
    SKELETON_CONST.ANIMATION.start,
    SKELETON_CONST.ANIMATION.idle,
    0.5,
  );
  kahoSkeletonMesh.state.addListener({
    start: (entry) => {
      if (!kahoSkeletonMesh) {
        return;
      }

      if (entry.animation?.name === SKELETON_CONST.ANIMATION.start_ready) {
        kahoSkeletonMesh.visible = true;
      }
    },
    complete(entry) {
      if (!kahoSkeletonMesh) {
        return;
      }

      if (entry.animation?.name === SKELETON_CONST.ANIMATION.start) {
        loopBlinkAnim(kahoSkeletonMesh.state, 1);
        canStart = true;
        shouldShowStartAnnounce.value = true;
      }
    },
  });
  kahoSkeletonMesh.state.setAnimation(
    0,
    SKELETON_CONST.ANIMATION.start_ready,
    false,
  );
  kahoSkeletonMesh.state.addAnimation(
    0,
    SKELETON_CONST.ANIMATION.start,
    false,
    0.5,
  );
  kahoSkeletonMesh.state.addAnimation(0, SKELETON_CONST.ANIMATION.idle, true);
};

const onClick = () => {
  if (!logoSkeletonMesh) {
    return;
  }

  if (isStarted.value) {
    return;
  }

  if (!canStart) {
    return;
  }

  const logoAnim = logoSkeletonMesh.state.setAnimation(
    0,
    SKELETON_CONST.ANIMATION.titleToGame,
  );
  isStarted.value = true;

  const { promise, resolve } = promiseWithResolvers();

  logoAnim.listener = {
    event(_, event) {
      if (event.data.name === SKELETON_CONST.EVENT.readyToShowGame) {
        if (kahoSkeletonMesh) {
          kahoSkeletonMesh.visible = false;
        }
        emit("start", promise);
      }
    },
    complete() {
      resolve();
    },
  };
};

onLoop(({ delta }) => {
  kahoSkeletonMesh?.update(delta);
  logoSkeletonMesh?.update(delta);
});

onMounted(() => {
  init();
});
</script>

<style scoped>
.portal-root {
  position: relative;
  height: 100%;
}

.announce {
  position: absolute;
  width: 100%;

  display: flex;
  justify-content: center;
  bottom: 0.3rem;

  color: #ffffff;
  text-shadow: #ffc400 1px 0 10px;
}

.credits {
  position: absolute;
  left: 0.5rem;
  bottom: 0.6rem;

  font-size: 0.5rem;
}
a {
  color: rgb(83, 46, 33);
  text-decoration: none;
}
</style>
