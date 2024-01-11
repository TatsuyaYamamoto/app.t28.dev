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

// https://github.com/tc39/proposal-promise-with-resolvers
export function promiseWithResolvers<T = void>() {
  let resolve!: (value: T | PromiseLike<T>) => void;
  let reject!: (reason: unknown) => void;
  const promise = new Promise<T>((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });
  return { resolve, reject, promise };
}
