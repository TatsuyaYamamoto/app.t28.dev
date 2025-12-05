import type { FC, PropsWithChildren, ReactNode } from "react";

const Name: FC<PropsWithChildren> = ({ children }) => {
  return (
    <dt className="rounded-full bg-(--color)/20 px-2 text-base">{children}</dt>
  );
};

const Value: FC<PropsWithChildren> = ({ children }) => {
  return (
    <dd className="inline after:text-3xl after:content-['px'] sm:after:text-5xl">
      {children}
    </dd>
  );
};

interface Props {
  width: { name: ReactNode; value: number };
  height: { name: ReactNode; value: number };
}

const DimensionWidthHeight: FC<Props> = ({ width, height }) => {
  return (
    <dl
      className={`inline-flex flex-col text-5xl font-extralight sm:flex-row sm:items-end sm:gap-4 sm:text-7xl`}
    >
      <div className="inline-flex flex-col">
        <Name>{width.name}</Name>
        <Value>{width.value}</Value>
      </div>
      <span>{`×`}</span>
      <div className="inline-flex flex-col">
        <Name>{height.name}</Name>
        <Value>{height.value}</Value>
      </div>
    </dl>
  );
};

export default DimensionWidthHeight;
