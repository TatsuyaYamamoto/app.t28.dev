import { RichText } from "@atproto/api";
import { Box, Flex, IconButton, Spacer } from "@chakra-ui/react";
import { FC, useMemo } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { IoImageOutline } from "react-icons/io5";

import { useAgent } from "@/components/AgentProvider.tsx";
import CharProgress from "@/components/PostView/CharProgress.tsx";
import { Gallery } from "@/components/PostView/Gallery.tsx";
import TextEditor from "@/components/PostView/TextEditor.tsx";
import { Avatar } from "@/components/ui/avatar.tsx";
import { getImageFileAspectRatio, selectLocalImages } from "@/helpers/utils.ts";

import { BORDER_COLOR } from "@/constants.ts";

const MAX_IMAGE_LENGTH = 4;

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
    register,
    watch,
    getValues,
    control,
    formState: { isSubmitting },
  } = useFormContext<PostForm>();
  const {
    fields: images,
    replace: replaceImage,
    remove: removeImage,
  } = useFieldArray({
    control,
    name: "images",
  });

  const textValue = watch("text");
  const hasMaxImages = MAX_IMAGE_LENGTH <= images.length;
  const graphemeLength = useMemo(
    () => new RichText({ text: textValue }).graphemeLength,
    [textValue],
  );

  const onAddImage = async () => {
    const addedImageFiles = await selectLocalImages();
    if (!addedImageFiles) {
      return;
    }

    const addedImagesPromise = addedImageFiles.map(async (file) => {
      return {
        alt: "", // TODO
        file,
        aspectRatio: await getImageFileAspectRatio(file),
        objectUrl: URL.createObjectURL(file),
      };
    });
    const addedImages = await Promise.all(addedImagesPromise);

    const current = getValues("images");
    replaceImage([...current, ...addedImages].slice(0, 4));
  };

  const onRemoveImage = (index: number) => {
    const target = getValues("images")[index];
    URL.revokeObjectURL(target.objectUrl);
    removeImage(index);
  };

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
