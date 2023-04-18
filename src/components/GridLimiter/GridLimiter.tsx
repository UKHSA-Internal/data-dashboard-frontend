import { ReactNode } from 'react'
import { LimitContainer } from './GridLimiter.styles'

interface GridLimiterProps {
  children: ReactNode
}

export const GridLimiter = ({ children }: GridLimiterProps) => {
  return <LimitContainer columnLimit={3}>{children}</LimitContainer>
}
