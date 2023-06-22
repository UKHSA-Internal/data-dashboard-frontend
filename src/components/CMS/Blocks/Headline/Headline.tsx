import { HeadlineValue, Metric } from '@/components/Metrics'

import { useHeadline } from '@/hooks/store/useHeadline'

interface HeadlineProps {
  heading: string
  id: string
}

export const Headline = ({ heading, id }: HeadlineProps) => {
  const value = useHeadline(id)

  if (value) {
    return (
      <Metric>
        <HeadlineValue heading={heading} value={value} />
      </Metric>
    )
  }

  // TODO - Handle error state
  return null
}
