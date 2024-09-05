import clsx from 'clsx'
import { ReactNode } from 'react'

import { AsChildProps, Slot } from '../Slot/Slot'

type CardProps = AsChildProps<React.HTMLAttributes<HTMLElement>> & {
  children: ReactNode
  className?: string
}

export function Card({ asChild, children, className, ...props }: CardProps) {
  const Component = asChild ? Slot : 'div'
  return (
    <Component className={clsx('govuk-!-padding-4 bg-grey-3', className)} {...props}>
      {children}
    </Component>
  )
}
