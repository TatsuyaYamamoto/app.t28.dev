import type { FC, PropsWithChildren } from "react";

const Size: FC<PropsWithChildren> = ({ children }) => {
  return <span className="after:content-['px']">{children}</span>;
};

export default Size;
