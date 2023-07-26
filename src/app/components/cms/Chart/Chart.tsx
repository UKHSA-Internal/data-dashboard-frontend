import Image from 'next/image'
import { z } from 'zod'

import { WithChartCard, WithChartHeadlineAndTrendCard } from '@/api/models/cms/Page'
import { getCharts } from '@/api/requests/charts/getCharts'
import { getChartSvg } from '@/app/utils/chart.utils'
import { chartSizes } from '@/config/constants'

interface ChartProps {
  /* Request metadata from the CMS required to fetch from the headlines api */
  data: z.infer<typeof WithChartHeadlineAndTrendCard>['value'] | z.infer<typeof WithChartCard>['value']

  /* Size of chart based on whether the chart is displayed in a 1 or 2 column layout */
  size: 'narrow' | 'wide'
}

export async function Chart({ data, size }: ChartProps) {
  const { chart, x_axis, y_axis } = data

  const plots = chart.map((plot) => plot.value)

  const res = await getCharts({
    plots,
    x_axis,
    y_axis,
    chart_width: chartSizes[size].width,
    chart_height: chartSizes[size].height,
  })

  if (res.success) {
    const {
      data: { chart },
    } = res

    return (
      <div className="govuk-!-margin-top-4 govuk-!-margin-bottom-6 relative h-[var(--ukhsa-chart-height)] w-full md:min-w-[320px]">
        <Image priority unoptimized alt="" fill sizes="100vw" src={`data:image/svg+xml;utf8,${getChartSvg(chart)}`} />
      </div>
    )
  }

  return null
}
