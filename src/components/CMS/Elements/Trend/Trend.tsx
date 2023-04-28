import { extractAndFetchPageData } from '@/api/requests/cms/extractAndFetchPageData'
import { HeadlineTrend, Metric } from '@/components/Metrics'

interface TrendProps {
  heading: string
  trendData: Awaited<ReturnType<typeof extractAndFetchPageData>>['trends'][number]
}

export const Trend = ({ heading, trendData }: TrendProps) => {
  if (!trendData) {
    throw new Error('Missing data in Trend CMS Component - Check the trend is generated in getStaticProps')
  }

  if (trendData.success) {
    const { data } = trendData
    return (
      <Metric>
        <HeadlineTrend
          heading={heading}
          direction={data.direction}
          colour={data.colour}
          value={`${data.metric_value} ${data.percentage_metric_value}`}
        />
      </Metric>
    )
  }

  // TODO - Handle error state
  return null
}
