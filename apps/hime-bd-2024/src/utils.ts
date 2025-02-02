import type {
  AnimationState,
  AnimationStateListener,
  Event,
  Skeleton,
  TextureAtlas,
  TrackEntry,
} from "@esotericsoftware/spine-threejs";
import {
  AtlasAttachmentLoader,
  SkeletonJson,
  SkeletonMesh,
} from "@esotericsoftware/spine-threejs";

export function addAnimationStateListener(
  trackEntry: TrackEntry,
  listenerName: "event",
  callback: (entry: TrackEntry, event: Event) => void,
): void;

export function addAnimationStateListener(
  trackEntry: TrackEntry,
  listenerName: Exclude<keyof AnimationStateListener, "event">,
  callback: (entry: TrackEntry) => void,
): void;

export function addAnimationStateListener(
  trackEntry: TrackEntry,
  listenerName: keyof AnimationStateListener,
  callback: (...args: any[]) => void,
) {
  trackEntry.listener ??= {};

  if (listenerName === "event") {
    const registeredCallback = trackEntry.listener[listenerName];
    trackEntry.listener[listenerName] = (entry, event) => {
      registeredCallback?.(entry, event);
      callback(entry, event);
    };
  } else {
    const registeredCallback = trackEntry.listener[listenerName];
    trackEntry.listener[listenerName] = (entry) => {
      registeredCallback?.(entry);
      callback(entry);
    };
  }
}

export const waitAnimationEnd = (trackEntry: TrackEntry): Promise<void> => {
  return new Promise((resolve) => {
    addAnimationStateListener(trackEntry, "complete", () => {
      resolve();
    });
  });
};

export const addAnimationEventListener = (
  trackEntry: TrackEntry,
  eventName: string,
  callback: (event: Event) => void,
) => {
  addAnimationStateListener(trackEntry, "event", (_, event) => {
    if (event.data.name === eventName) {
      callback(event);
    }
  });
};

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

export type StopRandomLoopAnimation = () => void;

export const startRandomLoopAnimation = (
  state: AnimationState,
  animationName: string,
  trackIndex: number,
  getDuration: () => number,
): StopRandomLoopAnimation => {
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
        const nextEntry = state.addAnimation(
          entry.trackIndex,
          animationName,
          false,
          getDuration(),
        );
        setListener(nextEntry);
      },
    };
  };

  const empty = state.setEmptyAnimation(trackIndex);
  setListener(empty);

  return stopLoop;
};

export const createSkeletonMesh = (spine: {
  textureAtlas: TextureAtlas;
  skeleton: unknown;
}) => {
  const atlasLoader = new AtlasAttachmentLoader(spine.textureAtlas);
  const skeletonJson = new SkeletonJson(atlasLoader);
  const skeletonData = skeletonJson.readSkeletonData(spine.skeleton);

  return new SkeletonMesh(skeletonData, (parameters) => {
    parameters.depthWrite = false;
  });
};

export const changeAttachment = (
  skeleton: Skeleton,
  slotName: string,
  attachmentName: string | null,
) => {
  const slot = skeleton.findSlot(slotName);
  if (!slot) {
    throw new Error(`could not find ${slotName} in skeleton`);
  }

  if (attachmentName === null) {
    slot.setAttachment(null);
    return;
  }

  const nextAttachment = skeleton.getAttachmentByName(slotName, attachmentName);
  if (!nextAttachment) {
    throw new Error(`could not find ${attachmentName} in skeleton`);
  }
  slot.setAttachment(nextAttachment);
};
