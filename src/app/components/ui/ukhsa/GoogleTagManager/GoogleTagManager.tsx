import { GoogleTagManager as GTMNext } from '@next/third-parties/google'
import Script from 'next/script'
import { Suspense } from 'react'

import { ConsentScript } from './ConsentScript'

const GTM_ID = process.env.GOOGLE_TAG_MANAGER_ID

export const GoogleTagManager = () => {
  if (!GTM_ID.length) return null

  return (
    <>
      <GTMNext gtmId={GTM_ID} />
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
      <Suspense fallback={null}>
        <ConsentScript />
      </Suspense>
    </>
  )
}
