import { ReactNode } from 'react'

import { useMenu } from '@/app/utils/menu.utils'

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
  const menu = await useMenu()

  return (
    <div className="flex flex-col gap-0 lg:flex-row lg:gap-7">
      <SideNav>
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
