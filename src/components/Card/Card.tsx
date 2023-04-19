import { GridCol } from 'govuk-react'
import { ComponentProps, ReactNode } from 'react'
import { CardContainer, CardColumnHeading, CardColumnHeadingContainer, CardColumnGridCol } from './Card.styles'

interface CardProps {
  children: ReactNode
  label?: string
  theme?: 'primary' | 'secondary'
}

export const Card = ({ children, theme = 'primary', ...props }: CardProps) => {
  return (
    <CardContainer theme={theme} {...props}>
      {children}
    </CardContainer>
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
    <CardColumnGridCol $theme={theme} {...props}>
      <CardColumnHeadingContainer>
        <CardColumnHeading $theme={theme}>{heading}</CardColumnHeading>
        {sideContent}
      </CardColumnHeadingContainer>
      {children}
    </CardColumnGridCol>
  )
}
