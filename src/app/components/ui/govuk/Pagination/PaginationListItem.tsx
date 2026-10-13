import { UrlObject } from 'node:url'

import clsx from 'clsx'
import React from 'react'

import { PaginationLink } from './PaginationLink'

interface PaginationListItemProps {
  children: number
  className?: string
  current: boolean
  href: string | UrlObject
  reloadDocument?: boolean
}

export const PaginationListItem = ({ children, className, current, href, reloadDocument }: PaginationListItemProps) => {
  return (
    <li
      className={clsx(className, 'govuk-pagination__item block', {
        'govuk-pagination__item--current': current,
      })}
    >
      <PaginationLink
        reloadDocument={reloadDocument}
        aria-current={current ? 'page' : undefined}
        aria-label={`Page ${children}`}
        className="govuk-link govuk-pagination__link govuk-link--no-visited-state"
        href={href}
      >
        {children}
      </PaginationLink>
    </li>
  )
}
