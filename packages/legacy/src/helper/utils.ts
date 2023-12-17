import { useMemo } from "react";
import { useRouter } from "next/router";

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

/**
 * https://github.com/vercel/next.js/discussions/11484#discussioncomment-1204888
 */
export const useNextRouterQuery = <
  T extends Record<string, string | undefined>,
>(): T => {
  const router = useRouter();

  return useMemo(() => {
    const dummyUrl = new URL(`https://example.com${router.asPath}`);
    if (dummyUrl.search.length <= 0) return {} as T;
    return Object.fromEntries(
      new URLSearchParams(dummyUrl.search).entries(),
    ) as T;
  }, [router.asPath]);
};

export const downloadFile = (name: string, href: string): void => {
  const link = document.createElement("a");
  link.download = name;
  link.href = href;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
