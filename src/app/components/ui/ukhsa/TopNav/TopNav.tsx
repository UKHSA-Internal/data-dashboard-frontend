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
          'ukhsa-chevron govuk-link govuk-link--inverse float-right ml-5 mt-[-5px] px-2 py-2 no-underline shadow-none motion-reduce:transition-none md:right-[30px] md:top-[6px] lg:hidden',
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
          'sticky mx-[-15px] my-0 h-full w-[calc(100%+30px)] min-w-[var(--ukhsa-nav-width)] overflow-hidden border-b-[1px] border-mid-grey bg-grey-3 sm:mx-[-30px] sm:w-[calc(100%+60px)] md:mx-[-30px] lg:mt-7 lg:hidden lg:h-full',
          {
            'hidden h-0': !menuOpen,
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
