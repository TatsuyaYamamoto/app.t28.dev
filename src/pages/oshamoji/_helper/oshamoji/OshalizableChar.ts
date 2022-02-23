import {
  MathematicalAlphanumericStyleMap,
  MathematicalAlphanumericStyles,
} from "./MathematicalAlphanumeric";
import { BasicLatinSymbols } from "./BasicLatin";
import {
  convert,
  include,
  toBasicLatinChar,
  Typeface,
  UnicodeSymbols,
  Variant,
} from "./UnicodeSymbols";

/**
 * @private
 *
 * @param char
 * @return null if a supported Unicode subheading is not found.
 */
const analyze = (
  char: string
): {
  basicLatinChar: string;
  unicodeSymbols: UnicodeSymbols;
} | null => {
  const inputCharCodePoint = char.codePointAt(0);
  if (!inputCharCodePoint) {
    console.warn(`it could not get codepoint from input char. char: ${char}`);
    return null;
  }

  let inputCharUnicodeSymbols: UnicodeSymbols | null = null;

  const supportedStyles: UnicodeSymbols[] = [
    ...BasicLatinSymbols,
    ...MathematicalAlphanumericStyles,
  ];
  for (const styles of supportedStyles) {
    if (include(inputCharCodePoint, styles)) {
      inputCharUnicodeSymbols = styles;
      break;
    }
  }

  if (!inputCharUnicodeSymbols) {
    return null;
  }

  const basicLatinChar = toBasicLatinChar(
    inputCharCodePoint,
    inputCharUnicodeSymbols
  );

  return {
    basicLatinChar,
    unicodeSymbols: inputCharUnicodeSymbols,
  };
};

class OshalizableChar {
  public static from(text: string): OshalizableChar[] {
    // https://qiita.com/sounisi5011/items/aa2d747322aad4850fe7
    const sourceChars =
      text.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[\s\S]/g) || [];

    return sourceChars.map((char) => {
      const result = analyze(char);
      return result
        ? new OshalizableChar(
            result.basicLatinChar,
            result.unicodeSymbols,
            char
          )
        : // provided char is not supported.
          new OshalizableChar(null, null, char);
    });
  }

  private constructor(
    readonly basicLatinChar: string | null,
    readonly unicodeSymbols: UnicodeSymbols | null,
    readonly inputChar: string
  ) {}

  public convert(
    type:
      | { block: "basicLatin" }
      | {
          block: "mathematicalAlphanumeric";
          typeface: Typeface;
          variant: Variant;
        }
  ): string {
    if (!this.basicLatinChar || !this.unicodeSymbols) {
      return this.inputChar;
    }

    if (type.block === "basicLatin") {
      return this.basicLatinChar;
    }

    if (type.block === "mathematicalAlphanumeric") {
      let targetSymbols: UnicodeSymbols | null = null;
      const { characterType, letterCase } = this.unicodeSymbols;
      const { variant, typeface } = type;

      if (
        characterType === "digit" &&
        (typeface === "serif" || typeface === "sansSerif") &&
        (variant === "normal" || variant === "bold")
      ) {
        targetSymbols =
          MathematicalAlphanumericStyleMap["digit"][typeface][variant];
      }

      if (characterType === "latinLetter" && !!letterCase) {
        if (typeface === "serif" || typeface === "sansSerif") {
          // prettier-ignore
          targetSymbols =
            MathematicalAlphanumericStyleMap["latinLetter"][letterCase][typeface][variant];
        }

        if (
          (typeface === "script" || typeface === "fraktur") &&
          (variant === "normal" || variant === "bold")
        ) {
          // prettier-ignore
          targetSymbols =
            MathematicalAlphanumericStyleMap["latinLetter"][letterCase][typeface][variant];
        }

        if (typeface === "monoSpace" && variant === "normal") {
          // prettier-ignore
          targetSymbols =
            MathematicalAlphanumericStyleMap["latinLetter"][letterCase][typeface][variant];
        }

        if (typeface === "doubleStruck" && variant === "bold") {
          // prettier-ignore
          targetSymbols =
            MathematicalAlphanumericStyleMap["latinLetter"][letterCase][typeface][variant];
        }
      }

      if (!targetSymbols) {
        return this.inputChar;
      }

      const codePoint = this.basicLatinChar.codePointAt(0) ?? 0;
      return convert(codePoint, targetSymbols);
    }

    return this.inputChar;
  }
}

export default OshalizableChar;
