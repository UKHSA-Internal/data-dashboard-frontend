import Link from 'next/link'
import { ReactNode } from 'react'

/**
 * Contents links
 * Automatically renders a navigation list with links to alternate pages
 * <ContentsLinks>
 *    <ContentsLink>1st section</ContentsLink>
 *    <ContentsLink>2nd section</ContentsLink>
 * </ContentsLinks>
 */
interface ContentsLinksProps {
  heading?: string
  children: ReactNode
}

export const ContentsLinks = ({ heading = 'Contents', children }: ContentsLinksProps) => {
  return (
    <nav className="govuk-!-margin-bottom-5" aria-label="Contents">
      <h2 className="govuk-heading-s govuk-!-margin-bottom-1 font-normal">{heading}</h2>
      <ol className="govuk-!-margin-bottom-6 govuk-!-margin-left-4">{children}</ol>
    </nav>
  )
}

/**
 * ContentsLink
 * Renders a set of links
 */
interface ContentsLinkProps {
  heading: string
  href: string
}

export const ContentsLink = ({ heading, href }: ContentsLinkProps) => {
  return (
    <li className="govuk-body-m govuk-!-margin-bottom-1 relative">
      <Link className="govuk-link--no-visited-state govuk-dash" href={href}>
        {heading}
      </Link>
    </li>
  )
}
