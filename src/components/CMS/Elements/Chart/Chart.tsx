import { extractAndFetchPageData } from '@/api/requests/cms/extractAndFetchPageData'
import { Chart as ChartComponent } from '@/components/Chart'

interface ChartProps {
  chartData: Awaited<ReturnType<typeof extractAndFetchPageData>>['charts'][number]
}

export const Chart = ({ chartData }: ChartProps) => {
  if (!chartData) {
    throw new Error('Missing data in Chart CMS Component - Check the chart is generated in getStaticProps')
  }

  if (chartData.success) {
    const { data } = chartData
    return <ChartComponent src={`data:image/svg+xml;utf8,${encodeURIComponent(data)}`} />
  }

  // TODO - Handle error state
  return null
}
