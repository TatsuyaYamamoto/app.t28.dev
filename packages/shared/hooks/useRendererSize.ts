import { useWindowSize } from "@vueuse/core";
import { computed, watch, type Ref } from "vue";

type DeepReadonlyRef<Map> = {
  [Key in keyof Map]: Readonly<Ref<Map[Key]>>;
};

type UseRendererSizeReturn = DeepReadonlyRef<{
  layout: "portrait" | "landscape";
  rendererRotate: string;
  rendererWidth: number;
  rendererWidthPx: string;
  rendererHeight: number;
  rendererHeightPx: string;
  windowWidth: number;
  windowHeight: number;
}>;

export const useRendererSize = (
  baseWidth: number,
  baseHeight: number,
): UseRendererSizeReturn => {
  const baseAspectRatio = baseWidth / baseHeight;
  const { width: windowWidth, height: windowHeight } = useWindowSize();

  const windowAspectRatio = computed(() => {
    return windowWidth.value / windowHeight.value;
  });

  const rendererSize = computed(() => {
    // base に対して window が横長の場合、左右に余白を作る landscape で描画する
    if (baseAspectRatio <= windowAspectRatio.value) {
      return {
        layout: "landscape" as const,
        width: windowHeight.value * baseAspectRatio,
        height: windowHeight.value,
      };
    }

    // 上下に余白を作る landscape で描画する場合の height が window の height (portrait で描画する場合の width) より大きい場合、上下に余白を作る landscape で描画する
    const landscapePatternHeight = windowWidth.value / baseAspectRatio;
    const portraitPatternHeight = windowHeight.value / baseAspectRatio;
    if (portraitPatternHeight <= landscapePatternHeight) {
      return {
        layout: "landscape" as const,
        width: windowWidth.value,
        height: landscapePatternHeight,
      };
    }

    // base に対して 縦横反転した window が縦長の場合、大きく描画する layout で描画する
    if (1 / windowAspectRatio.value <= baseAspectRatio) {
      const landscapePatternHeight = windowWidth.value / baseAspectRatio;
      const portraitPatternHeight = windowHeight.value / baseAspectRatio;

      if (portraitPatternHeight <= landscapePatternHeight) {
        return {
          layout: "landscape" as const,
          width: windowWidth.value,
          height: landscapePatternHeight,
        };
      }

      return {
        layout: "portrait" as const,
        width: windowHeight.value,
        height: portraitPatternHeight,
      };
    }

    // それ以外は、左右に余白を作る portrait で描画する
    return {
      layout: "portrait" as const,
      width: windowWidth.value * baseAspectRatio,
      height: windowWidth.value,
    };
  });

  const rendererRotate = computed(() => {
    return rendererSize.value.layout === "landscape" ? "0deg" : "90deg";
  });

  watch(
    [rendererSize],
    ([{ layout, width, height }]) => {
      const coefficient = 0.04;
      const aspectRatio = width / height;
      const fontSize =
        layout === "landscape"
          ? width * coefficient
          : height * coefficient * aspectRatio;
      document.documentElement.style.fontSize = `${fontSize}px`;
    },
    { immediate: true },
  );

  return {
    layout: computed(() => rendererSize.value.layout),
    rendererRotate,
    rendererWidth: computed(() => rendererSize.value.width),
    rendererWidthPx: computed(() => `${rendererSize.value.width}px`),
    rendererHeight: computed(() => rendererSize.value.height),
    rendererHeightPx: computed(() => `${rendererSize.value.height}px`),
    windowWidth,
    windowHeight,
  };
};
