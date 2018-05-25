import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { CSS } from 'rebass';

export default class MyDocument extends Document {
  render() {
    const sheet = new ServerStyleSheet();
    const main = sheet.collectStyles(<Main />);
    const styleTags = sheet.getStyleElement();

    return (
      <html>
        <Head>
          <title>file-stylez</title>
          <link
            href="https://fonts.googleapis.com/css?family=Roboto+Mono"
            rel="stylesheet"
          />
          <CSS css="*{box-sizing:border-box}body{margin:0;-webkit-font-smoothing:antialiased}" />
          {styleTags}
        </Head>
        <body>
          <div className="root">{main}</div>
          <NextScript />
        </body>
      </html>
    );
  }
}
