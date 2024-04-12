'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

/**
 * SideNav
 */
export const SideNav = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <nav
        className="sticky top-4 mt-0 hidden h-max min-w-[var(--ukhsa-nav-width)] overflow-hidden xl:block"
        id="ukhsa-sidenav"
        aria-label="Side navigation"
      >
        <ul>{children}</ul>
      </nav>
    </>
  )
}

/**
 * SideNav link
 */
interface SideNavLinkProps {
  children: ReactNode
  href: string
  subMenu?: ReactNode
}

export const SideNavLink = ({ children, href, subMenu }: SideNavLinkProps) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <li>
      <Link
        href={href}
        className={clsx(
          'govuk-link--no-visited-state block border-l-4 px-2 py-3 no-underline decoration-1 hover:underline xl:py-[8px] [&:focus]:border-l-transparent',
          {
            'font-bold [&:not(:focus)]:border-blue [&:not(:focus)]:bg-grey-3': isActive,
            'border-transparent no-underline': !isActive,
          }
        )}
        aria-current={isActive ? 'page' : undefined}
      >
        {children}
      </Link>
      {subMenu}
    </li>
  )
}

/**
 * SideNav Submenu
 */
interface SideNavSubMenuProps {
  children: ReactNode
}

export const SideNavSubMenu = ({ children }: SideNavSubMenuProps) => {
  return <ul className="xl:my-2">{children}</ul>
}

/**
 * SideNav Submenu link
 */
interface SideNavSubMenuLinkProps {
  children: ReactNode
  href: string
}

export const SideNavSubMenuLink = ({ children, href }: SideNavSubMenuLinkProps) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <li className={clsx('govuk-!-margin-left-2 bg-dash bg-[left_center] bg-no-repeat xl:py-1')}>
      <Link
        href={href}
        className={clsx(
          'govuk-link--no-visited-state block py-3 pl-6 decoration-1 hover:underline xl:ml-6 xl:inline-block xl:p-0',
          {
            'text-black underline': isActive,
            'no-underline': !isActive,
          }
        )}
        aria-current={isActive ? 'page' : undefined}
      >
        {children}
      </Link>
    </li>
  )
}
