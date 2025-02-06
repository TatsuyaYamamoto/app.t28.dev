import { expect, test, type Page } from "@playwright/test";
import { portMap } from "../playwright.config";

const baseUrl = `http://localhost:${portMap.oshamoji}`;

const placeholder = "Why don't you tweet your EMOTION with osha na moji?";

const goto = (page: Page) => page.goto(`${baseUrl}/oshamoji`);

test("should render elements in `<head>`", async ({ page }) => {
  await goto(page);

  // title and description
  await expect(page).toHaveTitle("Oshamoji | app.t28.dev");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    "おしゃれな文字に変換して、見比べて、コピーが出来るツールです。",
  );

  // OGP
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    "content",
    "Oshamoji | app.t28.dev",
  );
  await expect(page.locator('meta[property="og:description"]')).toHaveAttribute(
    "content",
    "おしゃれな文字に変換して、見比べて、コピーが出来るツールです。",
  );
});

test("should list cards with default value", async ({ page }) => {
  const defaultValues = [
    `Serif Why don't you tweet your EMOTION with osha na moji?`,
    `Bold 𝐖𝐡𝐲 𝐝𝐨𝐧'𝐭 𝐲𝐨𝐮 𝐭𝐰𝐞𝐞𝐭 𝐲𝐨𝐮𝐫 𝐄𝐌𝐎𝐓𝐈𝐎𝐍 𝐰𝐢𝐭𝐡 𝐨𝐬𝐡𝐚 𝐧𝐚 𝐦𝐨𝐣𝐢?`,
    `Italic 𝑊ℎ𝑦 𝑑𝑜𝑛'𝑡 𝑦𝑜𝑢 𝑡𝑤𝑒𝑒𝑡 𝑦𝑜𝑢𝑟 𝐸𝑀𝑂𝑇𝐼𝑂𝑁 𝑤𝑖𝑡ℎ 𝑜𝑠ℎ𝑎 𝑛𝑎 𝑚𝑜𝑗𝑖?`,
    `Bold italic 𝑾𝒉𝒚 𝒅𝒐𝒏'𝒕 𝒚𝒐𝒖 𝒕𝒘𝒆𝒆𝒕 𝒚𝒐𝒖𝒓 𝑬𝑴𝑶𝑻𝑰𝑶𝑵 𝒘𝒊𝒕𝒉 𝒐𝒔𝒉𝒂 𝒏𝒂 𝒎𝒐𝒋𝒊?`,
    `Sans-serif 𝖶𝗁𝗒 𝖽𝗈𝗇'𝗍 𝗒𝗈𝗎 𝗍𝗐𝖾𝖾𝗍 𝗒𝗈𝗎𝗋 𝖤𝖬𝖮𝖳𝖨𝖮𝖭 𝗐𝗂𝗍𝗁 𝗈𝗌𝗁𝖺 𝗇𝖺 𝗆𝗈𝗃𝗂?`,
    `Sans-serif bold 𝗪𝗵𝘆 𝗱𝗼𝗻'𝘁 𝘆𝗼𝘂 𝘁𝘄𝗲𝗲𝘁 𝘆𝗼𝘂𝗿 𝗘𝗠𝗢𝗧𝗜𝗢𝗡 𝘄𝗶𝘁𝗵 𝗼𝘀𝗵𝗮 𝗻𝗮 𝗺𝗼𝗷𝗶?`,
    `Sans-serif italic 𝘞𝘩𝘺 𝘥𝘰𝘯'𝘵 𝘺𝘰𝘶 𝘵𝘸𝘦𝘦𝘵 𝘺𝘰𝘶𝘳 𝘌𝘔𝘖𝘛𝘐𝘖𝘕 𝘸𝘪𝘵𝘩 𝘰𝘴𝘩𝘢 𝘯𝘢 𝘮𝘰𝘫𝘪?`,
    `Sans-serif bold italic 𝙒𝙝𝙮 𝙙𝙤𝙣'𝙩 𝙮𝙤𝙪 𝙩𝙬𝙚𝙚𝙩 𝙮𝙤𝙪𝙧 𝙀𝙈𝙊𝙏𝙄𝙊𝙉 𝙬𝙞𝙩𝙝 𝙤𝙨𝙝𝙖 𝙣𝙖 𝙢𝙤𝙟𝙞?`,
    `Script 𝒲𝒽𝓎 𝒹ℴ𝓃'𝓉 𝓎ℴ𝓊 𝓉𝓌ℯℯ𝓉 𝓎ℴ𝓊𝓇 ℰℳ𝒪𝒯ℐ𝒪𝒩 𝓌𝒾𝓉𝒽 ℴ𝓈𝒽𝒶 𝓃𝒶 𝓂ℴ𝒿𝒾?`,
    `Bold script 𝓦𝓱𝔂 𝓭𝓸𝓷'𝓽 𝔂𝓸𝓾 𝓽𝔀𝓮𝓮𝓽 𝔂𝓸𝓾𝓻 𝓔𝓜𝓞𝓣𝓘𝓞𝓝 𝔀𝓲𝓽𝓱 𝓸𝓼𝓱𝓪 𝓷𝓪 𝓶𝓸𝓳𝓲?`,
    `Fraktur 𝔚𝔥𝔶 𝔡𝔬𝔫'𝔱 𝔶𝔬𝔲 𝔱𝔴𝔢𝔢𝔱 𝔶𝔬𝔲𝔯 𝔈𝔐𝔒𝔗ℑ𝔒𝔑 𝔴𝔦𝔱𝔥 𝔬𝔰𝔥𝔞 𝔫𝔞 𝔪𝔬𝔧𝔦?`,
    "Bold Fraktur 𝖂𝖍𝖞 𝖉𝖔𝖓'𝖙 𝖞𝖔𝖚 𝖙𝖜𝖊𝖊𝖙 𝖞𝖔𝖚𝖗 𝕰𝕸𝕺𝕿𝕴𝕺𝕹 𝖜𝖎𝖙𝖍 𝖔𝖘𝖍𝖆 𝖓𝖆 𝖒𝖔𝖏𝖎?",
    `Monospace 𝚆𝚑𝚢 𝚍𝚘𝚗'𝚝 𝚢𝚘𝚞 𝚝𝚠𝚎𝚎𝚝 𝚢𝚘𝚞𝚛 𝙴𝙼𝙾𝚃𝙸𝙾𝙽 𝚠𝚒𝚝𝚑 𝚘𝚜𝚑𝚊 𝚗𝚊 𝚖𝚘𝚓𝚒?`,
    `Double-struck 𝕎𝕙𝕪 𝕕𝕠𝕟'𝕥 𝕪𝕠𝕦 𝕥𝕨𝕖𝕖𝕥 𝕪𝕠𝕦𝕣 𝔼𝕄𝕆𝕋𝕀𝕆ℕ 𝕨𝕚𝕥𝕙 𝕠𝕤𝕙𝕒 𝕟𝕒 𝕞𝕠𝕛𝕚?`,
  ];

  await goto(page);

  for (const defaultValue of defaultValues) {
    const card = page.getByRole("link", { name: defaultValue, exact: true });
    await expect(card).toBeVisible();
  }
});

test("should copy to a clipboard", async ({ page, context }) => {
  const input = "I am a LoveLiver.";
  const outputs = [
    `I am a LoveLiver.`, //   Serif
    `𝐈 𝐚𝐦 𝐚 𝐋𝐨𝐯𝐞𝐋𝐢𝐯𝐞𝐫.`, //    Bold
    `𝐼 𝑎𝑚 𝑎 𝐿𝑜𝑣𝑒𝐿𝑖𝑣𝑒𝑟.`, //     Italic
    `𝑰 𝒂𝒎 𝒂 𝑳𝒐𝒗𝒆𝑳𝒊𝒗𝒆𝒓.`, //    Bold italic
    `𝖨 𝖺𝗆 𝖺 𝖫𝗈𝗏𝖾𝖫𝗂𝗏𝖾𝗋.`, //      Sans-serif
    `𝗜 𝗮𝗺 𝗮 𝗟𝗼𝘃𝗲𝗟𝗶𝘃𝗲𝗿.`, //     Sans-serif bold
    `𝘐 𝘢𝘮 𝘢 𝘓𝘰𝘷𝘦𝘓𝘪𝘷𝘦𝘳.`, //      Sans-serif italic
    `𝙄 𝙖𝙢 𝙖 𝙇𝙤𝙫𝙚𝙇𝙞𝙫𝙚𝙧.`, //     Sans-serif bold italic
    `ℐ 𝒶𝓂 𝒶 ℒℴ𝓋ℯℒ𝒾𝓋ℯ𝓇.`, //  Script
    `𝓘 𝓪𝓶 𝓪 𝓛𝓸𝓿𝓮𝓛𝓲𝓿𝓮𝓻.`, // Bold script
    `ℑ 𝔞𝔪 𝔞 𝔏𝔬𝔳𝔢𝔏𝔦𝔳𝔢𝔯.`, //    Fraktur
    "𝕴 𝖆𝖒 𝖆 𝕷𝖔𝖛𝖊𝕷𝖎𝖛𝖊𝖗.", //  Bold Fraktur
    `𝙸 𝚊𝚖 𝚊 𝙻𝚘𝚟𝚎𝙻𝚒𝚟𝚎𝚛.`, //   Monospace
    `𝕀 𝕒𝕞 𝕒 𝕃𝕠𝕧𝕖𝕃𝕚𝕧𝕖𝕣.`, //  Double-struck
  ];

  await goto(page);
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);

  // When the button is clicked
  await page.getByRole("button", { name: "Edit text" }).click();
  const textboxBefore = page.getByPlaceholder(placeholder, { exact: true });
  // Then, the modal should be opened.
  const modal = page.getByRole("dialog");
  await expect(modal).toBeVisible();
  await expect(modal.getByPlaceholder(placeholder)).toBeVisible();
  await expect(modal.getByRole("button", { name: "Close" })).toBeVisible();

  // When a user input and click the button
  await textboxBefore.fill(input);
  await page.getByRole("button", { name: "Close" }).click();
  // Then, the modal should be closed.
  await expect(modal).not.toBeVisible();

  for (const output of outputs) {
    // Then, converted input should be shown in card
    const card = page.getByRole("link", { name: output });
    await expect(card).toBeVisible();

    // When a user click the card
    await card.click();

    // Then, the tooltip should be shown
    const cardAriaDescribedBy = (await card.getAttribute("aria-describedby"))
      // escape
      .replace(/:/g, "\\:");
    const tooltip = page.locator(`#${cardAriaDescribedBy}`);
    await expect(tooltip).toContainText("Copy!");

    // And, copy to clipboard
    const clipboardContent = await page
      .evaluateHandle(() => navigator.clipboard.readText())
      .then((handle) => handle.jsonValue());
    expect(clipboardContent).toBe(output);
  }
});

test.skip("should open twitter with a converted text", () => {});

test("should support keyboard operation for the modal", async ({ page }) => {
  await goto(page);

  // When `Tab` key is pressed 16 times and `Enter` is pressed
  for (const _ of [].constructor(16)) {
    await page.keyboard.press("Tab");
  }
  await page.keyboard.press("Enter");

  // Then, the modal should be opened
  const modal = page.getByRole("dialog");
  await expect(modal).toBeVisible();
  await expect(modal.getByPlaceholder(placeholder)).toBeVisible();

  // When `Escape` key is pressed
  await page.keyboard.press("Escape");

  // Then, the modal should be closed.
  await expect(modal).not.toBeVisible();
});
