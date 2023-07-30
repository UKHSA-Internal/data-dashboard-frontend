import { getCharts } from '@/api/requests/charts/getCharts'
import { PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { getTabular } from '@/api/requests/tabular/getTabular'
import { chartSizes } from '@/config/constants'
import { logger } from '@/lib/logger'

/**
 * React Server Components (RSC) asyncronously send all fetch requests in a batch which is
 * causing 504 gateway timeouts in NodeJs due to the volume and size of our calls.
 *
 * This util can be called prior to the RSC being rendered and is designed to syncronously
 * send the heaviest calls and populate NextJs' fetch cache. Subsequent async fetch requests
 * in the RSC will have a cache hit.
 */
export async function warmChartCache<T extends PageType.Home | PageType.Topic>(
  body: Awaited<ReturnType<typeof getPageBySlug<T>>>['body']
) {
  for (const section of body) {
    for (const card of section.value.content) {
      if (card.type === 'chart_row_card') {
        const size = card.value.columns.length === 1 ? 'wide' : 'narrow'

        for (const column of card.value.columns) {
          const { chart, x_axis, y_axis } = column.value

          const plots = chart.map((plot) => plot.value)

          logger.info(`Pre-warming cache for chart: ${column.value.title}`)
          await getCharts({
            plots,
            x_axis,
            y_axis,
            chart_width: chartSizes[size].width,
            chart_height: chartSizes[size].height,
          })

          logger.info(`Pre-warming cache for table: ${column.value.title}`)
          await getTabular(plots)
        }
      }
    }
  }
}
