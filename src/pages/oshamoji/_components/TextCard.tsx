import { FC, useState, ChangeEvent, useRef, useEffect } from "react";

import { css } from "@emotion/react";

const cardStyle = css`
  width: 320px;
  min-height: 90px;
  border-radius: 4px;
  font-size: 24px;
  font-weight: 400;

  border: 1px solid #000000;
`;

export interface TextCardProps {
  value: string;
  onChange: (newValue: string) => void;
}

const TextCard: FC<TextCardProps> = (props) => {
  const { value, onChange } = props;

  const isComposing = useRef(false);
  const [internalValue, setInternalValue] = useState(value);
  const elRef = useRef<HTMLTextAreaElement>(null);

  const onInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    console.log(isComposing.current, newValue);

    setInternalValue(e.target.value);
    if (!isComposing.current) {
      onChange(newValue);
    }
  };

  const onCompositionStart = () => {
    isComposing.current = true;
    console.log("onCompositionStart");
  };

  const onCompositionEnd = () => {
    isComposing.current = false;
    console.log("onCompositionEnd");
    onChange(internalValue);
  };

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  return (
    <textarea
      ref={elRef}
      css={cardStyle}
      value={internalValue}
      onInput={onInput}
      onCompositionStart={onCompositionStart}
      onCompositionEnd={onCompositionEnd}
    />
  );
};

export default TextCard;
