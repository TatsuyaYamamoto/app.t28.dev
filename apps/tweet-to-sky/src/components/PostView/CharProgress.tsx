import { MAX_GRAPHEME_LENGTH } from "@/constants.ts";
import { Flex, ProgressCircle } from "@chakra-ui/react";
import { FC } from "react";

interface Props {
  count: number;
}

const CharProgress: FC<Props> = ({ count }) => {
  const countLeft = MAX_GRAPHEME_LENGTH - count;
  const ratio = count / MAX_GRAPHEME_LENGTH;

  return (
    <Flex gap={2}>
      {countLeft}
      <ProgressCircle.Root value={ratio} size="xs">
        <ProgressCircle.Circle>
          <ProgressCircle.Track />
          <ProgressCircle.Range strokeLinecap="round" />
        </ProgressCircle.Circle>
      </ProgressCircle.Root>
    </Flex>
  );
};

export default CharProgress;
