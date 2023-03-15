import { ReactNode } from 'react'
import { Container, CardColumnHeading, CardColumnGridCol } from './Card.styles'

interface CardProps {
  label?: string
  children: ReactNode
}

export const Card = ({ children, label }: CardProps) => {
  return (
    <Container as="article" aria-label={label}>
      {children}
    </Container>
  )
}

interface CardColumnProps {
  children: ReactNode
  heading: string
}

export const CardColumn = ({ children, heading }: CardColumnProps) => {
  return (
    <CardColumnGridCol>
      <CardColumnHeading>{heading}</CardColumnHeading>
      {children}
    </CardColumnGridCol>
  )
}
