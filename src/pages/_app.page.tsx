import { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import { ChakraProvider } from "@chakra-ui/react";

import { theme } from "../helper/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        title={"app.t28.dev"}
        twitter={{
          cardType: "summary",
        }}
      />
      <ChakraProvider resetCSS={true} theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;
