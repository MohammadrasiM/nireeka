import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" dir="ltr">
          <Head>
              <title>Nireeka Bikes | Carbon-Fiber Smart E-Bikes</title>
          </Head>
        <body>
          {/* Google Tag Manager (noscript)  */}
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            ></iframe>
          </noscript>
          {/* End Google Tag Manager (noscript)  */}
          <Main />
          <div id="overlay-portal" />
          <NextScript />
        </body>
      </Html>
    );
  }
}
