import DrawerMenu from "@/components/DrawerMenu.tsx";
import { PostForm } from "@/components/PostView/PostView.tsx";
import { usePostFormContext } from "@/hooks/usePostForm.ts";
import { Button, Flex, IconButton, Spacer } from "@chakra-ui/react";
import { FC } from "react";
import { SlMenu as HamburgerIcon } from "react-icons/sl";

interface Props {
  onPost: (formValue: PostForm) => Promise<void>;
}

const Header: FC<Props> = ({ onPost }) => {
  const {
    form: {
      handleSubmit,
      formState: { isSubmitting },
    },
    isFormValid,
  } = usePostFormContext();

  const onClickPost = handleSubmit(async (formValue) => {
    await onPost(formValue);
  });

  return (
    <Flex height={54} alignItems="center" paddingX={2}>
      <DrawerMenu>
        <IconButton variant="ghost">
          <HamburgerIcon />
        </IconButton>
      </DrawerMenu>
      <Spacer />
      <Button
        rounded="full"
        onClick={onClickPost}
        loading={isSubmitting}
        disabled={!isFormValid}
      >
        投稿
      </Button>
    </Flex>
  );
};

export default Header;
