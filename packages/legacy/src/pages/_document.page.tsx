import Document, { Html, Head, Main, NextScript } from "next/document";

import { GaScript } from "../helper/ga";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <GaScript />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
