import { GridCol } from 'govuk-react'
import { ComponentProps, ReactNode } from 'react'
import { Container, CardColumnHeading, CardColumnHeadingContainer, CardColumnGridCol } from './Card.styles'

interface CardProps {
  label?: string
  children: ReactNode
  theme?: 'primary' | 'secondary'
}

export const Card = ({ children, label, theme = 'primary' }: CardProps) => {
  return (
    <Container as="article" aria-label={label} theme={theme}>
      {children}
    </Container>
  )
}

interface CardColumnProps extends ComponentProps<typeof GridCol> {
  children: ReactNode
  heading: string
  sideContent?: ReactNode
  theme?: 'primary' | 'secondary'
}

export const CardColumn = ({ children, heading, sideContent, theme, ...props }: CardColumnProps) => {
  return (
    <CardColumnGridCol {...props}>
      <CardColumnHeadingContainer>
        <CardColumnHeading theme={theme}>{heading}</CardColumnHeading>
        {sideContent}
      </CardColumnHeadingContainer>
      {children}
    </CardColumnGridCol>
  )
}
