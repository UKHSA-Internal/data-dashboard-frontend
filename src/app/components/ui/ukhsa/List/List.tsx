import { HTMLProps, ReactNode } from 'react'

interface ListProps extends HTMLProps<HTMLUListElement> {
  children: ReactNode
  className?: string
}

export const List = ({ children, className, ...rest }: ListProps) => {
  return (
    <ul className={className} {...rest}>
      {children}
    </ul>
  )
}
