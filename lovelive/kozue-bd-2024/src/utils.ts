import type {
  AnimationState,
  TrackEntry,
} from "@esotericsoftware/spine-threejs";

export const loopBlinkAnim = (
  state: AnimationState,
  trackIndex: number,
): void => {
  const setCompleteListener = (entry: TrackEntry) => {
    entry.listener = {
      complete() {
        const delay = Math.random() * 4 + 0.5;
        const blinkAnim = state.addAnimation(1, "blink", false, delay);
        setCompleteListener(blinkAnim);
      },
    };
  };

  const empty = state.setEmptyAnimation(trackIndex);
  setCompleteListener(empty);
};
