'use Client'

import { SideNav, SideNavLink, SideNavSubMenu, SideNavSubMenuLink } from '../components/ui/ukhsa/SideNav/SideNav'

export default function Browse() {
  return (
    <div className="w-full">
      <SideNav browse>
        <SideNavLink
          href="/"
          subMenu={
            <SideNavSubMenu>
              <SideNavSubMenuLink href="/topics/coronavirus">COVID-19</SideNavSubMenuLink>
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
    </div>
  )
}
