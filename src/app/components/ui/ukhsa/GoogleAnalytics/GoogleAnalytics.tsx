'use client'

import { getCookie } from 'cookies-next'
import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script'
import { useEffect } from 'react'

import { UKHSA_GDPR_COOKIE_ACCEPT_VALUE, UKHSA_GDPR_COOKIE_NAME } from '@/app/constants/cookies.constants'
import { isProd } from '@/app/utils/app.utils'

const TRACKING_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

export const GoogleAnalytics = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const hasAcceptedCookies =
    !!getCookie(UKHSA_GDPR_COOKIE_NAME) && getCookie(UKHSA_GDPR_COOKIE_NAME) === UKHSA_GDPR_COOKIE_ACCEPT_VALUE

  useEffect(() => {
    if (!TRACKING_ID || !isProd()) return

    const url = `${pathname}${!!searchParams.toString() ? `?${searchParams.toString()}` : ''}`

    gtag('config', TRACKING_ID, {
      send_page_view: false, // manually send page views to have full control
    })

    gtag('event', 'page_view', {
      page_path: url,
      send_to: TRACKING_ID,
    })
  }, [pathname, searchParams, hasAcceptedCookies])

  if (!TRACKING_ID.length || !isProd()) return null

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${TRACKING_ID}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('consent', 'default', {
            'ad_storage': 'denied',
            'analytics_storage': 'denied'
          });
          gtag('js', new Date());
        `}
      </Script>
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
