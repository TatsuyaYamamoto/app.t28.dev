import { Box, Button, Flex, Separator } from "@chakra-ui/react";
import { FC, PropsWithChildren, useState } from "react";
import { FaBluesky as BlueskyIcon } from "react-icons/fa6";

import { useAgent } from "@/components/AgentProvider";
import { Avatar } from "@/components/ui/avatar.tsx";
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerRoot,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { BORDER_COLOR } from "@/constants.ts";

const DrawerMenu: FC<PropsWithChildren> = ({ children }) => {
  const { profile, agent } = useAgent();
  const [isLoggingOut, handleIsLoggingOut] = useState(false);

  const onLogout = async () => {
    handleIsLoggingOut(true);
    await agent.logout();
    handleIsLoggingOut(false);
  };

  return (
    <DrawerRoot placement="start">
      <DrawerBackdrop />
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerBody paddingTop={5} paddingX={0}>
          <Flex flexDirection="column" paddingX={5} gap={2}>
            <Box>
              <Avatar
                size="xl"
                borderColor={BORDER_COLOR}
                borderWidth={1}
                src={profile?.avatar}
              />
            </Box>
            <Flex flexDirection="column" gap="2px">
              <Box fontWeight={800} fontSize={18}>
                {/* bluesky の display は空文字の可能性がある*/}
                {profile?.displayName || profile?.handle}
              </Box>
              <Box fontSize={15}>{`@${profile?.handle}`}</Box>
            </Flex>
            <Box fontSize={15}>
              <Box as="span" fontWeight={600}>
                {profile?.followersCount ?? 0}
              </Box>
              {` フォロワー·`}
              <Box as="span" fontWeight={600}>
                {profile?.followsCount ?? 0}
              </Box>
              {` フォロー`}
            </Box>
          </Flex>
          <Separator marginTop={5} marginBottom={2} />
          <Flex>
            <Button
              variant="ghost"
              size="2xl"
              width="full"
              justifyContent="flex-start"
              asChild
            >
              <a href="https://bsky.app">
                <BlueskyIcon />
                Bluesky
              </a>
            </Button>
          </Flex>
        </DrawerBody>
        <DrawerFooter>
          <Button
            variant="outline"
            colorPalette="red"
            onClick={onLogout}
            loading={isLoggingOut}
          >
            サインアウト
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </DrawerRoot>
  );
};

export default DrawerMenu;
