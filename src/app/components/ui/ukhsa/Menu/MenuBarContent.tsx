'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { useClickAway } from 'react-use'

import { serverSignOut } from '@/app/api/auth/auth.actions'
import { useNavigationEvent } from '@/app/hooks/useNavigationEvent'

interface MenuBarItem {
  type: 'link'
  value: {
    title: string
    page: number
    html_url: string
  }
  id: string
}

interface MenuBarContentProps {
  readonly items: ReadonlyArray<MenuBarItem>
  readonly isSignedIn: boolean
}

export function MenuBarContent({ items, isSignedIn }: MenuBarContentProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useClickAway(containerRef, () => setMenuOpen(false))
  useNavigationEvent(() => setMenuOpen(false))

  return (
    <div ref={containerRef} className="bg-blue print:hidden" data-testid="ukhsa-menu-bar">
      {/* Desktop menu */}
      <nav aria-label="Menu" className="govuk-width-container hidden md:block">
        <ul className="govuk-list govuk-!-margin-0 flex list-none flex-wrap items-center gap-4 py-3">
          {items.map(({ id, value: { html_url, title } }) => (
            <li key={`menu-bar-desktop-${id}-${html_url}`} className="govuk-!-margin-0">
              <Link
                href={html_url}
                className="govuk-link govuk-link--inverse govuk-link--no-visited-state govuk-!-font-size-16 inline-block p-0 text-white no-underline hover:underline focus:text-black"
              >
                {title}
              </Link>
            </li>
          ))}
          {isSignedIn && (
            <li className="govuk-!-margin-0 ml-auto">
              <button
                type="button"
                onClick={() => serverSignOut()}
                className="govuk-link govuk-link--inverse govuk-link--no-visited-state govuk-!-font-size-16 ukhsa-chevron-right inline-flex cursor-pointer items-center border-none bg-transparent p-0 text-white no-underline shadow-none hover:underline focus:text-black"
              >
                Sign out
              </button>
            </li>
          )}
        </ul>
      </nav>
      {/* End desktop menu */}


      {/* Mobile menu */}
      <div className="govuk-width-container md:hidden">
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls={'ukhsa-menu-bar-nav'}
          className={clsx(
            'govuk-!-font-size-19 ukhsa-chevron group relative flex w-full items-center border-none bg-transparent p-0 text-left font-bold text-white shadow-none focus:text-black',
            { open: menuOpen }
          )}
        >
          <span aria-hidden>Menu</span>
          <span className="sr-only">{menuOpen ? 'Hide navigation menu' : 'Show navigation menu'}</span>
        </button>
      </div>

      <nav
        id={'ukhsa-menu-bar-nav'}
        aria-label="Menu"
        hidden={!menuOpen}
        className="w-full bg-light-grey text-blue md:hidden"
      >
        <ul className="govuk-list govuk-width-container govuk-!-margin-0 list-none p-0">
          {items.map(({ id, value: { html_url, title } }) => (
            <li
              key={`menu-bar-mobile-${id}-${html_url}`}
              className="govuk-!-margin-0 border-b border-mid-grey last:border-b-0"
            >
              <Link
                href={html_url}
                className="govuk-link govuk-link--no-visited-state block py-3 font-bold no-underline hover:underline focus:text-black"
              >
                {title}
              </Link>
            </li>
          ))}
          {isSignedIn && (
            <li className="govuk-!-margin-0 border-b border-mid-grey last:border-b-0">
              <button
                type="button"
                onClick={() => serverSignOut()}
                className="govuk-link govuk-link--no-visited-state block w-full cursor-pointer border-none bg-transparent p-0 text-left font-bold no-underline shadow-none hover:underline focus:text-black"
              >
                Sign out
              </button>
            </li>
          )}
        </ul>
      </nav>
      {/* End mobile menu */}
    </div>
  )
}

export default MenuBarContent
