import Script from 'next/script'

import { isWellKnownEnvironment } from '@/app/utils/app.utils'

const jsEnabledScript = `document.body.classList.add('js-enabled', 'noModule' in HTMLScriptElement.prototype ? 'govuk-frontend-supported' : '');`

/**
 * Adds the `js-enabled` class to the body to prevent flash of unstyled content (FOUC).
 * In production (well-known environments), a plain `<script>` tag is used to avoid FOUC.
 * In development, Next.js's <Script /> component is used to prevent console warnings.
 */
export const GovUK = () => {
  if (isWellKnownEnvironment()) {
    // In production environments, use a raw <script> tag to avoid FOUC.
    return <script id="js-enabled" dangerouslySetInnerHTML={{ __html: jsEnabledScript }} />
  }

  // In development, use Next.js's <Script> component to avoid warnings.
  return (
    <Script id="js-enabled" strategy="afterInteractive">
      {jsEnabledScript}
    </Script>
  )
}
