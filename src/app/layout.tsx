import { Roboto } from 'next/font/google'

const font = Roboto({ weight: ['400', '700'], subsets: ['latin'], display: 'swap', variable: '--font-primary' })

import './globals.scss'

import Link from 'next/link'
import { Suspense } from 'react'
import { Trans } from 'react-i18next/TransWithoutContext'

import { TopNav } from '@/app/components/ui/ukhsa/TopNav/TopNav'
import { useTranslation } from '@/app/i18n'

import MapDialog from './(topics)/(extreme-events)/weather-health-alerts/components/MapDialog'
import { Footer } from './components/ui/govuk'
import { Announcement, CookieBanner, GoogleTagManager } from './components/ui/ukhsa'
import { SideNavLink, SideNavSubMenu, SideNavSubMenuLink } from './components/ui/ukhsa/SideNav/SideNav'
import { MapContextProvider } from './context/MapContext'
import { useGlobalBanner } from './hooks/useGlobalBanner'
import { useMenu } from './utils/menu.utils'

// Force all pages to be dynamic (ssr)
export const dynamic = 'force-dynamic'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const menu = await useMenu()
  const { t } = await useTranslation('common')

  const globalBanner = await useGlobalBanner()

  return (
    <html lang="en" className={`govuk-template ${font.variable} font-sans`}>
      <body className="govuk-template__body">
        <GoogleTagManager />
        {/* Adds the js-enabled class as a high priority script to prevent flash of unstyled content (fouc)
        Note: The NextJs <Script /> component using a beforeInteractie strategy is broken in 13.5.3 */}
        <script
          id="js-enabled"
          dangerouslySetInnerHTML={{
            __html:
              "document.body.className += ' js-enabled' + ('noModule' in HTMLScriptElement.prototype ? ' govuk-frontend-supported' : '');",
          }}
        />

        <a href="#main-content" className="govuk-skip-link" data-module="govuk-skip-link">
          {t('skipLink')}
        </a>
        <Suspense fallback={null}>
          <CookieBanner
            title={t('cookieBanner.title')}
            body={<Trans i18nKey="cookieBanner.body" t={t} components={[<p key={0} />, <p key={1} />]} />}
          />
        </Suspense>

        <header className="govuk-header" data-module="govuk-header">
          <div className="relative">
            <div className="govuk-header__container govuk-width-container">
              <div className="govuk-header__logo">
                <Link href="/" className="govuk-header__link govuk-header__link--homepage">
                  <svg
                    focusable="false"
                    role="img"
                    className="govuk-header__logotype"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 148 30"
                    height="30"
                    width="148"
                    aria-label="GOV.UK"
                  >
                    <title>GOV.UK</title>
                    <path d="M22.6 10.4c-1 .4-2-.1-2.4-1-.4-.9.1-2 1-2.4.9-.4 2 .1 2.4 1s-.1 2-1 2.4m-5.9 6.7c-.9.4-2-.1-2.4-1-.4-.9.1-2 1-2.4.9-.4 2 .1 2.4 1s-.1 2-1 2.4m10.8-3.7c-1 .4-2-.1-2.4-1-.4-.9.1-2 1-2.4.9-.4 2 .1 2.4 1s0 2-1 2.4m3.3 4.8c-1 .4-2-.1-2.4-1-.4-.9.1-2 1-2.4.9-.4 2 .1 2.4 1s-.1 2-1 2.4M17 4.7l2.3 1.2V2.5l-2.3.7-.2-.2.9-3h-3.4l.9 3-.2.2c-.1.1-2.3-.7-2.3-.7v3.4L15 4.7c.1.1.1.2.2.2l-1.3 4c-.1.2-.1.4-.1.6 0 1.1.8 2 1.9 2.2h.7c1-.2 1.9-1.1 1.9-2.1 0-.2 0-.4-.1-.6l-1.3-4c-.1-.2 0-.2.1-.3m-7.6 5.7c.9.4 2-.1 2.4-1 .4-.9-.1-2-1-2.4-.9-.4-2 .1-2.4 1s0 2 1 2.4m-5 3c.9.4 2-.1 2.4-1 .4-.9-.1-2-1-2.4-.9-.4-2 .1-2.4 1s.1 2 1 2.4m-3.2 4.8c.9.4 2-.1 2.4-1 .4-.9-.1-2-1-2.4-.9-.4-2 .1-2.4 1s0 2 1 2.4m14.8 11c4.4 0 8.6.3 12.3.8 1.1-4.5 2.4-7 3.7-8.8l-2.5-.9c.2 1.3.3 1.9 0 2.7-.4-.4-.8-1.1-1.1-2.3l-1.2 4c.7-.5 1.3-.8 2-.9-1.1 2.5-2.6 3.1-3.5 3-1.1-.2-1.7-1.2-1.5-2.1.3-1.2 1.5-1.5 2.1-.1 1.1-2.3-.8-3-2-2.3 1.9-1.9 2.1-3.5.6-5.6-2.1 1.6-2.1 3.2-1.2 5.5-1.2-1.4-3.2-.6-2.5 1.6.9-1.4 2.1-.5 1.9.8-.2 1.1-1.7 2.1-3.5 1.9-2.7-.2-2.9-2.1-2.9-3.6.7-.1 1.9.5 2.9 1.9l.4-4.3c-1.1 1.1-2.1 1.4-3.2 1.4.4-1.2 2.1-3 2.1-3h-5.4s1.7 1.9 2.1 3c-1.1 0-2.1-.2-3.2-1.4l.4 4.3c1-1.4 2.2-2 2.9-1.9-.1 1.5-.2 3.4-2.9 3.6-1.9.2-3.4-.8-3.5-1.9-.2-1.3 1-2.2 1.9-.8.7-2.3-1.2-3-2.5-1.6.9-2.2.9-3.9-1.2-5.5-1.5 2-1.3 3.7.6 5.6-1.2-.7-3.1 0-2 2.3.6-1.4 1.8-1.1 2.1.1.2.9-.3 1.9-1.5 2.1-.9.2-2.4-.5-3.5-3 .6 0 1.2.3 2 .9l-1.2-4c-.3 1.1-.7 1.9-1.1 2.3-.3-.8-.2-1.4 0-2.7l-2.9.9C1.3 23 2.6 25.5 3.7 30c3.7-.5 7.9-.8 12.3-.8m28.3-11.6c0 .9.1 1.7.3 2.5.2.8.6 1.5 1 2.2.5.6 1 1.1 1.7 1.5.7.4 1.5.6 2.5.6.9 0 1.7-.1 2.3-.4s1.1-.7 1.5-1.1c.4-.4.6-.9.8-1.5.1-.5.2-1 .2-1.5v-.2h-5.3v-3.2h9.4V28H55v-2.5c-.3.4-.6.8-1 1.1-.4.3-.8.6-1.3.9-.5.2-1 .4-1.6.6s-1.2.2-1.8.2c-1.5 0-2.9-.3-4-.8-1.2-.6-2.2-1.3-3-2.3-.8-1-1.4-2.1-1.8-3.4-.3-1.4-.5-2.8-.5-4.3s.2-2.9.7-4.2c.5-1.3 1.1-2.4 2-3.4.9-1 1.9-1.7 3.1-2.3 1.2-.6 2.6-.8 4.1-.8 1 0 1.9.1 2.8.3.9.2 1.7.6 2.4 1s1.4.9 1.9 1.5c.6.6 1 1.3 1.4 2l-3.7 2.1c-.2-.4-.5-.9-.8-1.2-.3-.4-.6-.7-1-1-.4-.3-.8-.5-1.3-.7-.5-.2-1.1-.2-1.7-.2-1 0-1.8.2-2.5.6-.7.4-1.3.9-1.7 1.5-.5.6-.8 1.4-1 2.2-.3.8-.4 1.9-.4 2.7zM71.5 6.8c1.5 0 2.9.3 4.2.8 1.2.6 2.3 1.3 3.1 2.3.9 1 1.5 2.1 2 3.4s.7 2.7.7 4.2-.2 2.9-.7 4.2c-.4 1.3-1.1 2.4-2 3.4-.9 1-1.9 1.7-3.1 2.3-1.2.6-2.6.8-4.2.8s-2.9-.3-4.2-.8c-1.2-.6-2.3-1.3-3.1-2.3-.9-1-1.5-2.1-2-3.4-.4-1.3-.7-2.7-.7-4.2s.2-2.9.7-4.2c.4-1.3 1.1-2.4 2-3.4.9-1 1.9-1.7 3.1-2.3 1.2-.5 2.6-.8 4.2-.8zm0 17.6c.9 0 1.7-.2 2.4-.5s1.3-.8 1.7-1.4c.5-.6.8-1.3 1.1-2.2.2-.8.4-1.7.4-2.7v-.1c0-1-.1-1.9-.4-2.7-.2-.8-.6-1.6-1.1-2.2-.5-.6-1.1-1.1-1.7-1.4-.7-.3-1.5-.5-2.4-.5s-1.7.2-2.4.5-1.3.8-1.7 1.4c-.5.6-.8 1.3-1.1 2.2-.2.8-.4 1.7-.4 2.7v.1c0 1 .1 1.9.4 2.7.2.8.6 1.6 1.1 2.2.5.6 1.1 1.1 1.7 1.4.6.3 1.4.5 2.4.5zM88.9 28 83 7h4.7l4 15.7h.1l4-15.7h4.7l-5.9 21h-5.7zm28.8-3.6c.6 0 1.2-.1 1.7-.3.5-.2 1-.4 1.4-.8.4-.4.7-.8.9-1.4.2-.6.3-1.2.3-2v-13h4.1v13.6c0 1.2-.2 2.2-.6 3.1s-1 1.7-1.8 2.4c-.7.7-1.6 1.2-2.7 1.5-1 .4-2.2.5-3.4.5-1.2 0-2.4-.2-3.4-.5-1-.4-1.9-.9-2.7-1.5-.8-.7-1.3-1.5-1.8-2.4-.4-.9-.6-2-.6-3.1V6.9h4.2v13c0 .8.1 1.4.3 2 .2.6.5 1 .9 1.4.4.4.8.6 1.4.8.6.2 1.1.3 1.8.3zm13-17.4h4.2v9.1l7.4-9.1h5.2l-7.2 8.4L148 28h-4.9l-5.5-9.4-2.7 3V28h-4.2V7zm-27.6 16.1c-1.5 0-2.7 1.2-2.7 2.7s1.2 2.7 2.7 2.7 2.7-1.2 2.7-2.7-1.2-2.7-2.7-2.7z"></path>
                  </svg>
                </Link>
              </div>
              <div className="govuk-header__content inline w-auto sm:w-5/12">
                <Link href="/" className="govuk-header__link govuk-header__service-name">
                  {t('serviceTitle')}
                </Link>
              </div>
            </div>

            <TopNav>
              {menu.map(({ title, slug, children }) => (
                <SideNavLink
                  key={slug}
                  href={slug}
                  subMenu={
                    children && (
                      <SideNavSubMenu>
                        {children.map(({ title, slug }) => (
                          <SideNavSubMenuLink key={slug} href={slug}>
                            {title}
                          </SideNavSubMenuLink>
                        ))}
                      </SideNavSubMenu>
                    )
                  }
                >
                  {title}
                </SideNavLink>
              ))}
            </TopNav>
          </div>
        </header>
        <div className="govuk-width-container print:hidden">
          <div className="govuk-phase-banner" data-testid="ukhsa-phase-banner">
            <p className="govuk-phase-banner__content">
              <strong className="govuk-tag govuk-phase-banner__content__tag">{t('feedbackBannerPhase')}</strong>
              <Trans i18nKey="feedbackBanner" t={t}>
                <span className="govuk-phase-banner__text">
                  <Link className="govuk-link govuk-link--no-visited-state" href="/feedback" />
                </span>
              </Trans>
            </p>
          </div>
        </div>

        {globalBanner ? (
          <div className="govuk-width-container">
            <div className="govuk-grid-row">
              <div className="govuk-grid-column-three-quarters">
                <Announcement
                  heading={globalBanner.heading}
                  variant={globalBanner.variant}
                  className="govuk-!-margin-top-4 govuk-!-margin-bottom-1"
                >
                  {globalBanner.body}
                </Announcement>
              </div>
            </div>
          </div>
        ) : null}

        <div className="govuk-width-container">{children}</div>

        <MapContextProvider>
          <MapDialog />
        </MapContextProvider>

        <Footer />
      </body>
    </html>
  )
}
