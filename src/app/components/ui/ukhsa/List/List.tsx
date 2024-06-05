import { ReactNode } from 'react'

interface ListProps {
  children: ReactNode
  className?: string
}

export const List = ({ children, className }: ListProps) => {
  return <ul className={className}>{children}</ul>
}
