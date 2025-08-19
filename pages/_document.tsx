import Document, { Html, Main, } from 'next/document';
import { UniformDebug } from '@uniformdev/next';

import type { PageProps } from '@uniformdev/common-client';

class MyDocument extends Document {
  render() {
    const { head } = this.props;
    const page = this.props?.__NEXT_DATA__?.props?.pageProps as PageProps;
    if (!page) {
      return null;
    }

    const lang = page.lang || 'en';
    const uniformHead = head.filter((el) => el.type !== "meta");
    return (
      <Html lang={lang}>
        <head>{uniformHead}</head>
        <body>
            <UniformDebug />
            <Main />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
