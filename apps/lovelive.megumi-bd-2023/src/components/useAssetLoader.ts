import { TextureAtlas, ThreeJsTexture } from "@esotericsoftware/spine-threejs";
import { Texture, TextureLoader } from "three";
import { ref } from "vue";

import {
  IMAGE_MANIFEST,
  SPINE_MANIFEST,
  type ImageKey,
} from "../assets/manifest.ts";

const loadImage = (src: string) => {
  const i = new Image();
  return new Promise<HTMLImageElement>((resolve) => {
    i.onload = () => {
      resolve(i);
    };
    i.src = src;
  });
};

const loadTexture = (src: string) => {
  return new Promise<Texture>((resolve) => {
    new TextureLoader().load(src, (texture) => {
      resolve(texture);
    });
  });
};

const textureStore = ref<{ [id: string]: Texture }>();
const spineStore = ref<{
  [id: string]: { textureAtlas: TextureAtlas; skeleton: {} };
}>();

export const useAssetLoader = () => {
  const getTexture = (id: ImageKey) => {
    return textureStore.value?.[id] as unknown as Texture;
  };

  const getSpine = (id: string) => {
    return spineStore.value?.[id] as unknown as {
      textureAtlas: TextureAtlas;
      skeleton: {};
    };
  };

  const load = async () => {
    const [textureEntries, spineEntries] = await Promise.all([
      Promise.all(
        IMAGE_MANIFEST.map(async ({ id, src }) => {
          return [id, await loadTexture(src)];
        }),
      ),
      Promise.all(
        SPINE_MANIFEST.map(async ({ id, sprite, atlas, skeleton }) => {
          const image = await loadImage(sprite);
          const textureAtlas = new TextureAtlas(atlas);
          textureAtlas.pages.forEach((page) => {
            page.setTexture(new ThreeJsTexture(image));
          });

          return [id, { textureAtlas, skeleton }];
        }),
      ),
    ]);

    textureStore.value = Object.fromEntries(textureEntries);
    spineStore.value = Object.fromEntries(spineEntries);
  };

  return { getTexture, getSpine, load };
};
