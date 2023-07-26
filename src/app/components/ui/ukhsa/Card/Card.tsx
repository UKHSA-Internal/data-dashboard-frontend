import clsx from 'clsx'
import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

export async function Card({ children, className }: CardProps) {
  return <div className={clsx('govuk-!-padding-4 bg-grey-3', className)}>{children}</div>
}
