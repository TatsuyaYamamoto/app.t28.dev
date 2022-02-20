import OshalizableChar from "../OshalizableChar";
import { Variant } from "../UnicodeSymbols";

const toBasic = (source: string) => {
  const chars = OshalizableChar.from(source);
  return chars
    .map((char) =>
      char.convert({
        block: "basicLatin",
      })
    )
    .join("");
};

const toSerif = (source: string, variant: Variant) => {
  const chars = OshalizableChar.from(source);
  return chars
    .map((char) =>
      char.convert({
        block: "mathematicalAlphanumeric",
        typeface: "serif",
        variant,
      })
    )
    .join("");
};

const toSansSerif = (source: string, variant: Variant) => {
  const chars = OshalizableChar.from(source);
  return chars
    .map((char) =>
      char.convert({
        block: "mathematicalAlphanumeric",
        typeface: "sansSerif",
        variant,
      })
    )
    .join("");
};

const toScript = (source: string, variant: Variant) => {
  const chars = OshalizableChar.from(source);
  return chars
    .map((char) =>
      char.convert({
        block: "mathematicalAlphanumeric",
        typeface: "script",
        variant,
      })
    )
    .join("");
};

const toFraktur = (source: string, variant: Variant) => {
  const chars = OshalizableChar.from(source);
  return chars
    .map((char) =>
      char.convert({
        block: "mathematicalAlphanumeric",
        typeface: "fraktur",
        variant,
      })
    )
    .join("");
};

const toMonoSpace = (source: string, variant: Variant) => {
  const chars = OshalizableChar.from(source);
  return chars
    .map((char) =>
      char.convert({
        block: "mathematicalAlphanumeric",
        typeface: "monoSpace",
        variant,
      })
    )
    .join("");
};

const toDoubleStruck = (source: string, variant: Variant) => {
  const chars = OshalizableChar.from(source);
  return chars
    .map((char) =>
      char.convert({
        block: "mathematicalAlphanumeric",
        typeface: "doubleStruck",
        variant,
      })
    )
    .join("");
};

describe("OshalizableChar", () => {
  describe(`Latin letters Serif`, () => {
    describe.each`
      normal | bold   | italic | boldItalic
      ${"A"} | ${"𝐀"} | ${"𝐴"} | ${"𝑨"}
      ${"Z"} | ${"𝐙"} | ${"𝑍"} | ${"𝒁"}
      ${"a"} | ${"𝐚"} | ${"𝑎"} | ${"𝒂"}
      ${"h"} | ${"𝐡"} | ${"ℎ"} | ${"𝒉"}
      ${"z"} | ${"𝐳"} | ${"𝑧"} | ${"𝒛"}
    `("mutual conversion ($normal)", ({ normal, bold, italic, boldItalic }) => {
      test.each`
        test                        | actualValue                      | expectValue
        ${"normal => bold"}         | ${toSerif(normal, "bold")}       | ${bold}
        ${"bold => normal"}         | ${toSerif(bold, "normal")}       | ${normal}
        ${"normal => italic"}       | ${toSerif(normal, "italic")}     | ${italic}
        ${"italic => normal"}       | ${toSerif(italic, "normal")}     | ${normal}
        ${"normal =>  bold italic"} | ${toSerif(normal, "boldItalic")} | ${boldItalic}
        ${"bold italic => normal"}  | ${toSerif(boldItalic, "normal")} | ${normal}
      `("$test", ({ actualValue, expectValue }) => {
        expect(actualValue.codePointAt(0)).toBe(expectValue.codePointAt(0));
      });
    });
  });

  describe(`Latin letters Sans-serif`, () => {
    describe.each`
      serif  | normal | bold   | italic | boldItalic
      ${"A"} | ${"𝖠"} | ${"𝗔"} | ${"𝘈"} | ${"𝘼"}
      ${"M"} | ${"𝖬"} | ${"𝗠"} | ${"𝘔"} | ${"𝙈"}
      ${"Z"} | ${"𝖹"} | ${"𝗭"} | ${"𝘡"} | ${"𝙕"}
      ${"a"} | ${"𝖺"} | ${"𝗮"} | ${"𝘢"} | ${"𝙖"}
      ${"m"} | ${"𝗆"} | ${"𝗺"} | ${"𝘮"} | ${"𝙢"}
      ${"z"} | ${"𝗓"} | ${"𝘇"} | ${"𝘻"} | ${"𝙯"}
    `(
      "mutual conversion ($serif)",
      ({ serif, normal, bold, italic, boldItalic }) => {
        test.each`
          test                        | actualValue                          | expectValue
          ${"normal => bold"}         | ${toSansSerif(normal, "bold")}       | ${bold}
          ${"bold => normal"}         | ${toSansSerif(bold, "normal")}       | ${normal}
          ${"normal => italic"}       | ${toSansSerif(normal, "italic")}     | ${italic}
          ${"italic => normal"}       | ${toSansSerif(italic, "normal")}     | ${normal}
          ${"normal =>  bold italic"} | ${toSansSerif(normal, "boldItalic")} | ${boldItalic}
          ${"bold italic => normal"}  | ${toSansSerif(boldItalic, "normal")} | ${normal}
        `("$test", ({ actualValue, expectValue }) => {
          expect(actualValue.codePointAt(0)).toBe(expectValue.codePointAt(0));
        });
      }
    );
  });

  describe(`Latin letters Script`, () => {
    describe.each`
      serif  | normal | bold
      ${"A"} | ${"𝒜"} | ${"𝓐"}
      ${"B"} | ${"ℬ"} | ${"𝓑"}
      ${"E"} | ${"ℰ"} | ${"𝓔"}
      ${"F"} | ${"ℱ"} | ${"𝓕"}
      ${"H"} | ${"ℋ"} | ${"𝓗"}
      ${"I"} | ${"ℐ"} | ${"𝓘"}
      ${"L"} | ${"ℒ"} | ${"𝓛"}
      ${"M"} | ${"ℳ"} | ${"𝓜"}
      ${"R"} | ${"ℛ"} | ${"𝓡"}
      ${"Z"} | ${"𝒵"} | ${"𝓩"}
      ${"a"} | ${"𝒶"} | ${"𝓪"}
      ${"e"} | ${"ℯ"} | ${"𝓮"}
      ${"g"} | ${"ℊ"} | ${"𝓰"}
      ${"o"} | ${"ℴ"} | ${"𝓸"}
      ${"z"} | ${"𝓏"} | ${"𝔃"}
    `("mutual conversion ($serif)", ({ serif, normal, bold }) => {
      test.each`
        test                | actualValue                 | expectValue
        ${"normal => bold"} | ${toScript(normal, "bold")} | ${bold}
        ${"bold => normal"} | ${toScript(bold, "normal")} | ${normal}
      `("$test", ({ actualValue, expectValue }) => {
        expect(actualValue.codePointAt(0)).toBe(expectValue.codePointAt(0));
      });
    });
  });

  describe(`Latin letters Fraktur`, () => {
    describe.each`
      serif  | normal | bold
      ${"A"} | ${"𝔄"} | ${"𝕬"}
      ${"C"} | ${"ℭ"} | ${"𝕮"}
      ${"H"} | ${"ℌ"} | ${"𝕳"}
      ${"I"} | ${"ℑ"} | ${"𝕴"}
      ${"R"} | ${"ℜ"} | ${"𝕽"}
      ${"Z"} | ${"ℨ"} | ${"𝖅"}
      ${"a"} | ${"𝔞"} | ${"𝖆"}
      ${"z"} | ${"𝔷"} | ${"𝖟"}
    `("mutual conversion ($serif)", ({ serif, normal, bold }) => {
      test.each`
        test                | actualValue                  | expectValue
        ${"normal => bold"} | ${toFraktur(normal, "bold")} | ${bold}
        ${"bold => normal"} | ${toFraktur(bold, "normal")} | ${normal}
      `("$test", ({ actualValue, expectValue }) => {
        expect(actualValue.codePointAt(0)).toBe(expectValue.codePointAt(0));
      });
    });
  });

  describe(`Latin letters Mono-space`, () => {
    describe.each`
      serif  | normal
      ${"A"} | ${"𝙰"}
      ${"M"} | ${"𝙼"}
      ${"Z"} | ${"𝚉"}
      ${"a"} | ${"𝚊"}
      ${"m"} | ${"𝚖"}
      ${"z"} | ${"𝚣"}
    `("mutual conversion ($serif)", ({ serif, normal }) => {
      test.each`
        test                 | actualValue                     | expectValue
        ${"serif => normal"} | ${toMonoSpace(serif, "normal")} | ${normal}
        ${"normal => serif"} | ${toBasic(normal)}              | ${serif}
      `("$test", ({ actualValue, expectValue }) => {
        expect(actualValue.codePointAt(0)).toBe(expectValue.codePointAt(0));
      });
    });
  });

  describe(`Latin letters Double-struck`, () => {
    describe.each`
      serif  | bold
      ${"A"} | ${"𝔸"}
      ${"C"} | ${"ℂ"}
      ${"H"} | ${"ℍ"}
      ${"N"} | ${"ℕ"}
      ${"P"} | ${"ℙ"}
      ${"Q"} | ${"ℚ"}
      ${"R"} | ${"ℝ"}
      ${"Z"} | ${"ℤ"}
      ${"a"} | ${"𝕒"}
      ${"m"} | ${"𝕞"}
      ${"z"} | ${"𝕫"}
    `("mutual conversion ($serif)", ({ serif, bold }) => {
      test.each`
        test               | actualValue                      | expectValue
        ${"serif => bold"} | ${toDoubleStruck(serif, "bold")} | ${bold}
        ${"bold => serif"} | ${toBasic(bold)}                 | ${serif}
      `("$test", ({ actualValue, expectValue }) => {
        expect(actualValue.codePointAt(0)).toBe(expectValue.codePointAt(0));
      });
    });
  });

  describe("Digits", () => {
    describe.each`
      serifNormal | serifBold | sansSerifNormal | sansSerifBold
      ${"0"}      | ${"𝟎"}    | ${"𝟢"}          | ${"𝟬"}
      ${"5"}      | ${"𝟓"}    | ${"𝟧"}          | ${"𝟱"}
      ${"9"}      | ${"𝟗"}    | ${"𝟫"}          | ${"𝟵"}
    `(
      "mutual conversion ($serifNormal)",
      ({ serifNormal, serifBold, sansSerifNormal, sansSerifBold }) => {
        test.each`
          test                                    | actualValue                           | expectValue
          ${"serifNormal     => serifBold"}       | ${toSerif(serifNormal, "bold")}       | ${serifBold}
          ${"serifBold       => serifNormal"}     | ${toSerif(serifBold, "normal")}       | ${serifNormal}
          ${"serifNormal     => sansSerifNormal"} | ${toSansSerif(serifNormal, "normal")} | ${sansSerifNormal}
          ${"sansSerifNormal => serifNormal"}     | ${toSerif(sansSerifNormal, "normal")} | ${serifNormal}
          ${"serifNormal     =>  sansSerifBold"}  | ${toSansSerif(serifNormal, "bold")}   | ${sansSerifBold}
          ${"sansSerifBold   => serifNormal"}     | ${toSerif(sansSerifBold, "normal")}   | ${serifNormal}
        `("$test", ({ actualValue, expectValue }) => {
          expect(actualValue.codePointAt(0)).toBe(expectValue.codePointAt(0));
        });
      }
    );
  });
});
