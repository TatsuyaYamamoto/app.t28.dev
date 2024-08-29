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
import CanvasPortal from "shared/components/CanvasPortal.vue";

import { useAssetLoader } from "../hooks/useAssetLoader.ts";
import { loopBlinkAnim } from "../utils.ts";

const emit = defineEmits<{
  (e: "start", animationPromise: Promise<void>): void;
}>();

const { onLoop } = useRenderLoop();
const { getSpine, getTexture } = useAssetLoader();

const groupRef = ref<Group>();
let kozueSkeletonMesh: SkeletonMesh | null = null;
let logoSkeletonMesh: SkeletonMesh | null = null;
const backTexture = getTexture("back");

const kozue = getSpine("title_kozue");
const logo = getSpine("title_logo");

const shouldShowStartAnnounce = ref(false);
const isStarted = ref(false);
let canStart = false;

const SKELETON_CONST = {
  ANIMATION: {
    idle: "idle",
    start: "start",
    start_ready: "start_ready",
    titleToGame: "title_to_game",
  },
  EVENT: {
    readyToShowGame: "ready_to_show_game",
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

  kozueSkeletonMesh = createSkeletonMesh(kozue);
  kozueSkeletonMesh.position.set(20, -20, 0);
  kozueSkeletonMesh.scale.setScalar(0.125);
  kozueSkeletonMesh.visible = false;

  groupRef.value?.add(logoSkeletonMesh, kozueSkeletonMesh);

  kozueSkeletonMesh.state.addListener({
    start: (entry) => {
      if (!kozueSkeletonMesh) {
        return;
      }

      if (entry.animation?.name === SKELETON_CONST.ANIMATION.start) {
        kozueSkeletonMesh.visible = true;
      }
    },
    complete(entry) {
      if (!kozueSkeletonMesh) {
        return;
      }

      if (entry.animation?.name === SKELETON_CONST.ANIMATION.start) {
        canStart = true;
        shouldShowStartAnnounce.value = true;
      }
    },
  });
  const track = 0;
  kozueSkeletonMesh.state.setEmptyAnimation(track, 0);
  kozueSkeletonMesh.state.addAnimation(
    track,
    SKELETON_CONST.ANIMATION.start,
    false,
    0,
  );
  const idleEntry = kozueSkeletonMesh.state.addAnimation(
    track,
    SKELETON_CONST.ANIMATION.idle,
    true,
    0,
  );
  idleEntry.mixDuration = 1;

  loopBlinkAnim(kozueSkeletonMesh.state, 1);
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
        if (kozueSkeletonMesh) {
          kozueSkeletonMesh.visible = false;
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
  kozueSkeletonMesh?.update(delta);
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
