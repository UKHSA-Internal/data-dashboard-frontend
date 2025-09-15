import Link from 'next/link'
import { ReactNode } from 'react'

/**
 * Contents links
 * Automatically renders a navigation list with links to alternate pages
 * <Contents>
 *    <ContentsLink>1st section</ContentsLink>
 *    <ContentsLink>2nd section</ContentsLink>
 * </Contents>
 */
interface ContentsProps {
  heading?: string
  children: ReactNode
  className?: string
}

export const Contents = ({ heading = 'Contents', children, className }: ContentsProps) => {
  return (
    <nav className={className} aria-label="Contents">
      <h2 className="govuk-heading-s govuk-!-margin-bottom-1 font-normal">{heading}</h2>
      <ol className="govuk-!-margin-left-4">{children}</ol>
    </nav>
  )
}

/**
 * ContentsLink
 * Renders a set of links
 */
interface ContentsLinkProps {
  children: ReactNode
  href: string
}

export const ContentsLink = ({ children, href }: ContentsLinkProps) => {
  return children ? (
    <li className="govuk-body-m govuk-!-margin-bottom-1 relative">
      <Link className="govuk-link--no-visited-state govuk-dash" href={href} prefetch>
        {children}
      </Link>
    </li>
  ) : null
}
