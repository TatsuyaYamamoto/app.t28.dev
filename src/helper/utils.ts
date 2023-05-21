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
