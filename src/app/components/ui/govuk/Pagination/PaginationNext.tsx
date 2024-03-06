import { UrlObject } from 'node:url'

import Link from 'next/link'
import React from 'react'

import { PaginationVariant } from './Pagination'

interface PaginationNextProps {
  href: string | UrlObject
  variant: PaginationVariant
  children?: string
}

export const PaginationNext = ({ href, children, variant }: PaginationNextProps) => {
  return (
    <div className="govuk-pagination__next">
      <Link
        className="govuk-link govuk-pagination__link govuk-link--no-visited-state"
        href={href}
        rel="next"
        prefetch={false}
      >
        {variant === 'list-item' && (
          <span className="govuk-pagination__link-title">
            Next<span className="govuk-visually-hidden"> page</span>
          </span>
        )}
        <svg
          aria-hidden="true"
          className="govuk-pagination__icon govuk-pagination__icon--next inline align-baseline"
          focusable="false"
          height="13"
          viewBox="0 0 15 13"
          width="15"
          xmlns="http://www.w3.org/2000/svg"
          data-testid="icon-next"
        >
          <path d="m8.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7266z" />
        </svg>

        {variant === 'block' && (
          <>
            <span className="govuk-pagination__link-title">
              Next<span className="govuk-visually-hidden"> page</span>
            </span>
            <span className="govuk-visually-hidden">:</span>
            <span className="govuk-pagination__link-label">{children}</span>
          </>
        )}
      </Link>
    </div>
  )
}
