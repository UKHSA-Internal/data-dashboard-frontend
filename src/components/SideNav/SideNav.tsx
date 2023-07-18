import './SideNav.styles.css'

import Link from 'next/link'

export interface SideNavProps {
  links: Array<{
    name: string
    href: string
  }>
}

export const SideNav = ({ links }: SideNavProps) => {
  return (
    <div className="ukhsa-sideNav-container">
      {links.map((link, key: number) => (
        <Link
          key={key}
          href={link.href}
          className="govuk-link--no-visited-state ukhsa-sidenav-link flex hover:bg-grey-1"
        >
          {link.name}
        </Link>
      ))}
    </div>
  )
}
