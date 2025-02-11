import { Textarea } from "@chakra-ui/react";
import { ChangeEventHandler, FC } from "react";

interface Props {
  value: string;
  onChange: (newValue: string) => void;
}

const TextEditor: FC<Props> = ({ value, onChange }) => {
  const onChangeTextarea: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    onChange(e.target.value);
  };

  return (
    <Textarea
      value={value}
      onChange={onChangeTextarea}
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
