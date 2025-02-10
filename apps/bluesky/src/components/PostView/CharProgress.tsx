import { Flex, ProgressCircle } from "@chakra-ui/react";
import { FC } from "react";

interface Props {
  count: number;
  max: number;
}

const CharProgress: FC<Props> = ({ count, max }) => {
  return (
    <Flex gap={2}>
      {max - count}
      <ProgressCircle.Root value={count / max} size="xs">
        <ProgressCircle.Circle>
          <ProgressCircle.Track />
          <ProgressCircle.Range strokeLinecap="round" />
        </ProgressCircle.Circle>
      </ProgressCircle.Root>
    </Flex>
  );
};

export default CharProgress;
