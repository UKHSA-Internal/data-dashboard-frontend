'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MouseEvent, ReactNode, useState } from 'react'

/**
 * SideNav
 */
export const SideNav = ({ children }: { children: ReactNode }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleOpen = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    setMenuOpen(!menuOpen)
    return false
  }

  return (
    <>
      <Link
        className={clsx(
          'ukhsa-chevron govuk-link govuk-link--inverse absolute right-[18px] top-[20px] mb-0 ml-5 px-2 py-1  no-underline motion-reduce:transition-none md:right-[30px] md:top-[6px] lg:hidden',
          {
            open: menuOpen,
          }
        )}
        onClick={handleOpen}
        href="/browse"
        aria-expanded={menuOpen}
        aria-controls="ukhsa-sidenav"
        aria-label={`${menuOpen ? 'Hide' : 'Show'} navigation menu`}
      >
        Menu
      </Link>

      <nav
        className={clsx(
          'sticky top-[20px] mt-0 min-w-[var(--ukhsa-side-nav-width)] overflow-hidden lg:mt-7 lg:block lg:h-full',
          {
            hidden: !menuOpen,
            'mb-5': menuOpen,
          }
        )}
        id="ukhsa-sidenav"
        aria-label="Menu"
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
          'govuk-link--no-visited-state block px-2 py-[8px] no-underline decoration-1 hover:underline [&:not(:focus)]:hover:bg-grey-3',
          {
            'font-bold [&:not(:focus)]:bg-grey-3 [&:not(:focus)]:shadow-[-3px_0_0_0_var(--colour-blue)]': isActive,
            'no-underline': !isActive,
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
  return <ul className="govuk-!-margin-bottom-3 govuk-!-margin-top-2">{children}</ul>
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
    <li className={clsx('govuk-!-margin-left-2 bg-dash bg-[left_center] bg-no-repeat py-1 pl-6')}>
      <Link
        href={href}
        className={clsx('govuk-link--no-visited-state inline-block decoration-1 hover:underline', {
          'text-black underline': isActive,
          'no-underline': !isActive,
        })}
        aria-current={isActive ? 'page' : undefined}
      >
        {children}
      </Link>
    </li>
  )
}
