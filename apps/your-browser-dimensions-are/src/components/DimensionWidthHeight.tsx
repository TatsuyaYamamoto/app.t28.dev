import type { FC, PropsWithChildren, ReactNode } from "react";

const Name: FC<PropsWithChildren> = ({ children }) => {
  return (
    <dt className="absolute top-0 left-1/2 transform-[translate(-50%,-50%)] rounded-full bg-(--color)/20 px-2 text-base">
      {children}
    </dt>
  );
};

const Value: FC<PropsWithChildren> = ({ children }) => {
  return (
    <dd className="inline">
      <output className="after:text-5xl after:content-['px']">
        {children}
      </output>
    </dd>
  );
};

interface Props {
  width: { name: ReactNode; value: number };
  height: { name: ReactNode; value: number };
}

const DimensionWidthHeight: FC<Props> = ({ width, height }) => {
  return (
    <dl className={`inline-block pt-5 text-7xl font-extralight`}>
      <div className="relative inline">
        <Name>{width.name}</Name>
        <Value>{width.value}</Value>
      </div>

      <span>{` × `}</span>

      <div className="relative inline">
        <Name>{height.name}</Name>
        <Value>{height.value}</Value>
      </div>
    </dl>
  );
};

export default DimensionWidthHeight;
