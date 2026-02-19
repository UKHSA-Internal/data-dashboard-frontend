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

export const Contents = ({
  heading = 'Contents',
  children,
  className = 'mb-8 border-l-4 border-[#0b0c0c] pl-4',
}: ContentsProps) => {
  return (
    <nav className={className} aria-label="Contents">
      <h2 className="govuk-body-m govuk-!-margin-bottom-1 font-bold">{heading}</h2>
      <ol className="govuk-list govuk-list--spaced">{children}</ol>
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
    <li className="govuk-!-margin-bottom-1 bg-[left_center] bg-no-repeat">
      <Link className="govuk-!-margin-bottom-1 bg-[left_center] bg-no-repeat underline" href={href} prefetch>
        {children}
      </Link>
    </li>
  ) : null
}
