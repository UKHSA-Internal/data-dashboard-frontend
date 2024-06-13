import { ReactNode } from 'react'

interface ListProps {
  children: ReactNode
  className?: string
  labelName?: string
}

export const List = ({ children, className, labelName }: ListProps) => {
  return (
    <ul className={className} aria-label={labelName}>
      {children}
    </ul>
  )
}
