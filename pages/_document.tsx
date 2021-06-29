import Document from "next/document";

class MyDocument extends Document {
  render() {
    const { head, html } = this.props;
    const page = this.props?.__NEXT_DATA__?.props?.pageProps?.page;
    if (!page) {
      return null;
    }

    const { fields } = page || {};
    const uniformHead = head.filter((el) => el.type !== "meta");
    return (
      <html lang={fields._lang}>
        <head>{uniformHead}</head>
        <body dangerouslySetInnerHTML={{ __html: html }} />
      </html>
    );
  }
}

export default MyDocument;
