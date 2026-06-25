import { ChartComponentData, DualCategoryChartCardValue, SingleCategoryChartCardValue } from '@/api/models/cms/Page'
import { getDualCategoryTables } from '@/api/requests/tables/getDualCategoryTables'
import { getTables } from '@/api/requests/tables/getTables'
import { getAreaSelector } from '@/app/hooks/getAreaSelector'
import { getPathname } from '@/app/hooks/getPathname'
import { isDualCategoryChartCardValue } from '@/app/utils/chart.utils'
import { authEnabled } from '@/config/constants'

import { ChartEmpty } from '../ChartEmpty/ChartEmpty'
import { DownloadForm } from './DownloadForm'
import { DualCategoryDownloadForm } from './DualCategoryDownloadForm'

interface DownloadProps {
  data: ChartComponentData
  isPublic?: boolean
}

const getDualCategoryDownloadData = (
  data: DualCategoryChartCardValue,
  areaType: string | null,
  areaName: string | null
) => {
  return getDualCategoryTables({
    chart_type: data.chart_type,
    static_fields: {
      ...data.static_fields,
      geography_type: areaType ?? data.static_fields.geography_type,
      geography: areaName ?? data.static_fields.geography,
    },
    primary_field_values: data.primary_field_values,
    secondary_category: data.secondary_category,
    segments: data.segments.map(({ value }) => value),
    x_axis: data.x_axis,
    y_axis: data.y_axis,
  })
}

const getSingleCategoryDownloadData = (
  data: SingleCategoryChartCardValue,
  areaType: string | null,
  areaName: string | null
) => {
  const plots = data.chart.map((plot) => ({
    ...plot.value,
    geography_type: areaType ?? plot.value.geography_type,
    geography: areaName ?? plot.value.geography,
  }))

  return getTables({
    plots,
    x_axis: data.x_axis,
    y_axis: data.y_axis,
  })
}

export async function Download({ data, isPublic }: DownloadProps) {
  const pathname = await getPathname()
  const [areaType, areaName] = await getAreaSelector()
  const isDualCategory = isDualCategoryChartCardValue(data)

  const tableResponse = isDualCategory
    ? await getDualCategoryDownloadData(data, areaType, areaName)
    : await getSingleCategoryDownloadData(data, areaType, areaName)

  if (!tableResponse.success) {
    return <ChartEmpty resetHref={pathname} />
  }

  if (isDualCategory) {
    return (
      <DualCategoryDownloadForm
        chartData={data}
        tagManagerEventId={data.tag_manager_event_id}
        isPublic={isPublic}
        authEnabled={authEnabled}
      />
    )
  }

  const chart = data.chart.map((plot) => ({
    ...plot,
    value: {
      ...plot.value,
      geography_type: areaType ?? plot.value.geography_type,
      geography: areaName ?? plot.value.geography,
    },
  }))

  return (
    <DownloadForm
      chart={chart}
      xAxis={data.x_axis}
      tagManagerEventId={data.tag_manager_event_id}
      confidenceIntervals={data.confidence_intervals ?? false}
      isPublic={isPublic}
      authEnabled={authEnabled}
    />
  )
}
