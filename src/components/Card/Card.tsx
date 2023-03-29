import { ReactNode } from 'react'
import { Container, CardColumnHeading, CardColumnHeadingContainer, CardColumnGridCol } from './Card.styles'

interface CardProps {
  label?: string
  children: ReactNode
  theme?: 'primary' | 'secondary'
}

export const Card = ({ children, label, theme = 'primary' }: CardProps) => {
  console.log('Card: ', label, theme)
  return (
    <Container as="article" aria-label={label} theme={theme}>
      {children}
    </Container>
  )
}

interface CardColumnProps {
  children: ReactNode
  heading: string
  sideContent?: ReactNode
  theme?: 'primary' | 'secondary'
}

export const CardColumn = ({ children, heading, sideContent, theme }: CardColumnProps) => {
  return (
    <CardColumnGridCol>
      <CardColumnHeadingContainer>
        <CardColumnHeading theme={theme}>{heading}</CardColumnHeading>
        {sideContent}
      </CardColumnHeadingContainer>
      {children}
    </CardColumnGridCol>
  )
}
