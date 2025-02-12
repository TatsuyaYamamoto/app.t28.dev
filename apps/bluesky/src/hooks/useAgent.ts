import { AtpAgent, AtpSessionData } from "@atproto/api";
import { useCallback, useMemo, useState } from "react";
import { useLocalStorage } from "react-use";

import { BLUESKY_SERVICE } from "@/constants.ts";
import { isTokenExpired } from "@/utils.ts";

export const useAgent = () => {
  const [savedSessionData, saveSessionData, removeSessionData] =
    useLocalStorage<AtpSessionData | null>("bluesky:session", null);

  const [blueSkyAgent] = useState(
    () =>
      new AtpAgent({
        service: BLUESKY_SERVICE,
        persistSession: () => {},
      }),
  );

  const login = useCallback(async (identifier: string, password: string) => {
    await blueSkyAgent.login({ identifier, password });

    const newSession = blueSkyAgent.session;
    if (!newSession) {
      throw new Error(
        "unexpected behavior. signed-in agent has no session data",
      );
    }
    saveSessionData(newSession);
  }, []);

  const tryResumeSession = useCallback(async () => {
    if (!savedSessionData) {
      return;
    }

    await blueSkyAgent.resumeSession(savedSessionData);

    const newSession = blueSkyAgent.session;
    if (!newSession) {
      throw new Error(
        "unexpected behavior. signed-in agent has no session data",
      );
    }
    saveSessionData(newSession);
  }, []);

  const logout = useCallback(async () => {
    removeSessionData();
    await blueSkyAgent.logout();
  }, [removeSessionData, blueSkyAgent]);

  const post = useCallback(async () => {}, []);

  const isSessionAvailable = useMemo(() => {
    if (!savedSessionData) {
      return false;
    }

    if (isTokenExpired(savedSessionData.accessJwt)) {
      return false;
    }

    if (isTokenExpired(savedSessionData.accessJwt)) {
      return false;
    }

    return true;
  }, [savedSessionData]);

  return {
    login,
    logout,
    tryResumeSession,
    post,
    isSessionAvailable,
    // profile,
    // profileUrl,
    // checkIsSessionAvailable,
  };
};
