/* eslint-disable @next/next/no-img-element */
import { Suspense, useEffect, useState } from 'react'

import { ChartFigure } from '@/api/models/Chart'
import { getCharts } from '@/api/requests/charts/getCharts'
import { RequestParams as SubplotRequestParams} from '@/api/requests/charts/subplot/getSubplots'
import { getSubplots } from '@/api/requests/charts/subplot/getSubplots'
import { getChartSvg } from '@/app/utils/chart.utils'

import ChartInteractive from '../ChartInteractive/ChartInteractive'

interface ClientChartProps {
  data: SubplotRequestParams
  sizes: Array<
    | {
        default?: never
        minWidth: number
        size: 'narrow' | 'wide' | 'half' | 'third'
      }
    | {
        default: true
        minWidth?: never
        size: 'narrow' | 'wide' | 'half' | 'third'
      }
  >
}

const createStaticChart = ({
  sizes,
  charts,
  areaName,
  altText,
}: {
  sizes: ClientChartProps['sizes']
  charts: Awaited<ReturnType<typeof getCharts>>[]
  areaName: string | null
  altText: string
}) => {
  console.log('Create static chart, charts:', charts)

  return (
    <picture data-testid="chart" data-location={areaName}>
      {sizes.map((size, index) => {
        const chartSvg = charts[index].data?.chart
        // console.log("Decoded", decodeURIComponent(chartSvg?.replace(/\+/g, ' ') ?? ''))

        if (chartSvg) {
          return (
            <>
              <source
                key={index}
                media={`(min-width: ${size.minWidth}px)`}
                srcSet={`data:image/svg+xml;utf8,${getChartSvg(chartSvg)}`}
                data-testid={`chart-src-min-${size.minWidth}`}
              />
              <img
                key={index}
                alt={altText}
                src={`data:image/svg+xml;utf8,${getChartSvg(chartSvg)}`}
                className="w-full"
              />
            </>
          )
        }
      })}
    </picture>
  )
}

export function ClientChartSubplot({ data, sizes }: ClientChartProps) {
  const [chartResponses, setChartResponses] = useState<Awaited<ReturnType<typeof getSubplots>>[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSubplots = async () => {
      try {
        setLoading(true)
        const requests = sizes.map(() => getSubplots(data))

        const resolvedRequests = await Promise.all(requests)
        console.log('Chart responses:', resolvedRequests)
        console.log(resolvedRequests[0].data?.chart)
        setChartResponses(resolvedRequests)
      } catch (err) {
        console.error('Error fetching charts:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchSubplots()
  }, [data, sizes])

  if (loading) {
    return <div>Loading charts...</div>
  }

  if (error) {
    return <div>Error loading charts: {error}</div>
  }

  if (chartResponses.length === 0) {
    return <div>No chart data available</div>
  }

  // TODO: Handle empty chart client side
  // Check if any charts failed to load
  // if (chartResponses.some((request) => !request.success)) {
  //   return <ChartEmpty resetHref={getPathname()} />
  // }

  let figure: ChartFigure
  let altText: string

  const defaultChartResponse = chartResponses[chartResponses.length - 1].data

  if (defaultChartResponse) {
    figure = defaultChartResponse.figure
    altText = defaultChartResponse.alt_text
  }

  const staticChart = createStaticChart({
    sizes,
    charts: chartResponses,
    areaName: 'England',
    // Pick out the default chart (mobile-first)
    altText: altText! ?? '',
  })

  return (
    <div>
      {figure! && (
        <Suspense fallback={staticChart}>
          <ChartInteractive fallbackUntilLoaded={staticChart} figure={{ frames: [], ...figure }} />
        </Suspense>
      )}

      {/* Debugger */}
      <div><strong>Chart Responses:</strong> {chartResponses.length}</div>
      <div>
        {chartResponses.map((chart, index) => (
          <div key={chart.data?.chart}>
            <div className='mb-2'><strong>Chart {index}:</strong> {chart.data?.toString() ?? 'No chart data'}</div>
            <div><strong>Success:</strong> {chart.success.toString()}</div>
            <div><strong>Error:</strong> {chart.error?.toString()}</div>
          </div>
        ))}
      </div> 
    </div>
  )
}
