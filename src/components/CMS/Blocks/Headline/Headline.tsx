import { HeadlineValue, Metric } from '@/components/Metrics'
import { useHeadline } from '@/hooks/store/useHeadline'

interface HeadlineProps {
  heading: string
  id: string
  position?: 'top' | 'bottom'
}

export const Headline = ({ heading, id, position }: HeadlineProps) => {
  const headline = useHeadline(id, position)

  if (headline) {
    const { value } = headline
    return (
      <Metric>
        <HeadlineValue heading={heading} value={value} />
      </Metric>
    )
  }

  // TODO - Handle error state
  return null
}
