import { AnimationState, TrackEntry } from "@esotericsoftware/spine-threejs";

export const loopBlinkAnim = (state: AnimationState, trackIndex: number) => {
  const setCompleteListener = (entry: TrackEntry) => {
    entry.listener = {
      complete() {
        const delay = Math.random() * 5 + 0.5;
        const blinkAnim = state.addAnimation(1, "blink", false, delay);
        setCompleteListener(blinkAnim);
      },
    };
  };

  const empty = state.setEmptyAnimation(trackIndex);
  setCompleteListener(empty);
};
