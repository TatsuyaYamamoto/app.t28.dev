import { FC, FormEvent, useRef } from "react";

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { css } from "@emotion/react";
import TextareaAutosize from "react-textarea-autosize";
import { PLACEHOLDER } from "../_helper/config";

interface Props {
  value: string;
  isOpen: boolean;
  onClose: () => void;
  onChangeText: (value: string) => void;
}

const ModalEditor: FC<Props> = (props) => {
  const { value, isOpen, onClose, onChangeText } = props;

  const textareaElRef = useRef<HTMLTextAreaElement>(null);
  const finalRef = useRef(null);

  const onInput = (e: FormEvent<HTMLTextAreaElement>) => {
    const newValue = e.currentTarget.value;
    onChangeText(newValue);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior={"inside"}
      blockScrollOnMount={false}
      initialFocusRef={textareaElRef}
      finalFocusRef={finalRef}
      isCentered={true}
    >
      <ModalOverlay />
      <ModalContent borderRadius={"10px"} marginX={2}>
        <ModalHeader />
        <ModalCloseButton />
        <ModalBody>
          <TextareaAutosize
            placeholder={PLACEHOLDER}
            onInput={onInput}
            value={value}
            ref={textareaElRef}
            css={css`
              width: 100%;
              min-height: 200px;

              font-size: 24px;

              outline: none; // hide textarea border on focus
              overflow: hidden; // hide scrollbar
              resize: none; // hide resize controller
            `}
          />
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalEditor;
