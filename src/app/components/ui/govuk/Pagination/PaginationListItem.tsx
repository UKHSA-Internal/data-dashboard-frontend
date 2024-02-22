import { UrlObject } from 'node:url'

import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'

interface PaginationListItemProps {
  children: number
  className?: string
  current: boolean
  href: string | UrlObject
}

export const PaginationListItem = ({ children, className, current, href }: PaginationListItemProps) => {
  return (
    <li
      className={clsx(className, 'govuk-pagination__item block', {
        'govuk-pagination__item--current': current,
      })}
    >
      <Link
        prefetch={false}
        aria-current={current ? 'page' : undefined}
        aria-label={`Page ${children}`}
        className="govuk-link govuk-pagination__link govuk-link--no-visited-state"
        href={href}
      >
        {children}
      </Link>
    </li>
  )
}
