import clsx from 'clsx'
import React from 'react'

export type PaginationVariant = 'list-item' | 'block'

interface PaginationProps {
  children: React.ReactNode
  variant: PaginationVariant
  className?: string
}

export const Pagination = ({ variant, children, className }: PaginationProps) => {
  return (
    <nav
      className={clsx('govuk-pagination', className, {
        'govuk-pagination--block': variant === 'block',
      })}
      role="navigation"
      aria-label="Pagination"
    >
      {children}
    </nav>
  )
}
