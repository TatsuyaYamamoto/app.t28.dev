import { RichText } from "@atproto/api";
import { Box, Button, Flex, IconButton, Spacer } from "@chakra-ui/react";
import { FC, useMemo, useState } from "react";
import { IoImageOutline } from "react-icons/io5";

import CharProgress from "@/components/PostView/CharProgress.tsx";
import { Gallery } from "@/components/PostView/Gallery.tsx";
import TextEditor from "@/components/PostView/TextEditor.tsx";
import { Avatar } from "@/components/ui/avatar.tsx";
import { BlueskyEmbedImage } from "@/helpers/bluesky.ts";
import { selectLocalImages } from "@/utils.ts";

const borderColor = "rgb(212, 219, 226)";

interface Props {
  onRequestSingOut: () => void;
  onPost: (
    text: string,
    images?: BlueskyEmbedImage[] | undefined,
  ) => Promise<void>;
}
const PostView: FC<Props> = ({ onRequestSingOut, onPost }) => {
  const [text, setText] = useState("");
  const [images, setImages] = useState<{ base64: string; mediaType: string }[]>(
    [],
  );

  const onChangeText = (value: string) => {
    setText(value);
  };

  const graphemeLength = useMemo(
    () => new RichText({ text }).graphemeLength,
    [text],
  );

  const onAddImage = async () => {
    const imageFiles = await selectLocalImages();
    if (!imageFiles) {
      return;
    }

    const imageList = imageFiles.map((file) => {
      return {
        base64: URL.createObjectURL(file),
        mediaType: file.type,
      };
    });

    setImages((prev) => [...prev, ...imageList].slice(0, 4));
  };

  const onRemoveImage = (index: number) => {
    setImages((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]);
  };

  const onClickPost = async () => {
    await onPost(
      text,
      images.map(({ base64, mediaType }) => ({ alt: "", base64, mediaType })),
    );
  };

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
        <Button rounded="full" onClick={onClickPost}>
          投稿
        </Button>
      </Flex>
      <Flex flex={1} direction="column" paddingX={3} paddingBottom={3}>
        <Flex marginTop={1} marginBottom={3}>
          <Avatar size="xl" />
          <Box marginLeft={2} width="100%">
            <TextEditor value={text} onChange={onChangeText} />
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
        <IconButton rounded="full" variant="ghost" onClick={onAddImage}>
          <IoImageOutline />
        </IconButton>
        <Spacer />
        <CharProgress count={graphemeLength} />
      </Flex>
    </Flex>
  );
};

export default PostView;
