import { ReactNode } from 'react'
import { Container, CardColumnHeading, CardColumnGridCol } from './Card.styles'

interface CardProps {
  children: ReactNode
}

export const Card = ({ children }: CardProps) => {
  return <Container>{children}</Container>
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
