import { AtpAgent, AtpSessionData, AtUri } from "@atproto/api";
import { useCallback, useMemo, useState } from "react";
import { useLocalStorage } from "react-use";

import { BLUESKY_SERVICE } from "@/constants.ts";
import { BlueskyEmbedImage, postToBluesky } from "@/helpers/bluesky.ts";
import { isTokenExpired } from "@/helpers/utils.ts";

export const useAgent = () => {
  const [savedSessionData, saveSessionData, removeSessionData] =
    useLocalStorage<AtpSessionData>("bluesky:session");

  const [blueSkyAgent] = useState(
    () =>
      new AtpAgent({
        service: BLUESKY_SERVICE,
        persistSession: (evt, session) => {
          console.log("[AtpAgent:persistSession]", evt);

          // No need to save or delete a session data due to `network-error`.
          if (evt === "network-error") {
            return;
          }

          // replace with new access/refresh token.
          // refresh token stored in bluesky's backend is rotated after using once.
          // bluesky's `token rotation` is to update refresh token's validity period (expiresAt) to grace period (2 hours) and delete expired refresh token.
          // https://github.com/bluesky-social/atproto/blob/%40atproto/pds%400.4.3/packages/pds/src/account-manager/index.ts#L177
          if (session) {
            saveSessionData(session);
          } else {
            removeSessionData();
          }
        },
      }),
  );

  const login = useCallback(
    async (identifier: string, password: string) => {
      return blueSkyAgent.login({ identifier, password });
    },
    [blueSkyAgent],
  );

  const tryResumeSession = useCallback(async () => {
    if (!savedSessionData) {
      return;
    }

    return blueSkyAgent.resumeSession(savedSessionData);
  }, [savedSessionData, blueSkyAgent]);

  const logout = useCallback(async () => {
    await blueSkyAgent.logout();
  }, [blueSkyAgent]);

  const post = useCallback(
    async (text: string, images?: BlueskyEmbedImage[] | undefined) => {
      const res = await postToBluesky(blueSkyAgent, text, images);
      const atUri = new AtUri(res.uri);

      return {
        ...res,
        htmlUrl: `https://bsky.app/profile/${blueSkyAgent.session?.handle}/post/${atUri.rkey}`,
      };
    },
    [blueSkyAgent],
  );

  const isSessionAvailable = useMemo(() => {
    if (!savedSessionData) {
      return false;
    }

    if (!isTokenExpired(savedSessionData.accessJwt)) {
      return true;
    }

    if (!isTokenExpired(savedSessionData.refreshJwt)) {
      return true;
    }

    return false;
  }, [savedSessionData]);

  return {
    login,
    logout,
    tryResumeSession,
    post,
    isSessionAvailable,
  };
};
