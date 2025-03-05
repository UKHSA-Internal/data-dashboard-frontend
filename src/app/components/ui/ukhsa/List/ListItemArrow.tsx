import clsx from 'clsx'
import Link from 'next/link'
import { ReactNode } from 'react'

import { AsChildProps, Slot } from '../Slot/Slot'

interface ListItemArrowProps {
  children: ReactNode
}

export const ListItemArrow = ({ children }: ListItemArrowProps) => {
  return <div className="govuk-!-padding-right-3 relative">{children}</div>
}

export const ListItemArrowParagraph = ({ children }: ListItemArrowProps) => {
  return <p className="govuk-body-m">{children}</p>
}

type ListItemArrowLinkProps = AsChildProps<React.HTMLAttributes<HTMLAnchorElement>> & {
  children: ReactNode
  href: string
  className?: string
  isSidebar?: boolean
}

export const ListItemArrowLink = ({ asChild, href, children, className }: ListItemArrowLinkProps) => {
  const Component = asChild ? Slot : 'h2'

  return (
    <Component className={clsx('govuk-heading-m govuk-!-margin-bottom-2', className)}>
      <Link
        className="govuk-link govuk-link--no-visited-state before:absolute before:inset-0 before:bg-list_item_arrow before:bg-right before:bg-no-repeat after:absolute after:inset-0 hover:before:bg-list_item_arrow_hover"
        href={href}
        prefetch
      >
        {children}
      </Link>
    </Component>
  )
}

export const ListItemArrowExternalLink = ({
  asChild,
  href,
  children,
  className,
  isSidebar,
}: ListItemArrowLinkProps) => {
  const Component = asChild ? Slot : 'h2'

  return (
    <Component className={clsx({ 'govuk-heading-m': !isSidebar, 'govuk-heading-s': isSidebar }, className)}>
      <Link
        className="govuk-link govuk-link--no-visited-state before:absolute before:inset-0 before:bg-list_item_arrow before:bg-right before:bg-no-repeat after:absolute after:inset-0 hover:before:bg-list_item_arrow_hover"
        href={href}
        rel="noreferrer noopener"
        target="_blank"
        aria-label={`${children?.toString()} (opens in a new window)`}
        prefetch
      >
        {children}
      </Link>
    </Component>
  )
}
