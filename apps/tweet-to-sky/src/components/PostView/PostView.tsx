import { Box, Flex, IconButton, Spacer } from "@chakra-ui/react";
import { FC } from "react";
import { IoImageOutline } from "react-icons/io5";

import { useAgent } from "@/components/AgentProvider.tsx";
import CharProgress from "@/components/PostView/CharProgress.tsx";
import { Gallery } from "@/components/PostView/Gallery.tsx";
import TextEditor from "@/components/PostView/TextEditor.tsx";
import { Avatar } from "@/components/ui/avatar.tsx";

import { BORDER_COLOR } from "@/constants.ts";
import { usePostFormContext } from "@/hooks/usePostForm.ts";

export interface PostForm {
  text: string;
  images: {
    alt: string;
    file: File;
    aspectRatio: { width: number; height: number };
    objectUrl: string;
  }[];
}

interface Props {}

const PostView: FC<Props> = ({}) => {
  const { profile } = useAgent();
  const {
    hasMaxImages,
    graphemeLength,
    form: {
      register,
      formState: { isSubmitting },
    },
    imagesField: { fields: images },
    onAddImage,
    onRemoveImage,
  } = usePostFormContext();

  return (
    <>
      <Flex flex={1} direction="column" paddingX={3} paddingBottom={3}>
        <Flex marginTop={1} marginBottom={3}>
          <Avatar
            size="xl"
            src={profile?.avatar}
            borderColor={BORDER_COLOR}
            borderWidth={1}
          />
          <Box marginLeft={2} width="100%">
            <TextEditor {...register("text")} />
          </Box>
        </Flex>
        <Flex data-testid="hogehoge">
          <Gallery images={images} onRemoveImage={onRemoveImage} />
        </Flex>
      </Flex>
      <Flex
        padding="4px 16px 4px 7px"
        alignItems="center"
        borderColor={BORDER_COLOR}
        borderTopWidth={1}
      >
        <IconButton
          rounded="full"
          variant="ghost"
          onClick={onAddImage}
          disabled={hasMaxImages}
          loading={isSubmitting}
        >
          <IoImageOutline />
        </IconButton>
        <Spacer />
        <CharProgress count={graphemeLength} />
      </Flex>
    </>
  );
};

export default PostView;
