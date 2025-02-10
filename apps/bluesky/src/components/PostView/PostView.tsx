import { Box, Button, Flex, IconButton, Spacer } from "@chakra-ui/react";
import { FC } from "react";
import { IoImageOutline } from "react-icons/io5";

import CharProgress from "@/components/PostView/CharProgress.tsx";
import TextEditor from "@/components/PostView/TextEditor.tsx";
import { Avatar } from "@/components/ui/avatar.tsx";

const borderColor = "rgb(197, 207, 217)";

const PostView: FC = () => {
  return (
    <Flex direction="column" maxWidth={600} width="100%" height="100%">
      <Flex height={54} alignItems="center" paddingX={2}>
        <Button>キャンセル</Button>
        <Spacer />
        <Button rounded="full">投稿</Button>
      </Flex>
      <Flex flex={1} marginX={3} marginTop={1} marginBottom={3}>
        <Avatar size="xl" />
        <Box marginLeft={2} width="100%">
          <TextEditor />
        </Box>
      </Flex>
      <Flex
        padding="4px 16px 4px 7px"
        alignItems="center"
        borderColor={borderColor}
        borderTopWidth={1}
      >
        <IconButton rounded="full" variant="ghost">
          <IoImageOutline />
        </IconButton>
        <Spacer />
        <CharProgress count={25} max={100} />
      </Flex>
    </Flex>
  );
};

export default PostView;
