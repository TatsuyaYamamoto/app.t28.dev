import { type FC, useState } from "react";

const candidates = [
  ["100dvw", "100dvh"],
  ["100lvw", "100lvh"],
  ["100svw", "100svh"],
] as const;

const CssViewportBorder: FC = () => {
  const [candidateIndex, setCandidateIndex] = useState(0);

  const onClick = () => {
    setCandidateIndex((prev) => (prev + 1) % candidates.length);
  };

  const [width, height] = candidates[candidateIndex];

  return (
    <div
      className="border-neutral pointer-events-none absolute top-0 border-4 border-dotted"
      style={{ width, height }}
    >
      <button
        className="btn btn-xs btn-neutral pointer-events-auto absolute top-0 left-1/2 -translate-x-1/2"
        onClick={onClick}
      >
        {`dotted border width: ${width}`}
      </button>
      <button
        className="btn btn-xs btn-neutral pointer-events-auto absolute top-1/2 left-3 -translate-x-1/2 -rotate-90"
        onClick={onClick}
      >
        {`dotted border height: ${height}`}
      </button>
    </div>
  );
};

export default CssViewportBorder;
