'use client'

import { getCookie } from 'cookies-next'
import Script from 'next/script'

import { UKHSA_GDPR_COOKIE_ACCEPT_VALUE, UKHSA_GDPR_COOKIE_NAME } from '@/app/constants/cookies.constants'

// This needs to be a client component so that the script gets injected via JavaScript.
// As a server component, this type of conditional rendering won't work with our CloudFront CDN setup

export const ConsentScript = () => {
  const hasAcceptedCookies =
    !!getCookie(UKHSA_GDPR_COOKIE_NAME) && getCookie(UKHSA_GDPR_COOKIE_NAME) === UKHSA_GDPR_COOKIE_ACCEPT_VALUE

  return (
    <>
      {hasAcceptedCookies && (
        <Script
          id="google-analytics-with-consent"
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
    </>
  )
}
