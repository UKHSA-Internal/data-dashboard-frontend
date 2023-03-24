import { ReactNode } from 'react'
import { Container, Heading, LastUpdated } from './Page.styles'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'

dayjs().format()

interface PageProps {
  heading: string
  children: ReactNode
  lastUpdated: string
}

const getLastUpdatedText = (datetime: Date) => {
  const date = dayjs(datetime)
  return `Last updated on ${date.format('dddd, D MMMM YYYY')} at ${date.format('hh:mma')}`
}

export const Page = ({ children, heading, lastUpdated }: PageProps) => {
  return (
    <Container>
      <LastUpdated>{getLastUpdatedText(new Date(lastUpdated))}</LastUpdated>
      <Heading>{heading}</Heading>
      {children}
    </Container>
  )
}
