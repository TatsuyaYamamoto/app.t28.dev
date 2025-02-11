import { Textarea } from "@chakra-ui/react";
import { FC } from "react";

const TextEditor: FC = () => {
  return (
    <Textarea
      placeholder="最近どう？"
      autoresize={true}
      size="lg"
      resize="none"
      width="100%"
      height="100%"
      border={0}
      outline={0}
    />
  );
};

export default TextEditor;
