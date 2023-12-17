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
