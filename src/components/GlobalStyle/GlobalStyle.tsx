import { createGlobalStyle } from 'styled-components'
import localFont from 'next/font/local'

const GDSTransport = localFont({
  src: [
    {
      path: '../../../public/fonts/light-94a07e06a1-v2.woff2',
      weight: '400',
    },
    {
      path: '../../../public/fonts/bold-b542beb274-v2.woff2',
      weight: '700',
    },
  ],
})

/**
 * A Styled Component to apply global style for use with govuk-react.
 *
 * - https://govuk-react.github.io/govuk-react/?path=/docs/global-style
 */

export const GlobalStyle = createGlobalStyle`
  :root {
    --gds-transport-font: ${GDSTransport.style.fontFamily};
  }
`

GlobalStyle.displayName = 'GlobalStyle'

export default GlobalStyle
