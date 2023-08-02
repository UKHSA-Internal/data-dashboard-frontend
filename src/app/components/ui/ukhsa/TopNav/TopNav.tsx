'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { MouseEvent, ReactNode, useState } from 'react'

/**
 * Topnav
 */
export const TopNav = ({ children }: { children: ReactNode }) => {
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
          'ukhsa-chevron govuk-link govuk-link--inverse float-right ml-5 px-2 py-1  no-underline motion-reduce:transition-none md:right-[30px] md:top-[6px] lg:hidden',
          {
            open: menuOpen,
          }
        )}
        onClick={handleOpen}
        href="/browse"
        aria-expanded={menuOpen}
        aria-controls="ukhsa-topnav"
        aria-label={`${menuOpen ? 'Hide' : 'Show'} navigation menu`}
      >
        Menu
      </Link>

      <nav
        className={clsx(
          'sticky top-[20px] mx-[-30px] my-0 min-w-[var(--ukhsa-nav-width)]  overflow-hidden bg-[var(--colour-grey-3)] px-6 lg:mt-7 lg:hidden lg:h-full',
          {
            hidden: !menuOpen,
          }
        )}
        id="ukhsa-topnav"
        aria-label="Menu"
      >
        <ul>{children}</ul>
      </nav>
    </>
  )
}
