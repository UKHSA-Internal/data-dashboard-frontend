import { HeadlineValue, Metric } from '@/components/Metrics'
import { usePercentage } from '@/hooks/store/usePercentage'

interface PercentageProps {
  heading: string
  id: string
}

export const Percentage = ({ heading, id }: PercentageProps) => {
  const value = usePercentage(id)

  if (value) {
    return (
      <Metric>
        <HeadlineValue heading={heading} value={value} percent />
      </Metric>
    )
  }

  // TODO - Handle error state
  return null
}
