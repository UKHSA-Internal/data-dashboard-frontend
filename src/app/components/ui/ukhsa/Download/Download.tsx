import { ChartComponentData } from '@/api/models/cms/Page'
import { getTables } from '@/api/requests/tables/getTables'
import { getAreaSelector } from '@/app/hooks/getAreaSelector'
import { getPathname } from '@/app/hooks/getPathname'
import { dualCategoryChartToDownloadChart, isDualCategoryChartCardValue } from '@/app/utils/chart.utils'
import { authEnabled } from '@/config/constants'

import { ChartEmpty } from '../ChartEmpty/ChartEmpty'
import { DownloadForm } from './DownloadForm'

interface DownloadProps {
  data: ChartComponentData
  isPublic?: boolean
}

// const getDualCategoryChartDownloadData = () => {
// }

// const getSingleCategoryChartDownloadData = () => {
// }

// const getDownloadResponseData = (data: any) => {
//   let downloadsResponse = null

//   if ('segments' in data && 'static_feilds' in data) {
//     downloadsResponse = getDualCategoryChartDownloadData(data)
//   } else {
//     downloadsResponse = getSingleCategoryChartDownloadData(data)
//   }
// }

export async function Download({ data, isPublic }: DownloadProps) {
  const pathname = await getPathname()
  const [areaType, areaName] = await getAreaSelector()

  // getDownloadResponseData(data)

  const chart = isDualCategoryChartCardValue(data) ? dualCategoryChartToDownloadChart(data) : data.chart

  const { y_axis, x_axis, tag_manager_event_id } = data

  const confidence_intervals = isDualCategoryChartCardValue(data) ? false : (data.confidence_intervals ?? false)

  const plots = chart.map((plot) => ({
    ...plot.value,
    geography_type: areaType ?? plot.value.geography_type,
    geography: areaName ?? plot.value.geography,
  }))

  // Call the table endpoint to check ahead of time if we have any data to download
  const tableResponse = await getTables({
    plots,
    x_axis,
    y_axis,
  })

  if (tableResponse.success) {
    return (
      <DownloadForm
        chart={chart.map((plot) => ({
          ...plot,
          value: {
            ...plot.value,
            geography_type: areaType ?? plot.value.geography_type,
            geography: areaName ?? plot.value.geography,
          },
        }))}
        xAxis={x_axis}
        tagManagerEventId={tag_manager_event_id}
        confidenceIntervals={confidence_intervals}
        isPublic={isPublic}
        authEnabled={authEnabled}
      />
    )
  }

  return <ChartEmpty resetHref={pathname} />
}
