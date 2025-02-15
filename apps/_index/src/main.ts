// @ts-expect-error
import { share_target } from "../public/manifest.json";

const params = new URL(location.href).searchParams;

const webShareParams = {
  title: params.get(share_target.params.title),
  text: params.get(share_target.params.text),
  url: params.get(share_target.params.url),
};

if (webShareParams.text) {
  location.href = `/oshamoji?text=${webShareParams.text}`;
}
