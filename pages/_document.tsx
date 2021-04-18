import { Children } from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheets } from '@material-ui/core/styles'

import theme from '@/styles/theme'
import { toPublicPath } from '@/utils/string'

export default class MyDocument extends Document {
  render () {
    return (
      <Html lang="ja">
        <Head>
          {/* PWA primary color */}
          <meta name="theme-color" content={theme.palette.primary.main} />
          <meta name="robots" content="noindex" />
          <link rel="apple-touch-icon" sizes="180x180" href={toPublicPath('/favicon/apple-touch-icon.png')} />
          <link rel="icon" type="image/png" sizes="32x32" href={toPublicPath('/favicon/favicon-32x32.png')} />
          <link rel="icon" type="image/png" sizes="16x16" href={toPublicPath('/favicon/favicon-16x16.png')} />
          <link rel="mask-icon" href={toPublicPath('/favicon/safari-pinned-tab.svg')} color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
          <link rel="manifest" href={toPublicPath('/manifest.json')} />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/earlyaccess/notosansjapanese.css"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

// https://github.com/mui-org/material-ui/blob/master/examples/nextjs/src/theme.js
// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets()
  const originalRenderPage = ctx.renderPage

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    })

  const initialProps = await Document.getInitialProps(ctx)

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [...Children.toArray(initialProps.styles), sheets.getStyleElement()],
  }
}
