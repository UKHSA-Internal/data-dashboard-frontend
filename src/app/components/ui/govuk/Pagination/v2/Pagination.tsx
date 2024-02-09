import clsx from 'clsx'
import React from 'react'

interface PaginationProps {
  children: React.ReactNode
  variant: 'list-item' | 'block'
}

export const Pagination = ({ variant, children }: PaginationProps) => {
  return (
    <nav
      className={clsx('govuk-pagination', {
        'govuk-pagination--block': variant === 'block',
      })}
      role="navigation"
    >
      {children}
    </nav>
  )
}
