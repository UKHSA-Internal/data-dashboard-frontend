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
        <ul className="govuk-list govuk-!-margin-0 flex list-none flex-wrap items-center gap-4 py-3 leading-[18px]">
          {items.map(({ id, value: { html_url, title } }) => (
            <li key={`menu-bar-desktop-${id}`} className="govuk-!-margin-0">
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
                className="govuk-link govuk-link--inverse govuk-link--no-visited-state govuk-!-font-size-16 ukhsa-chevron-right inline-flex cursor-pointer items-center border-none p-0 text-white no-underline hover:underline focus:text-black"
              >
                Sign out
              </button>
            </li>
          )}
        </ul>
      </nav>
      {/* End desktop menu */}

      {/* Mobile menu */}
      <div className="govuk-width-container flex items-center justify-between gap-4 md:hidden">
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls={'ukhsa-menu-bar-nav'}
          className={clsx(
            'govuk-!-font-size-16 govuk-body-s ukhsa-chevron group relative mb-0 flex items-center border-none px-0 py-3 pr-1 text-left font-normal text-white focus:text-black',
            { open: menuOpen }
          )}
        >
          <span aria-hidden>Menu</span>
          <span className="sr-only">{menuOpen ? 'Hide navigation menu' : 'Show navigation menu'}</span>
        </button>
        {isSignedIn && (
          <button
            type="button"
            onClick={() => serverSignOut()}
            className="govuk-link govuk-link--inverse govuk-link--no-visited-state govuk-!-font-size-16 ukhsa-chevron-right inline-flex cursor-pointer items-center border-none p-0 text-white no-underline shadow-none hover:underline focus:text-black"
          >
            Sign out
          </button>
        )}
      </div>

      <nav id={'ukhsa-menu-bar-nav'} aria-label="Menu" hidden={!menuOpen} className="w-full bg-blue md:hidden">
        <ul className="govuk-list govuk-width-container govuk-!-font-size-16 mt-0 list-none border-t border-light-blue px-3">
          {items.map(({ id, value: { html_url, title } }) => (
            <li
              key={`menu-bar-mobile-${id}`}
              className="govuk-!-margin-0 border-b border-light-blue py-[2px] last:border-b-0"
            >
              <Link
                href={html_url}
                className="govuk-link govuk-link--no-visited-state block py-2 text-white no-underline hover:underline focus:text-black"
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {/* End mobile menu */}
    </div>
  )
}

export default MenuBarContent
