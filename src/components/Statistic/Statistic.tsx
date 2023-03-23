import { ReactNode } from 'react'
import { Heading, Container, Value } from './Statistic.styles'

interface HeadingAndValue {
  heading: string
  value: string
  children?: never
}

interface HeadingAndCustomContent {
  heading: string
  value?: never
  children: ReactNode
}

type StatisticProps = HeadingAndValue | HeadingAndCustomContent

export const Statistic = ({ heading, value, children }: StatisticProps) => {
  return (
    <Container>
      <Heading>{heading}</Heading>
      {value ? (
        <Value>{Number(value).toLocaleString(undefined, { maximumFractionDigits: 0, minimumFractionDigits: 0 })}</Value>
      ) : (
        children
      )}
    </Container>
  )
}
