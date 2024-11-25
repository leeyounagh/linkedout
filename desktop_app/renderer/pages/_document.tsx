import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import { ServerStyleSheet } from "styled-components";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head id="titlebar">
          <link rel="icon" href="/images/menu_logo.png" />
          
        </Head>
        <body>
          <div id="titlebar">
            <div id="drag-region">
              <div id="window-title">
                <img id="logo" src="/images/menu_logo.png" alt="my logo" />
              </div>
              <div id="window-controls">
                <div className="button window-hover" id="min-button">
                  <img
                    className="icon"
                    id="min"
                    alt="minimize"
                    srcSet="/images/menuicon_1.png"
                    draggable="false"
                  />
                </div>
                <div className="button window-hover" id="max-button">
                  <img
                    className="icon"
                    id="max"
                    alt="maximize"
                    srcSet="/images/menuicon_2.png"
                    draggable="false"
                  />
                </div>
                <div className="button window-hover-close" id="close-button">
                  <img
                    className="icon"
                    id="close"
                    alt="close"
                    srcSet="/images/menuicon_3.png"
                    draggable="false"
                  />
                </div>
              </div>
            </div>
          </div>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
