import { ReactNode } from 'react'

import { getMenu } from '@/api/requests/menus/getMenu'
import { transformMenuResponse } from '@/api/requests/menus/helpers'
import { BackToTop } from '@/app/components/ui/ukhsa'
import { SideNav, SideNavLink, SideNavSubMenu, SideNavSubMenuLink } from '@/app/components/ui/ukhsa/SideNav/SideNav'
import { useTranslation } from '@/app/i18n'

export const LayoutSideNav = async ({ children }: { children: ReactNode }) => {
  const { t } = await useTranslation('common')
  const sideNav = transformMenuResponse(await getMenu())

  return (
    <>
      <div className="govuk-!-padding-top-4 flex flex-col gap-0 xl:flex-row xl:gap-7">
        <SideNav>
          {sideNav.map(({ title, slug, children }) => (
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
