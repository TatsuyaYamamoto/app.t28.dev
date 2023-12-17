import type { Typeface, UnicodeSymbols, Variant } from "./UnicodeSymbols";

export const objectFlatten = (object: {
  [key in Typeface]?: { [key in Variant]?: UnicodeSymbols };
}): UnicodeSymbols[] => {
  const newArray: UnicodeSymbols[] = [];

  const typefaceKeys = Object.keys(object) as Typeface[];
  typefaceKeys.forEach((typefaceKey) => {
    const variants = object[typefaceKey];
    if (!variants) {
      return;
    }
    const variantKeys = Object.keys(variants) as Variant[];
    variantKeys.forEach((variantKey) => {
      const unicodeSymbols = variants[variantKey];
      if (!unicodeSymbols) {
        return;
      }
      newArray.push(unicodeSymbols);
    });
  });

  return newArray;
};
