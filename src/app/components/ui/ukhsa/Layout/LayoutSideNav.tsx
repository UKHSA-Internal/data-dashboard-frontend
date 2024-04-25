import { ReactNode } from 'react'

import { BackToTop } from '@/app/components/ui/ukhsa'
import { SideNav, SideNavLink, SideNavSubMenu, SideNavSubMenuLink } from '@/app/components/ui/ukhsa/SideNav/SideNav'
import { useTranslation } from '@/app/i18n'
import { useMenu } from '@/app/utils/menu.utils'

export const LayoutSideNav = async ({ children }: { children: ReactNode }) => {
  const menu = await useMenu()
  const { t } = await useTranslation('common')

  return (
    <>
      <div className="govuk-!-padding-top-4 flex flex-col gap-0 xl:flex-row xl:gap-7">
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
        <main className="govuk-main-wrapper govuk-!-padding-top-0" id="main-content">
          {children}
        </main>
      </div>
      <BackToTop label={t('backToTop')} className="govuk-!-margin-bottom-4" />
    </>
  )
}
