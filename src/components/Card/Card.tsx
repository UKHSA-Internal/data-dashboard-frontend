import { GridCol } from 'govuk-react'
import { ComponentProps, ReactNode } from 'react'
import { Container, CardColumnHeading, CardColumnHeadingContainer, CardColumnGridCol } from './Card.styles'

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

interface CardColumnProps extends ComponentProps<typeof GridCol> {
  children: ReactNode
  heading: string
  sideContent?: ReactNode
}

export const CardColumn = ({ children, heading, sideContent, ...props }: CardColumnProps) => {
  return (
    <CardColumnGridCol {...props}>
      <CardColumnHeadingContainer>
        <CardColumnHeading>{heading}</CardColumnHeading>
        {sideContent}
      </CardColumnHeadingContainer>
      {children}
    </CardColumnGridCol>
  )
}
