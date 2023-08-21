'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script'
import { useEffect } from 'react'

import { isProd } from '@/app/utils/app.utils'

const TRACKING_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

interface GoogleAnalyticsProps {
  hasAcceptedCookies: boolean
}

export const GoogleAnalytics = ({ hasAcceptedCookies }: GoogleAnalyticsProps) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

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
      <Script id="ga" strategy="afterInteractive">
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
          id="ga-consent"
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
