import clsx from 'clsx'
import React from 'react'

interface PaginationListItemsProps {
  children: React.ReactNode
  className?: string
}

export const PaginationListItems = ({ children, className }: PaginationListItemsProps) => {
  return <ul className={clsx(className, 'govuk-pagination__list')}>{children}</ul>
}
