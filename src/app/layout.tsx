import { Roboto } from 'next/font/google'

const font = Roboto({ weight: ['400', '700'], subsets: ['latin'], display: 'swap', variable: '--font-primary' })

import './globals.scss'

import Link from 'next/link'
import { Suspense } from 'react'
import { Trans } from 'react-i18next/TransWithoutContext'

import { TopNav } from '@/app/components/ui/ukhsa/TopNav/TopNav'
import { useTranslation } from '@/app/i18n'

import { Footer } from './components/ui/govuk'
import { CookieBanner, GoogleAnalytics } from './components/ui/ukhsa'
import { SideNavLink, SideNavSubMenu, SideNavSubMenuLink } from './components/ui/ukhsa/SideNav/SideNav'
import { useMenu } from './utils/menu.utils'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const menu = await useMenu()
  const { t } = await useTranslation('common')

  return (
    <html lang="en" className={`govuk-template ${font.variable} font-sans`}>
      <Suspense fallback={null}>
        <GoogleAnalytics />
      </Suspense>
      <body className="govuk-template__body">
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

        <header className="govuk-header" role="banner" data-module="govuk-header">
          <div className="relative">
            <div className="govuk-header__container govuk-width-container">
              <div className="govuk-header__logo">
                <Link href="/" className="govuk-header__link govuk-header__link--homepage">
                  <svg
                    focusable="false"
                    role="img"
                    className="govuk-header__logotype"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 152 30"
                    height="30"
                    width="152"
                    aria-label="GOV.UK"
                  >
                    <title>GOV.UK</title>
                    <path d="M6.7 12.2c1 .4 2.1-.1 2.5-1s-.1-2.1-1-2.5c-1-.4-2.1.1-2.5 1-.4 1 0 2.1 1 2.5m-4.3 2.5c1 .4 2.1-.1 2.5-1s-.1-2.1-1-2.5c-1-.4-2.1.1-2.5 1-.5 1 0 2.1 1 2.5m-1.3 4.8c1 .4 2.1-.1 2.5-1 .4-1-.1-2.1-1-2.5-1-.4-2.1.1-2.5 1-.4 1 0 2.1 1 2.5m10.4-5.8c1 .4 2.1-.1 2.5-1s-.1-2.1-1-2.5c-1-.4-2.1.1-2.5 1s0 2.1 1 2.5m17.4-1.5c-1 .4-2.1-.1-2.5-1s.1-2.1 1-2.5c1-.4 2.1.1 2.5 1 .5 1 0 2.1-1 2.5m4.3 2.5c-1 .4-2.1-.1-2.5-1s.1-2.1 1-2.5c1-.4 2.1.1 2.5 1 .5 1 0 2.1-1 2.5m1.3 4.8c-1 .4-2.1-.1-2.5-1-.4-1 .1-2.1 1-2.5 1-.4 2.1.1 2.5 1 .4 1 0 2.1-1 2.5m-10.4-5.8c-1 .4-2.1-.1-2.5-1s.1-2.1 1-2.5c1-.4 2.1.1 2.5 1s0 2.1-1 2.5m-5.3-4.9 2.4 1.3V6.5l-2.4.8c-.1-.1-.1-.2-.2-.2s1-3 1-3h-3.4l1 3c-.1.1-.2.1-.2.2-.1.1-2.4-.7-2.4-.7v3.5L17 8.8c-.1.1 0 .2.1.3l-1.4 4.2c-.1.2-.1.4-.1.7 0 1.1.8 2.1 1.9 2.2h.6C19.2 16 20 15.1 20 14c0-.2 0-.4-.1-.7l-1.4-4.2c.2-.1.3-.2.3-.3m-1 20.3c4.6 0 8.9.3 12.8.9 1.1-4.6 2.4-7.2 3.8-9.1l-2.6-.9c.3 1.3.3 1.9 0 2.8-.4-.4-.8-1.2-1.1-2.4l-1.2 4.2c.8-.5 1.4-.9 2-.9-1.2 2.6-2.7 3.2-3.6 3-1.2-.2-1.7-1.3-1.5-2.2.3-1.3 1.6-1.6 2.2-.1 1.2-2.4-.8-3.1-2.1-2.4 1.9-1.9 2.2-3.6.6-5.7-2.2 1.7-2.2 3.3-1.2 5.6-1.3-1.5-3.3-.7-2.5 1.7.9-1.4 2.1-.5 2 .8-.2 1.2-1.7 2.1-3.7 2-2.8-.2-3-2.2-3-3.7.7-.1 1.9.5 3 2l.4-4.4c-1.1 1.2-2.2 1.4-3.3 1.4.4-1.2 2.1-3.1 2.1-3.1h-5.5s1.8 2 2.1 3.1c-1.1 0-2.2-.3-3.3-1.4l.4 4.4c1.1-1.5 2.3-2.1 3-2-.1 1.6-.2 3.5-3 3.7-1.9.2-3.5-.8-3.7-2-.2-1.3 1-2.2 1.9-.8.7-2.4-1.3-3.1-2.6-1.7 1-2.3 1-4-1.2-5.6-1.6 2.1-1.3 3.8.6 5.7-1.3-.7-3.2 0-2.1 2.4.6-1.5 1.9-1.1 2.2.1.2.9-.4 1.9-1.5 2.2-1 .2-2.5-.5-3.7-3 .7 0 1.3.4 2 .9L5 20.4c-.3 1.2-.7 1.9-1.2 2.4-.3-.8-.2-1.5 0-2.8l-2.6.9C2.7 22.8 4 25.4 5.1 30c3.8-.5 8.2-.9 12.7-.9m30.5-11.5c0 .9.1 1.7.3 2.5.2.8.6 1.5 1 2.2.5.6 1 1.1 1.7 1.5.7.4 1.5.6 2.5.6.9 0 1.7-.1 2.3-.4s1.1-.7 1.5-1.1c.4-.4.6-.9.8-1.5.1-.5.2-1 .2-1.5v-.2h-5.3v-3.2h9.4V28H59v-2.5c-.3.4-.6.8-1 1.1-.4.3-.8.6-1.3.9-.5.2-1 .4-1.6.6s-1.2.2-1.8.2c-1.5 0-2.9-.3-4-.8-1.2-.6-2.2-1.3-3-2.3-.8-1-1.4-2.1-1.8-3.4-.3-1.4-.5-2.8-.5-4.3s.2-2.9.7-4.2c.5-1.3 1.1-2.4 2-3.4.9-1 1.9-1.7 3.1-2.3 1.2-.6 2.6-.8 4.1-.8 1 0 1.9.1 2.8.3.9.2 1.7.6 2.4 1s1.4.9 1.9 1.5c.6.6 1 1.3 1.4 2l-3.7 2.1c-.2-.4-.5-.9-.8-1.2-.3-.4-.6-.7-1-1-.4-.3-.8-.5-1.3-.7-.5-.2-1.1-.2-1.7-.2-1 0-1.8.2-2.5.6-.7.4-1.3.9-1.7 1.5-.5.6-.8 1.4-1 2.2-.3.8-.4 1.9-.4 2.7zm36.4-4.3c-.4-1.3-1.1-2.4-2-3.4-.9-1-1.9-1.7-3.1-2.3-1.2-.6-2.6-.8-4.2-.8s-2.9.3-4.2.8c-1.1.6-2.2 1.4-3 2.3-.9 1-1.5 2.1-2 3.4-.4 1.3-.7 2.7-.7 4.2s.2 2.9.7 4.2c.4 1.3 1.1 2.4 2 3.4.9 1 1.9 1.7 3.1 2.3 1.2.6 2.6.8 4.2.8 1.5 0 2.9-.3 4.2-.8 1.2-.6 2.3-1.3 3.1-2.3.9-1 1.5-2.1 2-3.4.4-1.3.7-2.7.7-4.2-.1-1.5-.3-2.9-.8-4.2zM81 17.6c0 1-.1 1.9-.4 2.7-.2.8-.6 1.6-1.1 2.2-.5.6-1.1 1.1-1.7 1.4-.7.3-1.5.5-2.4.5-.9 0-1.7-.2-2.4-.5s-1.3-.8-1.7-1.4c-.5-.6-.8-1.3-1.1-2.2-.2-.8-.4-1.7-.4-2.7v-.1c0-1 .1-1.9.4-2.7.2-.8.6-1.6 1.1-2.2.5-.6 1.1-1.1 1.7-1.4.7-.3 1.5-.5 2.4-.5.9 0 1.7.2 2.4.5s1.3.8 1.7 1.4c.5.6.8 1.3 1.1 2.2.2.8.4 1.7.4 2.7v.1zM92.9 28 87 7h4.7l4 15.7h.1l4-15.7h4.7l-5.9 21h-5.7zm28.8-3.6c.6 0 1.2-.1 1.7-.3.5-.2 1-.4 1.4-.8.4-.4.7-.8.9-1.4.2-.6.3-1.2.3-2v-13h4.1v13.6c0 1.2-.2 2.2-.6 3.1s-1 1.7-1.8 2.4c-.7.7-1.6 1.2-2.7 1.5-1 .4-2.2.5-3.4.5-1.2 0-2.4-.2-3.4-.5-1-.4-1.9-.9-2.7-1.5-.8-.7-1.3-1.5-1.8-2.4-.4-.9-.6-2-.6-3.1V6.9h4.2v13c0 .8.1 1.4.3 2 .2.6.5 1 .9 1.4.4.4.8.6 1.4.8.6.2 1.1.3 1.8.3zm13-17.4h4.2v9.1l7.4-9.1h5.2l-7.2 8.4L152 28h-4.9l-5.5-9.4-2.7 3V28h-4.2V7zm-27.6 16.1c-1.5 0-2.7 1.2-2.7 2.7s1.2 2.7 2.7 2.7 2.7-1.2 2.7-2.7-1.2-2.7-2.7-2.7z"></path>
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
        <div className="govuk-width-container">
          <main className="govuk-main-wrapper govuk-!-padding-top-4" id="main-content" role="main">
            {children}
          </main>
        </div>
        <Footer />
      </body>
    </html>
  )
}
