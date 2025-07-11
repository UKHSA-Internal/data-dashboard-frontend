'use client'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MouseEvent, ReactNode, useEffect, useRef, useState } from 'react'
import { useClickAway } from 'react-use'

/**
 * Topnav
 */
export const TopNav = ({ children, avatar = null }: { children: ReactNode; avatar?: ReactNode }) => {
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
      <div className="govuk-width-container relative">
        <Link
          className={clsx(
            'govuk-!-font-size-16 ukhsa-chevron govuk-link govuk-link--inverse group absolute -top-7 right-0 z-10 flex h-9 items-center px-4 font-bold no-underline shadow-none motion-reduce:transition-none md:-top-9',
            {
              'open bg-light-grey text-blue': menuOpen,
            }
          )}
          onClick={handleClick}
          href="/browse"
          aria-expanded={menuOpen}
          aria-controls="ukhsa-topnav"
        >
          <span className="inline-flex items-center gap-2">
            <span aria-hidden>Menu</span>
            <span className="sr-only">{menuOpen ? 'Hide' : 'Show'} navigation menu</span>
            {avatar}
          </span>
        </Link>
      </div>
      <nav
        className={clsx('w-full bg-light-grey', {
          'hidden h-0': !menuOpen,
        })}
        aria-label="Menu"
      >
        <div className="govuk-width-container py-5 text-blue">{children}</div>
      </nav>
    </div>
  )
}
