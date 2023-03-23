import { ReactNode } from 'react'
import { Container, Heading, LastUpdated } from './Page.styles'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'

dayjs().format()
dayjs.extend(advancedFormat)

interface PageProps {
  heading: string
  children: ReactNode
  lastUpdated: string
}

const getLastUpdatedText = (datetime: Date) => {
  const date = dayjs(datetime)
  return `Last updated on ${date.format('MMMM Do YYYY')} at ${date.format('hh:mma')}`
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
