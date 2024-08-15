import { ReactNode } from 'react'

import { getMenu } from '@/api/requests/menus/getMenu'
import { transformMenuSnippetToSideMenu } from '@/api/requests/menus/helpers'
import { BackToTop } from '@/app/components/ui/ukhsa'
import { SideNav, SideNavLink, SideNavSubMenu, SideNavSubMenuLink } from '@/app/components/ui/ukhsa/SideNav/SideNav'
import { flags } from '@/app/constants/flags.constants'
import { getServerTranslation } from '@/app/i18n'
import { getFeatureFlag } from '@/app/utils/flags.utils'

export const LayoutSideNav = async ({ children }: { children: ReactNode }) => {
  const { t } = await getServerTranslation('common')
  const sideNav = transformMenuSnippetToSideMenu(await getMenu())

  const { enabled: isMegaMenuEnabled } = await getFeatureFlag(flags.megaMenu)

  return (
    <>
      <div className="govuk-!-padding-top-4 flex flex-col gap-0 xl:flex-row xl:gap-7">
        {!isMegaMenuEnabled ? (
          <SideNav>
            {sideNav.map(({ title, slug, children }) => (
              <SideNavLink
                key={slug}
                href={slug}
                subMenu={
                  children &&
                  children.length > 0 && (
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
        ) : null}
        <main className="govuk-main-wrapper govuk-!-padding-top-0" id="main-content">
          {children}
        </main>
      </div>
      <BackToTop label={t('backToTop')} className="govuk-!-margin-bottom-4" />
    </>
  )
}
