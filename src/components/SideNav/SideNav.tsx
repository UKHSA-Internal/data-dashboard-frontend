'use client'

import './SideNav.styles.css'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export interface SideNavProps {
  links: Array<{
    name: string
    href: string
    children: Array<{
      name: string
      href: string
    }>
  }>
}

export const SideNav = ({ links }: SideNavProps) => {
  const pathname = usePathname()

  return (
    // <nav className="ukhsa-sideNav-container moj-side-navigation">
    <nav className="moj-side-navigation govuk-!-padding-top-7">
      <ul className="moj-side-navigation__list">
        {links.map(({ name, href, children }, key: number) => {
          const isActive = pathname === href
          return (
            <>
              <li
                key={key}
                className={clsx('moj-side-navigation__item', {
                  'moj-side-navigation__item--active': isActive,
                })}
              >
                <Link
                  href={href}
                  className="govuk-link--no-visited-state moj-side-navigation__item"
                  aria-current={isActive ? 'page' : undefined}
                >
                  {name}
                </Link>
              </li>
              {children.map(({ name, href }, childKey: number) => {
                return (
                  <li key={childKey} className="ukhsa-sidenav-child">
                    <Link href={href}>{name}</Link>
                  </li>
                )
              })}
            </>
          )
        })}
      </ul>
    </nav>
  )
}
