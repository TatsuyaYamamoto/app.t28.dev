import {
  AsciiDigits,
  LowercaseLatinAlphabet,
  UppercaseLatinAlphabet,
} from "./BasicLatin";
import { UnicodeSymbols } from "./UnicodeSymbols";
import { objectFlatten } from "./utils";

/* A */
const LatinUppercaseSerifNormalLetters = UppercaseLatinAlphabet;

/* 𝐀 */
const LatinUppercaseSerifBoldLetters: UnicodeSymbols = {
  typeface: "serif",
  variant: "bold",
  characterType: "latinLetter",
  letterCase: "uppercase",
  codePointRange: {
    from: "U+1D400",
    to: "U+1D419",
  },
};

/* 𝐴 */
const LatinUppercaseSerifItalicLetters: UnicodeSymbols = {
  typeface: "serif",
  variant: "italic",
  characterType: "latinLetter",
  letterCase: "uppercase",
  codePointRange: {
    from: "U+1D434",
    to: "U+1D44D",
  },
};

/* 𝑨 */
const LatinUppercaseSerifBoldItalicLetters: UnicodeSymbols = {
  typeface: "serif",
  variant: "boldItalic",
  characterType: "latinLetter",
  letterCase: "uppercase",
  codePointRange: {
    from: "U+1D468",
    to: "U+1D481",
  },
};

/* 𝖠 */
const LatinUppercaseSansSerifNormalLetters: UnicodeSymbols = {
  typeface: "sansSerif",
  variant: "normal",
  characterType: "latinLetter",
  letterCase: "uppercase",
  codePointRange: {
    from: "U+1D5A0",
    to: "U+1D5B9",
  },
};

/* 𝗔 */
const LatinUppercaseSansSerifBoldLetters: UnicodeSymbols = {
  typeface: "sansSerif",
  variant: "bold",
  characterType: "latinLetter",
  letterCase: "uppercase",
  codePointRange: {
    from: "U+1D5D4",
    to: "U+1D5ED",
  },
};

/* 𝘈 */
const LatinUppercaseSansSerifItalicLetters: UnicodeSymbols = {
  typeface: "sansSerif",
  variant: "italic",
  characterType: "latinLetter",
  letterCase: "uppercase",
  codePointRange: {
    from: "U+1D608",
    to: "U+1D621",
  },
};

/* 𝘼 */
const LatinUppercaseSansSerifBoldItalicLetters: UnicodeSymbols = {
  typeface: "sansSerif",
  variant: "boldItalic",
  characterType: "latinLetter",
  letterCase: "uppercase",
  codePointRange: {
    from: "U+1D63C",
    to: "U+1D655",
  },
};

/* 𝒜 */
const LatinUppercaseScriptNormalLetters: UnicodeSymbols = {
  typeface: "script",
  variant: "normal",
  characterType: "latinLetter",
  letterCase: "uppercase",
  codePointRange: {
    from: "U+1D49C",
    to: "U+1D4B5",
  },
  reservedSymbols: [
    /* ℬ */ { codePoint: "U+1D49D", assignedCodePoint: "U+212C" },
    /* ℰ */ { codePoint: "U+1D4A0", assignedCodePoint: "U+2130" },
    /* ℱ */ { codePoint: "U+1D4A1", assignedCodePoint: "U+2131" },
    /* ℋ */ { codePoint: "U+1D4A3", assignedCodePoint: "U+210B" },
    /* ℐ */ { codePoint: "U+1D4A4", assignedCodePoint: "U+2110" },
    /* ℒ */ { codePoint: "U+1D4A7", assignedCodePoint: "U+2112" },
    /* ℳ */ { codePoint: "U+1D4A8", assignedCodePoint: "U+2133" },
    /* ℛ */ { codePoint: "U+1D4AD", assignedCodePoint: "U+211B" },
  ],
};

/* 𝓐 */
const LatinUppercaseScriptBoldLetters: UnicodeSymbols = {
  typeface: "script",
  variant: "bold",
  characterType: "latinLetter",
  letterCase: "uppercase",
  codePointRange: {
    from: "U+1D4D0",
    to: "U+1D4E9",
  },
};

/* 𝔄 */
const LatinUppercaseFrakturNormalLetters: UnicodeSymbols = {
  typeface: "fraktur",
  variant: "normal",
  characterType: "latinLetter",
  letterCase: "uppercase",
  codePointRange: {
    from: "U+1D504",
    to: "U+1D51D",
  },
  reservedSymbols: [
    { codePoint: "U+1D506", assignedCodePoint: "U+212D" }, // ℭ black-letter capital c
    { codePoint: "U+1D50B", assignedCodePoint: "U+210C" }, // ℌ black-letter capital h
    { codePoint: "U+1D50C", assignedCodePoint: "U+2111" }, // ℑ black-letter capital i
    { codePoint: "U+1D515", assignedCodePoint: "U+211C" }, // ℜ black-letter capital r
    { codePoint: "U+1D51D", assignedCodePoint: "U+2128" }, // ℨ black-letter capital z
  ],
};

/* 𝕬 */
const LatinUppercaseFrakturBoldLetters: UnicodeSymbols = {
  typeface: "fraktur",
  variant: "bold",
  characterType: "latinLetter",
  letterCase: "uppercase",
  codePointRange: {
    from: "U+1D56C",
    to: "U+1D585",
  },
};

/* 𝙰 */
const LatinUppercaseMonoSpaceBoldLetters: UnicodeSymbols = {
  typeface: "monoSpace",
  variant: "normal",
  characterType: "latinLetter",
  letterCase: "uppercase",
  codePointRange: {
    from: "U+1D670",
    to: "U+1D689",
  },
};

/* 𝔸 */
const LatinUppercaseDoubleStruckBoldLetters: UnicodeSymbols = {
  typeface: "doubleStruck",
  variant: "bold",
  characterType: "latinLetter",
  letterCase: "uppercase",
  codePointRange: {
    from: "U+1D538",
    to: "U+1D551",
  },
  reservedSymbols: [
    { codePoint: "1D53A", assignedCodePoint: "2102" }, // ℂ double-struck capital c
    { codePoint: "1D53F", assignedCodePoint: "210D" }, // ℍ double-struck capital h
    { codePoint: "1D545", assignedCodePoint: "2115" }, // ℕ double-struck capital n
    { codePoint: "1D547", assignedCodePoint: "2119" }, // ℙ double-struck capital p
    { codePoint: "1D548", assignedCodePoint: "211A" }, // ℚ double-struck capital q
    { codePoint: "1D549", assignedCodePoint: "211D" }, // ℝ double-struck capital r
    { codePoint: "1D551", assignedCodePoint: "2124" }, // ℤ double-struck capital z
  ],
};

/* a */
const LatinLowercaseSerifNormalLetters = LowercaseLatinAlphabet;

/* 𝐚 */
const LatinLowercaseSerifBoldLetters: UnicodeSymbols = {
  typeface: "serif",
  variant: "bold",
  characterType: "latinLetter",
  letterCase: "lowercase",
  codePointRange: {
    from: "U+1D41A",
    to: "U+1D433",
  },
};

/* 𝑎 */
const LatinLowercaseSerifItalicLetters: UnicodeSymbols = {
  typeface: "serif",
  variant: "italic",
  characterType: "latinLetter",
  letterCase: "lowercase",
  codePointRange: {
    from: "U+1D44E",
    to: "U+1D467",
  },
  reservedSymbols: [
    {
      /* ℎ */
      codePoint: "U+1D455",
      assignedCodePoint: "U+210E",
    },
  ],
};

/* 𝒂 */
const LatinLowercaseSerifBoldItalicLetters: UnicodeSymbols = {
  typeface: "serif",
  variant: "boldItalic",
  characterType: "latinLetter",
  letterCase: "lowercase",
  codePointRange: {
    from: "U+1D482",
    to: "U+1D49B",
  },
};

/* a */
const LatinLowercaseSansSerifNormalLetters: UnicodeSymbols = {
  typeface: "sansSerif",
  variant: "normal",
  characterType: "latinLetter",
  letterCase: "lowercase",
  codePointRange: {
    from: "U+1D5BA",
    to: "U+1D5D3",
  },
};

/* 𝐚 */
const LatinLowercaseSansSerifBoldLetters: UnicodeSymbols = {
  typeface: "sansSerif",
  variant: "bold",
  characterType: "latinLetter",
  letterCase: "lowercase",
  codePointRange: {
    from: "U+1D5EE",
    to: "U+1D607",
  },
};

/* 𝑎 */
const LatinLowercaseSansSerifItalicLetters: UnicodeSymbols = {
  typeface: "sansSerif",
  variant: "italic",
  characterType: "latinLetter",
  letterCase: "lowercase",
  codePointRange: {
    from: "U+1D622",
    to: "U+1D63B",
  },
};

/* 𝒂 */
const LatinLowercaseSansSerifBoldItalicLetters: UnicodeSymbols = {
  typeface: "sansSerif",
  variant: "boldItalic",
  characterType: "latinLetter",
  letterCase: "lowercase",
  codePointRange: {
    from: "U+1D656",
    to: "U+1D66F",
  },
};

/* 𝒶 */
const LatinLowercaseScriptNormalLetters: UnicodeSymbols = {
  typeface: "script",
  variant: "normal",
  characterType: "latinLetter",
  letterCase: "lowercase",
  codePointRange: {
    from: "U+1D4B6",
    to: "U+1D4CF",
  },
  reservedSymbols: [
    /* ℯ */ { codePoint: "U+1D4BA", assignedCodePoint: "U+212F" },
    /* ℊ */ { codePoint: "U+1D4BC", assignedCodePoint: "U+210A" },
    /* ℴ */ { codePoint: "U+1D4C4", assignedCodePoint: "U+2134" },
  ],
};

/* 𝓪 */
const LatinLowercaseScriptBoldLetters: UnicodeSymbols = {
  typeface: "script",
  variant: "bold",
  characterType: "latinLetter",
  letterCase: "lowercase",
  codePointRange: {
    from: "U+1D4EA",
    to: "U+1D503",
  },
};

/* 𝒶 */
const LatinLowercaseFrakturNormalLetters: UnicodeSymbols = {
  typeface: "fraktur",
  variant: "normal",
  characterType: "latinLetter",
  letterCase: "lowercase",
  codePointRange: {
    from: "U+1D51E",
    to: "U+1D537",
  },
  reservedSymbols: [
    /*  */ { codePoint: "U+", assignedCodePoint: "U+" },
    /*  */ { codePoint: "U+", assignedCodePoint: "U+" },
    /*  */ { codePoint: "U+", assignedCodePoint: "U+" },
    /*  */ { codePoint: "U+", assignedCodePoint: "U+" },
    /*  */ { codePoint: "U+", assignedCodePoint: "U+" },
  ],
};

/* 𝓪 */
const LatinLowercaseFrakturBoldLetters: UnicodeSymbols = {
  typeface: "fraktur",
  variant: "bold",
  characterType: "latinLetter",
  letterCase: "lowercase",
  codePointRange: {
    from: "U+1D586",
    to: "U+1D59F",
  },
};

/* 𝚊 */
const LatinLowercaseMonoSpaceBoldLetters: UnicodeSymbols = {
  typeface: "monoSpace",
  variant: "normal",
  characterType: "latinLetter",
  letterCase: "lowercase",
  codePointRange: {
    from: "U+1D68A",
    to: "U+1D6A3",
  },
};

/* 𝕒 */
const LatinLowercaseDoubleStruckBoldLetters: UnicodeSymbols = {
  typeface: "doubleStruck",
  variant: "bold",
  characterType: "latinLetter",
  letterCase: "lowercase",
  codePointRange: {
    from: "U+1D552",
    to: "U+1D56B",
  },
};

/* 0 */
export const SerifNormalDigits = AsciiDigits;

/* 𝟎 */
export const SerifBoldDigits: UnicodeSymbols = {
  typeface: "serif",
  variant: "bold",
  characterType: "digit",
  codePointRange: {
    from: "U+1D7CE",
    to: "U+1D7D7",
  },
};

/* 𝟢 */
export const SansSerifNormalDigits: UnicodeSymbols = {
  typeface: "sansSerif",
  variant: "normal",
  characterType: "digit",
  codePointRange: {
    from: "U+1D7E2",
    to: "U+1D7EB",
  },
};

/* 𝟬 */
export const SansSerifBoldDigits: UnicodeSymbols = {
  typeface: "sansSerif",
  variant: "bold",
  characterType: "digit",
  codePointRange: {
    from: "U+1D7EC",
    to: "U+1D7F5",
  },
};

export const MathematicalAlphanumericStyleMap = {
  latinLetter: {
    uppercase: {
      serif: {
        normal: LatinUppercaseSerifNormalLetters,
        bold: LatinUppercaseSerifBoldLetters,
        italic: LatinUppercaseSerifItalicLetters,
        boldItalic: LatinUppercaseSerifBoldItalicLetters,
      },
      sansSerif: {
        normal: LatinUppercaseSansSerifNormalLetters,
        bold: LatinUppercaseSansSerifBoldLetters,
        italic: LatinUppercaseSansSerifItalicLetters,
        boldItalic: LatinUppercaseSansSerifBoldItalicLetters,
      },
      script: {
        normal: LatinUppercaseScriptNormalLetters,
        bold: LatinUppercaseScriptBoldLetters,
      },
      fraktur: {
        normal: LatinUppercaseFrakturNormalLetters,
        bold: LatinUppercaseFrakturBoldLetters,
      },
      monoSpace: {
        normal: LatinUppercaseMonoSpaceBoldLetters,
      },
      doubleStruck: {
        bold: LatinUppercaseDoubleStruckBoldLetters,
      },
    },
    lowercase: {
      serif: {
        normal: LatinLowercaseSerifNormalLetters,
        bold: LatinLowercaseSerifBoldLetters,
        italic: LatinLowercaseSerifItalicLetters,
        boldItalic: LatinLowercaseSerifBoldItalicLetters,
      },
      sansSerif: {
        normal: LatinLowercaseSansSerifNormalLetters,
        bold: LatinLowercaseSansSerifBoldLetters,
        italic: LatinLowercaseSansSerifItalicLetters,
        boldItalic: LatinLowercaseSansSerifBoldItalicLetters,
      },
      script: {
        normal: LatinLowercaseScriptNormalLetters,
        bold: LatinLowercaseScriptBoldLetters,
      },
      fraktur: {
        normal: LatinLowercaseFrakturNormalLetters,
        bold: LatinLowercaseFrakturBoldLetters,
      },
      monoSpace: {
        normal: LatinLowercaseMonoSpaceBoldLetters,
      },
      doubleStruck: {
        bold: LatinLowercaseDoubleStruckBoldLetters,
      },
    },
  },
  digit: {
    serif: {
      normal: SerifNormalDigits,
      bold: SerifBoldDigits,
    },
    sansSerif: {
      normal: SansSerifNormalDigits,
      bold: SansSerifBoldDigits,
    },
  },
} as const;

export const MathematicalAlphanumericStyles = [
  ...objectFlatten(MathematicalAlphanumericStyleMap.latinLetter.uppercase),
  ...objectFlatten(MathematicalAlphanumericStyleMap.latinLetter.lowercase),
  ...objectFlatten(MathematicalAlphanumericStyleMap.digit),
];
