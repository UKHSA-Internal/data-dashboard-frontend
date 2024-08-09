'use client'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MouseEvent, ReactNode, useEffect, useRef, useState } from 'react'
import { useClickAway } from 'react-use'

/**
 * Topnav
 */
export const TopNav = ({ children, newLandingPage }: { children: ReactNode; newLandingPage?: boolean }) => {
  const pathname = usePathname()
  const topNavRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => setMenuOpen(false), [pathname])

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    setMenuOpen(!menuOpen)
    return
  }

  useClickAway(topNavRef, () => setMenuOpen(false))

  return (
    <div ref={topNavRef} className="print:hidden">
      <Link
        className={clsx(
          'govuk-!-font-size-16 ukhsa-chevron govuk-link govuk-link--inverse absolute right-0 top-[35px] z-10 flex h-8 items-center px-4 font-bold no-underline shadow-none motion-reduce:transition-none sm:top-7 md:top-0',
          {
            'open bg-white text-blue': menuOpen,
            'xl:hidden': !newLandingPage,
          }
        )}
        onClick={handleClick}
        href="/browse"
        aria-expanded={menuOpen}
        aria-controls="ukhsa-topnav"
        aria-label={`${menuOpen ? 'Hide' : 'Show'} navigation menu`}
      >
        Menu
      </Link>

      <nav
        className={clsx(
          'sticky border-b border-mid-grey bg-grey-3 xl:hidden [&>ul>li>a]:px-3 sm:[&>ul>li>a]:px-6 md:[&>ul>li>a]:px-6',
          {
            'hidden h-0': !menuOpen,
          }
        )}
        id="ukhsa-topnav"
        aria-label="Menu"
      >
        <ul>{children}</ul>
      </nav>
    </div>
  )
}
