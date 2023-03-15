import { ReactNode } from 'react'
import { Container, Heading } from './Page.styles'

interface PageProps {
  heading: string
  children: ReactNode
}

export const Page = ({ children, heading }: PageProps) => {
  return (
    <Container>
      <Heading>{heading}</Heading>
      {children}
    </Container>
  )
}
