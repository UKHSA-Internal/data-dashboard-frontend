import { Container } from './Metric.styles'

interface MetricProps {
  children: React.ReactNode
}

export const Metric = ({ children }: MetricProps) => {
  return <Container>{children}</Container>
}
