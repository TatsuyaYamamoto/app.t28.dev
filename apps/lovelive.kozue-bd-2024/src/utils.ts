import type {
  AnimationState,
  TrackEntry,
} from "@esotericsoftware/spine-threejs";

export const loopBlinkAnim = (state: AnimationState, trackIndex: number) => {
  const stopLoop = () => {
    const currentTrackEntry = state.getCurrent(trackIndex);

    if (currentTrackEntry) {
      // delay 中の animation を消して、再生させない
      state.clearNext(currentTrackEntry);

      // completed listener を消して、次の track を作成させない
      currentTrackEntry.listener = {};

      // セットアップポーズに戻す
      state.setEmptyAnimation(trackIndex);
    }
  };

  const setListener = (entry: TrackEntry) => {
    entry.listener = {
      complete(entry) {
        const delay = Math.random() * 4 + 0.5;
        const nextEntry = state.addAnimation(
          entry.trackIndex,
          "blink",
          false,
          delay,
        );
        setListener(nextEntry);
      },
    };
  };

  const empty = state.setEmptyAnimation(trackIndex);
  setListener(empty);

  return stopLoop;
};
