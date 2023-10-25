import clsx from 'clsx'
import { ElementType, ReactNode } from 'react'

interface CardProps<Element> {
  as?: Element
  children: ReactNode
  className?: string
}

export function Card<Element extends ElementType = 'div'>({ as, children, className, ...props }: CardProps<Element>) {
  const Component = as ?? 'div'
  return (
    <Component className={clsx('govuk-!-padding-4 bg-grey-3', className)} {...props}>
      {children}
    </Component>
  )
}
