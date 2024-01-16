import { getCookie } from 'cookies-next'
import Script from 'next/script'

import { UKHSA_GDPR_COOKIE_ACCEPT_VALUE, UKHSA_GDPR_COOKIE_NAME } from '@/app/constants/cookies.constants'

const GTM_ID = process.env.GOOGLE_TAG_MANAGER_ID

export const GoogleTagManager = () => {
  const hasAcceptedCookies =
    !!getCookie(UKHSA_GDPR_COOKIE_NAME) && getCookie(UKHSA_GDPR_COOKIE_NAME) === UKHSA_GDPR_COOKIE_ACCEPT_VALUE

  if (!GTM_ID.length) return null

  return (
    <>
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          
          gtag('consent', 'default', {
            'ad_storage': 'denied',
            'analytics_storage': 'denied'
          });
                    
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');`}
      </Script>
      {hasAcceptedCookies && (
        <Script
          id="google-tag-manager-with-consent"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
        gtag('consent', 'update', {
          'ad_storage': 'granted',
          'analytics_storage': 'granted'
        });
      `,
          }}
        />
      )}
      <noscript
        dangerouslySetInnerHTML={{
          __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display: none; visibility: hidden;" />`,
        }}
      />
    </>
  )
}
