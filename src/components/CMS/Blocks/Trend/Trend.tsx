import { HeadlineTrend, Metric } from '@/components/Metrics'
import { useTrend } from '@/hooks/store/useTrend'

interface TrendProps {
  heading: string
  id: string
}

export const Trend = ({ heading, id }: TrendProps) => {
  const trend = useTrend(id)

  if (trend) {
    const { direction, colour, metric_value: value, percentage_metric_value: percentage } = trend
    return (
      <Metric>
        <HeadlineTrend heading={heading} direction={direction} colour={colour} value={`${value} ${percentage}`} />
      </Metric>
    )
  }

  // TODO - Handle error state
  return null
}
