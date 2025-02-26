// @ts-expect-error
import { share_target } from "../public/manifest.json";

const params = new URL(location.href).searchParams;

const webShareParams = {
  title: params.get(share_target.params.title),
  text: params.get(share_target.params.text),
  url: params.get(share_target.params.url),
};

const main = () => {
  if (webShareParams.text) {
    if (webShareParams.text.startsWith("https://x.com")) {
      location.href = `/tweet-to-sky?tweet=${webShareParams.text}`;
      return;
    }

    location.href = `/oshamoji?text=${webShareParams.text}`;
  }
};

main();
