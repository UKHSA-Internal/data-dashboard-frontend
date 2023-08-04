import { ReactNode } from 'react'

import { useTranslation } from '../../../../i18n'
import { SideNav, SideNavLink, SideNavSubMenu, SideNavSubMenuLink } from '../SideNav/SideNav'

interface PageProps {
  heading?: string
  showWelcome?: ReactNode
  description?: string
  children: ReactNode
  lastUpdated?: string
}

export async function View({ heading, showWelcome, children, description, lastUpdated }: PageProps) {
  const { t } = await useTranslation('common')

  return (
    <div className="flex flex-col gap-0 lg:flex-row lg:gap-7">
      <SideNav>
        <SideNavLink
          href="/"
          subMenu={
            <SideNavSubMenu>
              <SideNavSubMenuLink href="/topics/covid-19">COVID-19</SideNavSubMenuLink>
              <SideNavSubMenuLink href="/topics/influenza">Influenza</SideNavSubMenuLink>
              <SideNavSubMenuLink href="/topics/other-respiratory-viruses">
                Other respiratory viruses
              </SideNavSubMenuLink>
            </SideNavSubMenu>
          }
        >
          Dashboard
        </SideNavLink>
        <SideNavLink href={`${process.env.PUBLIC_API_URL}/api/public/timeseries`}>API</SideNavLink>
        <SideNavLink href="/about">About</SideNavLink>
        <SideNavLink href="/whats-new">What&apos;s new</SideNavLink>
      </SideNav>

      <div className="w-full">
        {lastUpdated && (
          <p className="govuk-!-margin-bottom-4 govuk-body-s">{t('lastUpdated', { value: new Date(lastUpdated) })}</p>
        )}

        {showWelcome && <p className="govuk-body-l govuk-!-margin-bottom-1 text-dark-grey">{t('welcome')}</p>}

        {heading && <h1 className="govuk-heading-xl govuk-!-margin-bottom-4">{heading}</h1>}

        {description && <div dangerouslySetInnerHTML={{ __html: description }} />}

        {children}
      </div>
    </div>
  )
}
