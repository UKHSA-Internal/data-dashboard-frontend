'use client'
import { getCookie, setCookie } from 'cookies-next'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { MouseEventHandler, ReactNode, useEffect, useRef, useState } from 'react'

import {
  UKHSA_GDPR_COOKIE_ACCEPT_VALUE,
  UKHSA_GDPR_COOKIE_NAME,
  UKHSA_GDPR_COOKIE_REJECT_VALUE,
} from '@/app/constants/cookies.constants'
import { useNavigationEvent } from '@/app/hooks/useNavigationEvent'
import { getGDPRCookieExpiryDate } from '@/app/utils/date.utils'
import { pageView } from '@/lib/gtag'

enum CookieBannerView {
  Hidden,
  Selection,
  Accepted,
  Rejected,
}

interface CookieBannerProps {
  title: ReactNode
  body: ReactNode
  cookie: string | undefined
}

export const CookieBanner = ({ title, body, cookie }: CookieBannerProps) => {
  const [view, setView] = useState(!!cookie ? CookieBannerView.Hidden : CookieBannerView.Selection)

  const regionRef = useRef<HTMLDivElement>(null)

  const router = useRouter()

  useNavigationEvent((url) => {
    if (url.includes('?change-settings=1')) {
      setView(CookieBannerView.Selection)
      regionRef?.current?.focus()
    } else {
      // Hide banner after navigating away from cookie policy page
      const isCookieSet = !!getCookie(UKHSA_GDPR_COOKIE_NAME)
      if (view === CookieBannerView.Selection && isCookieSet) {
        setView(CookieBannerView.Hidden)
      }
    }
  })

  useEffect(() => {
    // Set focus on confirmation screen
    if (view === CookieBannerView.Accepted || view === CookieBannerView.Rejected) {
      regionRef.current?.focus()
    }

    // Set focus after clicking "change settings"
    if (view === CookieBannerView.Selection && cookie) {
      regionRef.current?.focus()
    }
  }, [view])

  const updateQueryParams = () => {
    const url = new URL(window.location.href)
    if (url.searchParams.has('change-settings')) {
      url.searchParams.delete('change-settings')
      router.push(url.toString())
    }
  }

  const handleAccept: MouseEventHandler = () => {
    setView(CookieBannerView.Accepted)
    setCookie(UKHSA_GDPR_COOKIE_NAME, UKHSA_GDPR_COOKIE_ACCEPT_VALUE, {
      expires: getGDPRCookieExpiryDate(),
      secure: true,
    })
    window.gtag &&
      window.gtag('consent', 'update', {
        ad_storage: 'granted',
        analytics_storage: 'granted',
      })
    pageView(window.location.href)
    updateQueryParams()
  }

  const handleReject: MouseEventHandler = () => {
    setView(CookieBannerView.Rejected)
    setCookie(UKHSA_GDPR_COOKIE_NAME, UKHSA_GDPR_COOKIE_REJECT_VALUE, {
      expires: getGDPRCookieExpiryDate(),
      secure: true,
    })
    window.gtag &&
      window.gtag('consent', 'update', {
        ad_storage: 'denied',
        analytics_storage: 'denied',
      })
    updateQueryParams()
  }

  const handleHide: MouseEventHandler = () => {
    setView(CookieBannerView.Hidden)
  }

  const handleViewCookies: MouseEventHandler = (event) => {
    event.preventDefault()
    setView(CookieBannerView.Hidden)
    router.push('/cookies')
  }

  const handleChange: MouseEventHandler = (e) => {
    e.preventDefault()
    setView(CookieBannerView.Selection)
  }

  const renderSelection = () => {
    return (
      <div className="govuk-cookie-banner__message govuk-width-container">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <h2 className="govuk-cookie-banner__heading govuk-heading-m">{title}</h2>
            {body}
          </div>
        </div>

        <div className="govuk-button-group">
          <button value="accept" type="button" name="cookies" className="govuk-button" onClick={handleAccept}>
            Accept additional cookies
          </button>
          <button value="reject" type="button" name="cookies" className="govuk-button" onClick={handleReject}>
            Reject additional cookies
          </button>
          <Link className="govuk-link" href="/cookies">
            View cookies
          </Link>
        </div>
      </div>
    )
  }

  const renderConfirmation = () => {
    return (
      <div className="govuk-cookie-banner__message govuk-width-container">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <div className="govuk-cookie-banner__content focus:outline-0" tabIndex={-1} ref={regionRef}>
              <p className="govuk-body" data-testid="confirmation-message">
                You’ve {view === CookieBannerView.Accepted ? 'accepted' : 'rejected'} additional cookies. You can view
                the{' '}
                <Link className="govuk-link" href="/cookies" onClick={handleViewCookies}>
                  cookie policy
                </Link>{' '}
                or{' '}
                <a className="govuk-link" href="#cookie-banner" onClick={handleChange}>
                  change your cookie settings
                </a>{' '}
                at any time.
              </p>
            </div>
          </div>
        </div>
        <div className="govuk-button-group mb-0">
          <button className="govuk-button" onClick={handleHide}>
            Hide cookie message
          </button>
        </div>
      </div>
    )
  }

  if (view === CookieBannerView.Hidden) return null

  return (
    <div
      className="govuk-cookie-banner govuk-!-padding-top-5 govuk-!-padding-bottom-3 w-full"
      data-nosnippet=""
      role="region"
      aria-label="Cookies on the UKHSA data dashboard"
    >
      {view === CookieBannerView.Selection ? renderSelection() : renderConfirmation()}
    </div>
  )
}
