"use client";

import {
  Button,
  Toaster as ChakraToaster,
  HStack,
  Portal,
  Stack,
  Toast,
  createToaster,
} from "@chakra-ui/react";
import { FaCheck as CheckIcon } from "react-icons/fa6";

export const toaster = createToaster({
  placement: "bottom",
  duration: 100000,
  pauseOnPageIdle: true,
  offsets: `calc(49px + var(--gap))`,
});

export const Toaster = () => {
  return (
    <Portal>
      <ChakraToaster toaster={toaster} insetInline={{ mdDown: "4" }}>
        {(toast) => (
          <Toast.Root width={{ sm: "sm" }} flexDirection="column">
            <HStack>
              <CheckIcon />
              <Stack flex="1">
                <Toast.Title>投稿を公開しました</Toast.Title>
              </Stack>
            </HStack>
            <Button
              width="100%"
              size="sm"
              asChild
              disabled={!toast.meta?.postHtmlUrl}
            >
              <a target="_blank" href={toast.meta?.postHtmlUrl}>
                {"Bluesky で表示する"}
              </a>
            </Button>
            <Toast.CloseTrigger />
          </Toast.Root>
        )}
      </ChakraToaster>
    </Portal>
  );
};
