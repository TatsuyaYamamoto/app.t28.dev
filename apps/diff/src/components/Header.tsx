import type { FC } from "react";

interface Props {
  onClickShare: () => void;
}

const Header: FC<Props> = ({ onClickShare }) => {
  return (
    <header className="flex border-b h-16 justify-center">
      <div>{`Diff`}</div>
      <button onClick={onClickShare}>{`Share`}</button>
    </header>
  );
};

export default Header;
