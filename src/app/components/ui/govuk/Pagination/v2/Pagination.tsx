import clsx from 'clsx'
import React from 'react'

interface PaginationProps {
  children: React.ReactNode
  variant: 'list-item' | 'block'
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
