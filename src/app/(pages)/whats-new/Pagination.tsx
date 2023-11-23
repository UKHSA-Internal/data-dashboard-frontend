'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

export function Pagination({
  initialPage,
  totalItems,
  initialPageSize,
  className,
}: {
  initialPage: number
  totalItems: number
  initialPageSize: number
  className?: string
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const currentPage = Number(searchParams.get('page')) || initialPage
  const totalPages = Math.ceil(totalItems / initialPageSize)
  const hasNextPage = currentPage < totalPages
  const hasPreviousPage = currentPage > 1

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    params.set('page', String(currentPage))

    router.push(`${pathname}?${params.toString()}`)
  }, [pathname, searchParams, router, currentPage])

  const generatePageNumbers = () => {
    const pages = []
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
    return pages
  }

  const query = Object.fromEntries(searchParams)

  return (
    <nav aria-label="results" className={clsx('govuk-pagination', className)} role="navigation">
      {hasPreviousPage && (
        <div className="govuk-pagination__prev">
          <Link
            className="govuk-link govuk-pagination__link govuk-link--no-visited-state"
            href={{
              pathname,
              query: { ...query, page: currentPage - 1 },
            }}
            rel="prev"
          >
            <svg
              aria-hidden="true"
              className="govuk-pagination__icon govuk-pagination__icon--prev"
              focusable="false"
              height="13"
              viewBox="0 0 15 13"
              width="15"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m6.5938-0.0078125-6.7266 6.7266 6.7441 6.4062 1.377-1.449-4.1856-3.9768h12.896v-2h-12.984l4.2931-4.293-1.414-1.414z" />
            </svg>
            <span className="govuk-pagination__link-title">Previous</span>
          </Link>
        </div>
      )}
      <ul className="govuk-pagination__list">
        {generatePageNumbers().map((page) => (
          <li
            className={clsx('govuk-pagination__item', {
              'govuk-pagination__item--current': page === currentPage,
            })}
            key={page}
          >
            <Link
              aria-current={page === currentPage ? 'page' : undefined}
              aria-label={`Page ${page}`}
              className="govuk-link govuk-pagination__link govuk-link--no-visited-state"
              href={{
                pathname,
                query: { ...query, page },
              }}
            >
              {page}
            </Link>
          </li>
        ))}
      </ul>
      {hasNextPage && (
        <div className="govuk-pagination__next">
          <Link
            className="govuk-link govuk-pagination__link govuk-link--no-visited-state"
            href={{
              pathname,
              query: { ...query, page: currentPage + 1 },
            }}
            rel="next"
          >
            <span className="govuk-pagination__link-title">Next</span>{' '}
            <svg
              aria-hidden="true"
              className="govuk-pagination__icon govuk-pagination__icon--next"
              focusable="false"
              height="13"
              viewBox="0 0 15 13"
              width="15"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m8.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7266z" />
            </svg>
          </Link>
        </div>
      )}
    </nav>
  )
}
