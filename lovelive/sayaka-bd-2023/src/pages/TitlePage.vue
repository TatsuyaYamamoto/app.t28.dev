<template>
  <TresGroup ref="groupRef">
    <TresMesh :position="[0, 0, 0]" @click="onClick">
      <TresPlaneGeometry :args="[1200, 800]" />
      <TresMeshBasicMaterial :map="backTexture" transparent />
    </TresMesh>

    <!-- TresGroup の中で CanvasPortal を定義しないと、unmount 時に tres が止まる -->
    <CanvasPortal v-if="!isStarted">
      <div class="portal-root">
        <div class="announce">TAP TO START</div>
        <div class="credits">
          <span>🎨 <a href="https://twitter.com/xxsanzashixx">さんざし</a></span>
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

import CanvasPortal from "../components/CanvasPortal.vue";
import { useAssetLoader } from "../hooks/useAssetLoader.ts";
import { loopBlinkAnim, promiseWithResolvers } from "../utils.ts";

const emit = defineEmits<{
  (e: "start", animationPromise: Promise<void>): void;
}>();

const { onLoop } = useRenderLoop();
const { getSpine, getTexture } = useAssetLoader();

const groupRef = ref<Group>();
let sayakaSkeletonMesh: SkeletonMesh | null = null;
let logoSkeletonMesh: SkeletonMesh | null = null;
const backTexture = getTexture("back");

const sayaka = getSpine("title_sayaka");
const logo = getSpine("title_logo");

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
  logoSkeletonMesh.position.set(-450, 250, 1);
  logoSkeletonMesh.scale.setScalar(0.125);

  sayakaSkeletonMesh = createSkeletonMesh(sayaka);
  sayakaSkeletonMesh.position.set(-400, 250, 0);
  sayakaSkeletonMesh.scale.setScalar(0.125);
  sayakaSkeletonMesh.visible = false;

  groupRef.value?.add(logoSkeletonMesh, sayakaSkeletonMesh);

  sayakaSkeletonMesh.state.addListener({
    start: (entry) => {
      if (!sayakaSkeletonMesh) {
        return;
      }

      if (entry.animation?.name === SKELETON_CONST.ANIMATION.start_ready) {
        sayakaSkeletonMesh.visible = true;
      }
    },
    complete(entry) {
      if (!sayakaSkeletonMesh) {
        return;
      }

      if (entry.animation?.name === SKELETON_CONST.ANIMATION.start) {
        loopBlinkAnim(sayakaSkeletonMesh.state, 1);
        canStart = true;
      }
    },
  });
  sayakaSkeletonMesh.state.setAnimation(
    0,
    SKELETON_CONST.ANIMATION.start_ready,
    false,
  );
  sayakaSkeletonMesh.state.addAnimation(
    0,
    SKELETON_CONST.ANIMATION.start,
    false,
    0.5,
  );
  sayakaSkeletonMesh.state.addAnimation(0, SKELETON_CONST.ANIMATION.idle, true);
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
        if (sayakaSkeletonMesh) {
          sayakaSkeletonMesh.visible = false;
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
  sayakaSkeletonMesh?.update(delta);
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
  text-shadow: #0077ff 1px 0 10px;
}

.credits {
  position: absolute;
  left: 0.5rem;
  bottom: 0.5rem;

  font-size: 0.5rem;
}
a {
  color: rgb(83, 46, 33);
  text-decoration: none;
}
</style>
