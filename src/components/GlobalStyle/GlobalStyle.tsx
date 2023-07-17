import { Roboto } from 'next/font/google'
import { createGlobalStyle } from 'styled-components'

export const font = Roboto({ weight: ['400', '700'], subsets: ['latin'], display: 'swap', variable: '--font-primary' })

/**
 * A Styled Component to apply global style for use with govuk-react.
 *
 * - https://govuk-react.github.io/govuk-react/?path=/docs/global-style
 */

export const GlobalStyle = createGlobalStyle`
  :root {
    --font-primary: ${font.style.fontFamily};
  }

  * {
    padding: 0;
    margin: 0;
    // The below overrides are for the govuk-react library font (which cannot be modified)
    font-family: var(--font-primary) !important;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`

GlobalStyle.displayName = 'GlobalStyle'

export default GlobalStyle
