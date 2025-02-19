import { BLUESKY_SERVICE } from "@/constants.ts";
import { isTokenExpired } from "@/helpers/utils.ts";
import { AppBskyActorDefs, AtpAgent, AtpSessionData } from "@atproto/api";
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useLocalStorage } from "react-use";

const AgentContext = createContext<{
  agent: AtpAgent | null;
  profile: AppBskyActorDefs.ProfileViewDetailed | null;
  isSessionAvailable: boolean;
}>({
  agent: null,
  profile: null,
  isSessionAvailable: false,
});

export const AgentProvider: FC<PropsWithChildren> = ({ children }) => {
  const [savedSessionData, saveSessionData, removeSessionData] =
    useLocalStorage<AtpSessionData>("bluesky:session");
  const [profile, setProfile] =
    useState<AppBskyActorDefs.ProfileViewDetailed | null>(null);
  const [agent] = useState(
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

            agent.getProfile({ actor: session.handle }).then(({ data }) => {
              setProfile(data);
            });
          } else {
            removeSessionData();
          }
        },
      }),
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

  useEffect(
    () => {
      if (!savedSessionData) {
        return;
      }

      void agent.resumeSession(savedSessionData);
    },
    [
      /* onMount only */
    ],
  );

  const value = useMemo(
    () => ({ agent, profile, isSessionAvailable }),
    [agent, profile, isSessionAvailable],
  );

  return (
    <AgentContext.Provider value={value}>{children}</AgentContext.Provider>
  );
};

export const useAgent = () => {
  const { agent, ...others } = useContext(AgentContext);

  if (!agent) {
    throw new Error("useAgent() must be below <AgentProvider>");
  }

  return { agent, ...others };
};
