'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { useClickAway } from 'react-use'

export interface HeaderMenuItem {
  label: string
  href: string
}

const DEFAULT_HEADER_MENU_ITEMS: HeaderMenuItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Health Topics', href: '#' },
  { label: 'API', href: '/access-our-data' },
  { label: 'Data documentation', href: '/metrics-documentation' },
  { label: 'About', href: '/about' },
]

interface HeaderMenuProps {
  items?: HeaderMenuItem[]
}

function MenuLinks({
  items,
  className,
  linkClassName,
  onItemClick,
}: {
  items: HeaderMenuItem[]
  className?: string
  linkClassName?: string
  onItemClick?: () => void
}) {
  return (
    <ul className={clsx('govuk-list mb-0 flex flex-col gap-4 md:flex-row md:flex-wrap md:gap-6', className)}>
      {items.map((item) => (
        <li key={item.label} className="mb-0 no-underline">
          <Link
            className={clsx(
              'govuk-link govuk-link--no-visited-state govuk-!-margin-bottom-0 inline-flex w-auto text-white no-underline outline-none focus:text-black',
              linkClassName
            )}
            href={item.href}
            onClick={onItemClick}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export function HeaderMenu({ items = DEFAULT_HEADER_MENU_ITEMS }: HeaderMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useClickAway(menuRef, () => setMenuOpen(false))

  return (
    <div className="w-full border-t border-[#ffffff30]" aria-label="Header menu" ref={menuRef} role="navigation">
      <div className="govuk-width-container govuk-!-padding-top-2 govuk-!-padding-bottom-2">
        <div className="md:hidden">
          <button
            type="button"
            className={clsx(
              'ukhsa-chevron ukhsa-chevron--always-white govuk-link govuk-link--inverseflex items-center justify-start py-1 text-left font-bold text-white no-underline shadow-none outline-none focus:bg-yellow focus:text-black focus:shadow-[0_4px_0_0_black] motion-reduce:transition-none',
              {
                open: menuOpen,
              }
            )}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="header-menu-dropdown"
          >
            <span className="inline-flex items-center gap-2">
              <span aria-hidden>Menu</span>
              <span className="sr-only">{menuOpen ? 'Hide menu' : 'Show menu'}</span>
            </span>
          </button>
          <div
            id="header-menu-dropdown"
            className={clsx('w-full', {
              'hidden h-0 overflow-hidden': !menuOpen,
            })}
          >
            <div className="govuk-width-container govuk-!-padding-top-3 govuk-!-padding-bottom-4 ml-0">
              <MenuLinks
                items={items}
                linkClassName="text-white hover:opacity-80"
                onItemClick={() => setMenuOpen(false)}
              />
            </div>
          </div>
        </div>

        <div className="hidden md:block">
          <MenuLinks items={items} />
        </div>
      </div>
    </div>
  )
}
