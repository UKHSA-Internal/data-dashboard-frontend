import { z } from 'zod'

import { WithChartCard, WithChartHeadlineAndTrendCard } from '@/api/models/cms/Page'
import { getTables } from '@/api/requests/tables/getTables'
import { useAreaSelector } from '@/app/hooks/useAreaSelector'
import { usePathname } from '@/app/hooks/usePathname'

import { ChartEmpty } from '../ChartEmpty/ChartEmpty'
import { DownloadForm } from './DownloadForm'

interface DownloadProps {
  /* Request metadata from the CMS required to fetch from the tables api */
  data: z.infer<typeof WithChartHeadlineAndTrendCard>['value'] | z.infer<typeof WithChartCard>['value']
}

export async function Download({ data: { chart, y_axis, x_axis, tag_manager_event_id } }: DownloadProps) {
  const pathname = usePathname()
  const [areaType, areaName] = useAreaSelector()

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
        tagManagerEventId={tag_manager_event_id}
      />
    )
  }

  return <ChartEmpty resetHref={pathname} />
}
