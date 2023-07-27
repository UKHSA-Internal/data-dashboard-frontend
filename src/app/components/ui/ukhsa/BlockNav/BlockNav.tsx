import Link from 'next/link'
import { ReactNode } from 'react'

/**
 * BlockNav
 */
export const BlockNav = ({ children }: { children: ReactNode }) => {
  return (
    <nav aria-label="Block Menu" className="mb-6 grid gap-7 gap-y-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-9">
      {children}
    </nav>
  )
}

/**
 * Nav link
 */
interface NavLinkProps {
  href: string
  name: string
  description: string
}

export const NavLink = ({ href, name, description }: NavLinkProps) => {
  return (
    <div className="flex flex-col [&:first-of-type>hr]:hidden">
      <hr className="govuk-section-break govuk-section-break--visible mb-3 " />
      <Link
        href={href}
        className="govuk-link--no-visited-state no-underline decoration-1 hover:underline [&:not(:focus)]:hover:bg-grey-3"
      >
        {name}
      </Link>
      <div>{description}</div>
    </div>
  )
}
