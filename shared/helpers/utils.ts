import type { IntRange } from "type-fest";

export const wait = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export const blobToDataUrl = (blob: Blob) => {
  const reader = new FileReader();

  return new Promise<string>((resolve) => {
    reader.addEventListener("load", () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      }
    });
    reader.readAsDataURL(blob);
  });
};

export const downloadFile = (name: string, href: string): void => {
  const link = document.createElement("a");
  link.download = name;
  link.href = href;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const getRandomInt = <Min extends number, Max extends number>(
  minNum: Min,
  maxNum: Max,
) => {
  const minInt = Math.ceil(minNum);
  const maxInt = Math.floor(maxNum);

  return Math.floor(
    Math.random() * (maxInt - minInt + 1) + minInt,
  ) as unknown as IntRange<Min, Max, 1> | Max;
};

export const differenceInDays = (a: Date, b: Date) => {
  const diffMs = a.getTime() - b.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24)) % 365;
  return diffDays;
};

/**
 * @see https://github.com/tc39/proposal-promise-with-resolvers
 */
export const promiseWithResolvers = <T = void>() => {
  let resolve!: (value: T | PromiseLike<T>) => void;
  let reject!: (reason: unknown) => void;
  const promise = new Promise<T>((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });
  return { resolve, reject, promise };
};
