<template>
  <TresGroup ref="rootGroupRef">
    <!--  フィールド    -->
    <TresGroup>
      <template v-for="(tiles, i) in RENDERING_FIELD_TILE_BLOCKS">
        <template v-for="(_tile, j) in tiles">
          <TresMesh
            :position="[
              FIELD_TILE_WIDTH * i - RENDERING_FIELD_POSITION_OFFSETS.x,
              FIELD_TILE_HEIGHT * j - RENDERING_FIELD_POSITION_OFFSETS.y,
              0,
            ]"
          >
            <TresPlaneGeometry :args="[FIELD_TILE_WIDTH, FIELD_TILE_HEIGHT]" />
            <TresMeshBasicMaterial :map="textures.fieldGrass" transparent />
          </TresMesh>
        </template>
      </template>
    </TresGroup>

    <!--  ターゲット -->
    <template v-for="target in targets">
      <TresMesh
        :position="[
          target.position.x,
          target.position.y + target.item.size.y / 2,
          0,
        ]"
      >
        <TresPlaneGeometry :args="[target.item.size.x, target.item.size.y]" />
        <TresMeshBasicMaterial :map="target.item.texture" transparent />
      </TresMesh>
    </template>

    <!-- フィールドマップ -->
    <TresGroup :position="fieldMapPosition">
      <TresMesh>
        <TresPlaneGeometry :args="[FIELD_MAP_SIZE.x, FIELD_MAP_SIZE.y]" />
        <!-- @vue-expect-error -->
        <TresMeshBasicMaterial color="white" />
      </TresMesh>
      <TresMesh :position="fieldMapPinPosition">
        <TresSphereGeometry :args="[2, 32, 32]" />
        <!-- @vue-expect-error -->
        <TresMeshBasicMaterial color="red" />
      </TresMesh>
    </TresGroup>

    <!-- TresGroup の中で CanvasPortal を定義しないと、unmount 時に tres が止まる -->
    <CanvasPortal>
      <div class="keyboard-area">
        <Keyboard />
      </div>
      <div class="notification-area">
        <FieldBorderNotification v-model="shouldOpenFieldBorderNotification" />
      </div>
    </CanvasPortal>
  </TresGroup>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, shallowRef, triggerRef, watch } from "vue";
import { useRenderLoop, useTresContext } from "@tresjs/core";

import {
  AtlasAttachmentLoader,
  SkeletonJson,
  SkeletonMesh,
} from "@esotericsoftware/spine-threejs";
import type { Group, Texture } from "three";

import CanvasPortal from "../components/CanvasPortal.vue";
import { useAssetLoader } from "../components/useAssetLoader.ts";
import Keyboard from "../components/Keyboard.vue";
import FieldBorderNotification from "../components/FieldBorderNotification.vue";
import { useController } from "../components/useController.ts";

const gameResultModel = defineModel<
  "kaho" | "kozue" | "sayaka" | "megumi" | "rurino" | null
>("gameResult", { required: true });

const { camera } = useTresContext();
const { onLoop } = useRenderLoop();
const { getTexture, getSpine } = useAssetLoader();
const { up, left, down, right } = useController();

const rootGroupRef = ref<Group>();
let tsuzuriSkeletonMesh: SkeletonMesh | null = null;
const tsuzuriSpine = getSpine("tsuzuri");
const textures = {
  fieldGrass: getTexture("field_grass"),
  kaho: getTexture("target_kaho"),
  kahoItem: getTexture("target_kaho_item"),
  kozue: getTexture("target_kozue"),
  kozueItem: getTexture("target_kozue_item"),
  sayaka: getTexture("target_sayaka"),
  sayakaItem: getTexture("target_sayaka_item"),
  megumi: getTexture("target_megumi"),
  megumiItem: getTexture("target_megumi_item"),
  rurino: getTexture("target_rurino"),
  rurinoItem: getTexture("target_rurino_item"),
};
const animations = {
  idle: "idle",
  walk_L: "walk_L",
};

const WALK_VELOCITY = 300;

const TSUZURI_SKELETON_SCALE = 0.08;
const FIELD_TILE_WIDTH = 350;
const FIELD_TILE_HEIGHT = 350;
const RENDERING_FIELD_TILE_BLOCKS = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
] as const;
const RENDERING_FIELD_WIDTH =
  FIELD_TILE_WIDTH * RENDERING_FIELD_TILE_BLOCKS[0].length;
const RENDERING_FIELD_HEIGHT =
  FIELD_TILE_HEIGHT * RENDERING_FIELD_TILE_BLOCKS.length;
const RENDERING_FIELD_POSITION_OFFSETS = {
  // field 全体の半分から tile 幅半分を引く (tile は中心を原点に描画されるから)
  x: RENDERING_FIELD_WIDTH / 2 - FIELD_TILE_WIDTH / 2,
  y: RENDERING_FIELD_HEIGHT / 2 - FIELD_TILE_HEIGHT / 2,
};

const CONTROLLABLE_FIELD_WIDTH = FIELD_TILE_WIDTH * 7;
const CONTROLLABLE_FIELD_HEIGHT = FIELD_TILE_HEIGHT * 7;
const CHARA_POSITION_RANGE = {
  x: {
    min: (-1 * CONTROLLABLE_FIELD_WIDTH) / 2,
    max: CONTROLLABLE_FIELD_WIDTH / 2,
  },
  y: {
    min: (-1 * CONTROLLABLE_FIELD_HEIGHT) / 2,
    max: CONTROLLABLE_FIELD_HEIGHT / 2,
  },
} as const;
const FIELD_MAP_SIZE = {
  x: 100,
  y: 100,
};
const TARGET_COLLISION_AREA_RADIUS = 100;

const isPlayerControllable = computed(() => !gameResultModel.value);
const shouldOpenFieldBorderNotification = ref(false);
const targets = shallowRef<
  {
    name: "kaho" | "kozue" | "sayaka" | "megumi" | "rurino";
    position: { x: number; y: number };
    item: {
      size: { x: number; y: number };
      texture: Texture;
    };
    isFound: boolean;
  }[]
>([
  {
    name: "kaho",
    position: { x: 200, y: 0 },
    item: {
      size: { x: 377 * 0.2, y: 600 * 0.2 },
      texture: textures.kahoItem,
    },
    isFound: false,
  },
  {
    name: "kozue",
    position: { x: 500, y: 500 },
    item: {
      size: { x: 799 * 0.2, y: 600 * 0.2 },
      texture: textures.kozueItem,
    },
    isFound: false,
  },
  {
    name: "sayaka",
    position: { x: -500, y: -500 },
    item: {
      size: { x: 759 * 0.2, y: 422 * 0.2 },
      texture: textures.sayakaItem,
    },
    isFound: false,
  },
  {
    name: "megumi",
    position: { x: 300, y: -700 },
    item: {
      size: { x: 659 * 0.2, y: 600 * 0.2 },
      texture: textures.megumiItem,
    },
    isFound: false,
  },
  {
    name: "rurino",
    position: { x: -600, y: -600 },
    item: {
      size: { x: 870 * 0.2, y: 600 * 0.2 },
      texture: textures.rurinoItem,
    },
    isFound: false,
  },
]);

const tsuzuriMotionState = computed<"idle" | "walk_L" | "walk_R">((prev) => {
  if (!isPlayerControllable.value) {
    return "idle";
  }

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
  if (!isPlayerControllable.value) {
    return { x: 0, y: 0 };
  }

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
const fieldMapPosition = computed<[number, number, number]>(() => {
  return [charaPosition.value[0] - 400, charaPosition.value[1] + 200, 1];
});
const fieldMapPinPosition = computed<[number, number, number]>(() => {
  return [
    charaPosition.value[0] * (FIELD_MAP_SIZE.x / CONTROLLABLE_FIELD_WIDTH),
    charaPosition.value[1] * (FIELD_MAP_SIZE.y / CONTROLLABLE_FIELD_HEIGHT),
    0,
  ];
});

const calcDistance = (
  a: { x: number; y: number },
  b: { x: number; y: number },
) => {
  return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
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
  tsuzuriSkeletonMesh = createSkeletonMesh(tsuzuriSpine);
  tsuzuriSkeletonMesh.position.set(0, 0, 1);
  tsuzuriSkeletonMesh.scale.setScalar(TSUZURI_SKELETON_SCALE);

  tsuzuriSkeletonMesh.state.setAnimation(0, animations.idle, true);
  rootGroupRef.value?.add(tsuzuriSkeletonMesh);
};

onLoop(({ delta }) => {
  tsuzuriSkeletonMesh?.update(delta);

  let newCharaPositionX = charaPosition.value[0] + velocity.value.x * delta;
  let newCharaPositionY = charaPosition.value[1] + velocity.value.y * delta;

  if (newCharaPositionX < CHARA_POSITION_RANGE.x.min) {
    newCharaPositionX = CHARA_POSITION_RANGE.x.min;
    shouldOpenFieldBorderNotification.value = true;
  }
  if (CHARA_POSITION_RANGE.x.max < newCharaPositionX) {
    newCharaPositionX = CHARA_POSITION_RANGE.x.max;
    shouldOpenFieldBorderNotification.value = true;
  }
  if (newCharaPositionY < CHARA_POSITION_RANGE.y.min) {
    newCharaPositionY = CHARA_POSITION_RANGE.y.min;
    shouldOpenFieldBorderNotification.value = true;
  }
  if (CHARA_POSITION_RANGE.y.max < newCharaPositionY) {
    newCharaPositionY = CHARA_POSITION_RANGE.y.max;
    shouldOpenFieldBorderNotification.value = true;
  }

  tsuzuriSkeletonMesh?.position.setX(newCharaPositionX);
  tsuzuriSkeletonMesh?.position.setY(newCharaPositionY);
  camera.value?.position.setX(newCharaPositionX);
  camera.value?.position.setY(newCharaPositionY);

  charaPosition.value = [newCharaPositionX, newCharaPositionY, 0];

  if (!gameResultModel.value) {
    for (const item of targets.value) {
      if (item.isFound) {
        continue;
      }

      const distance = calcDistance(
        { x: newCharaPositionX, y: newCharaPositionY },
        item.position,
      );

      if (distance < TARGET_COLLISION_AREA_RADIUS) {
        gameResultModel.value = item.name;
        item.isFound = true;
        triggerRef(targets);
        break;
      }
    }
  }
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

.notification-area {
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
}
</style>
