import React from 'react'

interface PaginationNextProps {
  href: string | null
  children: string
}

export const PaginationNext = ({ href, children }: PaginationNextProps) => {
  return (
    <div className="govuk-pagination__next">
      <a className="govuk-link govuk-pagination__link govuk-link--no-visited-state" href={href ?? ''} rel="next">
        <svg
          className="govuk-pagination__icon govuk-pagination__icon--next inline align-baseline"
          xmlns="http://www.w3.org/2000/svg"
          height="13"
          width="15"
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 15 13"
        >
          <path d="m8.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7266z"></path>
        </svg>
        <span className="govuk-pagination__link-title">
          Next<span className="govuk-visually-hidden"> page</span>
        </span>
        <span className="govuk-visually-hidden">:</span>
        <span className="govuk-pagination__link-label">{children}</span>
      </a>
    </div>
  )
}
