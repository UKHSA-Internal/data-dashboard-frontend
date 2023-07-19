import './SideNav.styles.css'

import Link from 'next/link'

export interface SideNavProps {
  links: Array<{
    name: string
    href: string
    active?: boolean
  }>
}

export const SideNav = ({ links }: SideNavProps) => {
  return (
    <div className="ukhsa-sideNav-container">
      {links.map(({ name, href, active }, key: number) => (
        <Link key={key} href={href} className="govuk-link--no-visited-state ukhsa-sidenav-link flex hover:bg-grey-1">
          {name}
        </Link>
      ))}
    </div>
  )
}
