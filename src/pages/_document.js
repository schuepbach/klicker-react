/* eslint-disable react/no-danger */

import Document, { Head, Main, NextScript } from 'next/document'
import React from 'react'

if (typeof global.Intl !== 'object') {
  global.Intl = require('intl')
}

// The document (which is SSR-only) needs to be customized to expose the locale
// data for the user's locale for React Intl to work in the browser.
export default class IntlDocument extends Document {
  static async getInitialProps(context) {
    const props = await super.getInitialProps(context)
    const {
      req: { locale, localeDataScript },
    } = context

    return {
      ...props,
      locale,
      localeDataScript,
    }
  }

  render() {
    // Polyfill Intl API for older browsers
    const polyfill = `https://cdn.polyfill.io/v2/polyfill.min.js
      ?features=default-3.6,Intl,Intl.~locale.de,Intl.~locale.en,Array.prototype.includes,String.prototype.repeat,Symbol,Symbol.iterator`

    return (
      <html lang={this.props.locale}>
        <Head>
          <meta content="text/html; charset=utf-8" httpEquiv="Content-type" />
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <meta content="IE=Edge" httpEquiv="X-UA-Compatible" />
          <script src={polyfill} />
        </Head>
        <body>
          <Main />
          <script
            dangerouslySetInnerHTML={{
              __html: this.props.localeDataScript,
            }}
          />
          <NextScript />
        </body>
      </html>
    )
  }
}
