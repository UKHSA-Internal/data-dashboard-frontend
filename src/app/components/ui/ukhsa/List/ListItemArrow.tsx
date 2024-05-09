import Link from 'next/link'
import { ReactNode } from 'react'

interface ListItemArrowProps {
  children: ReactNode
}

export const ListItemArrow = ({ children }: ListItemArrowProps) => {
  return <div className="relative">{children}</div>
}

export const ListItemArrowParagraph = ({ children }: ListItemArrowProps) => {
  return <p className="govuk-body-m">{children}</p>
}

interface ListItemArrowLinkProps extends ListItemArrowProps {
  href: string
}

export const ListItemArrowLink = ({ href, children }: ListItemArrowLinkProps) => {
  return (
    <h2 className="govuk-heading-m">
      <Link
        className="govuk-link govuk-link--no-visited-state before:absolute before:inset-0 before:bg-list_item_arrow before:bg-right before:bg-no-repeat after:absolute after:inset-0 hover:before:bg-list_item_arrow_hover"
        href={href}
      >
        {children}
      </Link>
    </h2>
  )
}
