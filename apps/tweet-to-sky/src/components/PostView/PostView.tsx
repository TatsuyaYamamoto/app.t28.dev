import { RichText } from "@atproto/api";
import { Box, Button, Flex, IconButton, Spacer } from "@chakra-ui/react";
import { FC, useMemo } from "react";
import { IoImageOutline } from "react-icons/io5";

import CharProgress from "@/components/PostView/CharProgress.tsx";
import { Gallery } from "@/components/PostView/Gallery.tsx";
import TextEditor from "@/components/PostView/TextEditor.tsx";
import { Avatar } from "@/components/ui/avatar.tsx";
import { BlueskyEmbedImage } from "@/helpers/bluesky.ts";
import { arrayBufferToBase64, selectLocalImages } from "@/helpers/utils.ts";
import { useFieldArray, useFormContext } from "react-hook-form";

const borderColor = "rgb(212, 219, 226)";
const MAX_IMAGE_LENGTH = 4;

export interface PostForm {
  text: string;
  images: BlueskyEmbedImage[];
}

interface Props {
  onRequestSingOut: () => void;
  onPost: (formValue: PostForm) => Promise<void>;
}
const PostView: FC<Props> = ({ onRequestSingOut, onPost }) => {
  const {
    register,
    watch,
    handleSubmit,
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
        base64: arrayBufferToBase64(await file.arrayBuffer()),
        mediaType: file.type,
      };
    });
    const addedImages = await Promise.all(addedImagesPromise);

    const current = getValues("images");
    replaceImage([...current, ...addedImages].slice(0, 4));
  };

  const onRemoveImage = (index: number) => {
    removeImage(index);
  };

  const onClickPost = handleSubmit(async (formValue) => {
    await onPost(formValue);
  });

  return (
    <Flex
      direction="column"
      maxWidth={600}
      width="100%"
      height="100%"
      borderColor={borderColor}
      borderLeftWidth={1}
      borderRightWidth={1}
    >
      <Flex height={54} alignItems="center" paddingX={2}>
        <Button onClick={onRequestSingOut}>キャンセル</Button>
        <Spacer />
        <Button rounded="full" onClick={onClickPost} loading={isSubmitting}>
          投稿
        </Button>
      </Flex>
      <Flex flex={1} direction="column" paddingX={3} paddingBottom={3}>
        <Flex marginTop={1} marginBottom={3}>
          <Avatar size="xl" />
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
        borderColor={borderColor}
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
    </Flex>
  );
};

export default PostView;
