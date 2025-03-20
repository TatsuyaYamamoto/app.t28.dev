import { FC } from "react";

import { Dialog, Portal, ProgressCircle } from "@chakra-ui/react";

const IndeterminateProgressCircle = () => {
  return (
    <ProgressCircle.Root value={null}>
      <ProgressCircle.Circle>
        <ProgressCircle.Track />
        <ProgressCircle.Range />
      </ProgressCircle.Circle>
    </ProgressCircle.Root>
  );
};

interface LoadingOverlayProps {
  open: boolean;
}

const LoadingOverlay: FC<LoadingOverlayProps> = ({ open }) => {
  return (
    <Dialog.Root open={open}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner alignItems="center">
          <IndeterminateProgressCircle />
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default LoadingOverlay;
