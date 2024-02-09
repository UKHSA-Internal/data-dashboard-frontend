import React from 'react'

interface PaginationPreviousProps {
  href: string
  children: string
}

export const PaginationPrevious = ({ href, children }: PaginationPreviousProps) => {
  return (
    <div className="govuk-pagination__prev">
      <a className="govuk-link govuk-pagination__link govuk-link--no-visited-state" href={href} rel="prev">
        <svg
          className="govuk-pagination__icon govuk-pagination__icon--prev inline align-baseline"
          xmlns="http://www.w3.org/2000/svg"
          height="13"
          width="15"
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 15 13"
        >
          <path d="m6.5938-0.0078125-6.7266 6.7266 6.7441 6.4062 1.377-1.449-4.1856-3.9768h12.896v-2h-12.984l4.2931-4.293-1.414-1.414z"></path>
        </svg>
        <span className="govuk-pagination__link-title">
          Previous<span className="govuk-visually-hidden"> page</span>
        </span>
        <span className="govuk-visually-hidden">:</span>
        <span className="govuk-pagination__link-label">{children}</span>
      </a>
    </div>
  )
}
