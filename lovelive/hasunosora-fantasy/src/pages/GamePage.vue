<template>
  <TresGroup ref="rootGroupRef">
    <TresGroup :position="charaPosition">
      <!--  フィールド    -->
      <template v-for="(tiles, i) in FIELD_TILE_BLOCKS">
        <template v-for="(_tile, j) in tiles">
          <TresMesh
            :position="[FIELD_TILE_WIDTH * i, FIELD_TILE_HEIGHT * j, 0]"
          >
            <TresPlaneGeometry :args="[FIELD_TILE_WIDTH, FIELD_TILE_HEIGHT]" />
            <TresMeshBasicMaterial :map="textures.fieldGrass" transparent />
          </TresMesh>
        </template>
      </template>

      <!--  ターゲット -->
      <template v-for="item in TARGET_ITEMS">
        <TresMesh :position="[item.position.x, item.position.y, 0]">
          <TresPlaneGeometry :args="[item.size.x, item.size.y]" />
          <TresMeshBasicMaterial :map="item.texture" transparent />
        </TresMesh>
      </template>
    </TresGroup>

    <!-- TresGroup の中で CanvasPortal を定義しないと、unmount 時に tres が止まる -->
    <CanvasPortal>
      <div class="keyboard-area">
        <Keyboard />
      </div>
    </CanvasPortal>
  </TresGroup>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, shallowRef, watch } from "vue";
import { useRenderLoop } from "@tresjs/core";
import { useMagicKeys } from "@vueuse/core";

import {
  AtlasAttachmentLoader,
  SkeletonJson,
  SkeletonMesh,
} from "@esotericsoftware/spine-threejs";
import type { Group } from "three";

import CanvasPortal from "../components/CanvasPortal.vue";
import { useAssetLoader } from "../components/useAssetLoader.ts";
import Keyboard from "../components/Keyboard.vue";

const emit = defineEmits<{
  (e: "finish"): void;
}>();

const { onLoop } = useRenderLoop();
const { getTexture, getSpine } = useAssetLoader();
const { w: up, a: left, s: down, d: right } = useMagicKeys();

const rootGroupRef = ref<Group>();
let tsuzuriSkeletonMesh: SkeletonMesh | null = null;
const tsuzuriSpine = getSpine("tsuzuri");
const textures = {
  fieldGrass: getTexture("field_grass"),
  kaho: getTexture("target_kaho"),
  sayaka: getTexture("target_sayaka"),
};
const animations = {
  idle: "idle",
  walk_L: "walk_L",
};

const WALK_VELOCITY = 300;

const TSUZURI_SKELETON_SCALE = 0.05;
const FIELD_TILE_WIDTH = 350;
const FIELD_TILE_HEIGHT = 350;
const FIELD_TILE_BLOCKS = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
] as const;
const TARGET_ITEMS = [
  {
    position: { x: 100, y: 100 },
    size: { x: 300 * 0.2, y: 352 * 0.2 },
    texture: textures.kaho,
  },
  {
    position: { x: 300, y: 300 },
    size: { x: 50, y: 50 },
    texture: textures.sayaka,
  },
];
const fieldWidth = FIELD_TILE_WIDTH * FIELD_TILE_BLOCKS[0].length;
const fieldHeight = FIELD_TILE_HEIGHT * FIELD_TILE_BLOCKS.length;

const tsuzuriMotionState = computed<"idle" | "walk_L" | "walk_R">((prev) => {
  if (right.value) {
    return "walk_L";
  }

  if (left.value) {
    return "walk_R";
  }

  if (up.value || down.value) {
    if (prev === "walk_L" || prev === "walk_R") {
      return prev;
    }
    return "walk_L";
  }

  return "idle";
});

watch(tsuzuriMotionState, (current) => {
  if (!tsuzuriSkeletonMesh) {
    return;
  }

  if (current === "walk_R") {
    tsuzuriSkeletonMesh.scale.setX(-1 * TSUZURI_SKELETON_SCALE);
  }
  if (current === "walk_L") {
    tsuzuriSkeletonMesh.scale.setX(TSUZURI_SKELETON_SCALE);
  }

  const animationName = current === "walk_R" ? "walk_L" : current;
  tsuzuriSkeletonMesh.state.setAnimation(0, animationName, true);
});

const velocity = computed(() => {
  let x = 0;
  let y = 0;
  if (up.value) {
    y += 1;
  }
  if (down.value) {
    y -= 1;
  }
  if (right.value) {
    x += 1;
  }
  if (left.value) {
    x -= 1;
  }
  if (x === 0 && y === 0) {
    return { x: 0, y: 0 };
  }

  const radians = Math.atan2(y, x);

  return {
    x: WALK_VELOCITY * Number(Math.cos(radians).toFixed(5)),
    y: WALK_VELOCITY * Number(Math.sin(radians).toFixed(5)),
  };
});

const charaPosition = shallowRef<[number, number, number]>([0, 0, 0]);

const createSkeletonMesh = (spine: ReturnType<typeof getSpine>) => {
  const atlasLoader = new AtlasAttachmentLoader(spine.textureAtlas);
  const skeletonJson = new SkeletonJson(atlasLoader);
  const skeletonData = skeletonJson.readSkeletonData(spine.skeleton);

  return new SkeletonMesh(skeletonData, (parameters) => {
    parameters.depthWrite = false;
  });
};

const init = async () => {
  tsuzuriSkeletonMesh = createSkeletonMesh(tsuzuriSpine);
  tsuzuriSkeletonMesh.position.set(0, 0, 1);
  tsuzuriSkeletonMesh.scale.setScalar(TSUZURI_SKELETON_SCALE);

  tsuzuriSkeletonMesh.state.setAnimation(0, animations.idle, true);
  rootGroupRef.value?.add(tsuzuriSkeletonMesh);
};

onLoop(({ delta }) => {
  tsuzuriSkeletonMesh?.update(delta);

  charaPosition.value = [
    charaPosition.value[0] - velocity.value.x * delta,
    charaPosition.value[1] - velocity.value.y * delta,
    charaPosition.value[2],
  ];
});

onMounted(() => {
  init();
});
</script>

<style scoped>
.keyboard-area {
  position: absolute;

  left: 0.5rem;
  bottom: 0.5rem;
}
</style>
