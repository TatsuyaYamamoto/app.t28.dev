import { jwtDecode } from "jwt-decode";

export const selectLocalImages = (): Promise<File[] | null> => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.multiple = true;

  return new Promise((resolve) => {
    input.addEventListener("change", (e) => {
      const target = e.target as HTMLInputElement;
      if (!target.files) {
        resolve(null);
        return;
      }
      resolve(Array.from(target.files));
    });
    input.click();
  });
};

/**
 * @see https://github.com/bluesky-social/social-app/blob/1.97.0/src/state/session/util.ts#L24C1-L35C4
 */
export function isTokenExpired(token: string) {
  const payload = jwtDecode(token);

  if (payload.exp === undefined) {
    // no expiration date
    return true;
  }

  return payload.exp * 1000 <= Date.now();
}

export const base64ToBinary = (base64: string) => {
  return Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
};

export const arrayBufferToBase64 = (arrayBuffer: ArrayBuffer) => {
  // https://stackoverflow.com/a/9458996
  let binary = "";
  const bytes = new Uint8Array(arrayBuffer);
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
};

export const getImageFileAspectRatio = (
  file: File,
): Promise<{ width: number; height: number }> => {
  const image = new Image();

  return new Promise((resolve) => {
    URL.revokeObjectURL(image.src);

    image.addEventListener("load", () => {
      resolve({
        width: image.width,
        height: image.height,
      });
    });

    image.src = URL.createObjectURL(file);
  });
};
