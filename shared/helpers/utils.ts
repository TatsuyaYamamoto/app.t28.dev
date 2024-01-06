import type { IntRange } from "type-fest";

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
