import Document, { Html, Main, } from 'next/document'

class MyDocument extends Document {
  render() {
    const { head } = this.props;
    const page = this.props?.__NEXT_DATA__?.props?.pageProps?.page;
    if (!page) {
      return null;
    }

    const { fields } = page || {};
    const uniformHead = head.filter((el) => el.type !== "meta");
    return (
      <Html lang={fields._lang}>
        <head>{uniformHead}</head>
        <body>
            <Main />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
