import clsx from 'clsx'
import Link from 'next/link'
import { ReactNode } from 'react'

import { AsChildProps, Slot } from '../Slot/Slot'

interface ListItemProps {
  children: ReactNode
  className?: string
  showRule?: boolean
  spacing?: 's' | 'm' | 'l'
}

export const ListItem = ({ children, className, showRule = true, spacing = 'm' }: ListItemProps) => {
  return (
    <li className={clsx(className, { 'govuk-!-margin-top-2': !showRule })}>
      {children}
      {showRule && (
        <hr
          className={clsx(`govuk-section-break govuk-section-break--${spacing} govuk-section-break--visible`, {
            'govuk-!-margin-top-2 govuk-!-margin-bottom-2': spacing === 's',
          })}
          role="presentation"
        />
      )}
    </li>
  )
}

type ListItemLinkProps = AsChildProps<React.HTMLAttributes<HTMLAnchorElement>> & {
  children: ReactNode
  href: string
  className?: string
  isSidebar?: boolean
}

export const ListItemExternalLink = ({ asChild, href, children, className, isSidebar }: ListItemLinkProps) => {
  const Component = asChild ? Slot : 'h2'

  return (
    <Component className={clsx('relative', { 'govuk-heading-m': !isSidebar, 'govuk-heading-s': isSidebar }, className)}>
      <Link
        className="govuk-link govuk-link--no-visited-state after:absolute after:inset-0"
        href={href}
        rel="noreferrer noopener"
        target="_blank"
        aria-label={`${children?.toString()} (opens in a new window)`}
      >
        {children}
      </Link>
    </Component>
  )
}
