/* eslint-disable @next/next/no-img-element */
import { Suspense, useEffect, useState } from 'react'
import { z } from 'zod'

import { ChartFigure } from '@/api/models/Chart'
import { ChartCardSchemas } from '@/api/models/cms/Page'
import { getCharts } from '@/api/requests/charts/getCharts'
import { getChartSvg } from '@/app/utils/chart.utils'
import { chartSizes } from '@/config/constants'
import { useSelectedFilters } from '@/app/hooks/globalFilterHooks'
import { RequestParams } from '@/api/requests/charts/getCharts'

import ChartInteractive from '../ChartInteractive/ChartInteractive'
import { TimePeriodSelector } from '../../ui/ukhsa/TimePeriodSelector/TimePeriodSelector'
import { TimePeriod } from '@/api/models/cms/Page/GlobalFilter'

interface ClientChartProps {
  data: z.infer<typeof ChartCardSchemas>['value']
  legendTitle: string
  timePeriods: TimePeriod[]
  // enableInteractive?: boolean
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

export function ClientChart({ data, sizes, legendTitle, timePeriods }: ClientChartProps) {
  const [chartResponses, setChartResponses] = useState<Awaited<ReturnType<typeof getCharts>>[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentTimePeriodIndex, setCurrentTimePeriodIndex] = useState(timePeriods.length - 2)

  const handleTimePeriodChange = (index: number) => {
    setCurrentTimePeriodIndex(index)
  }

  console.log('client chart data: ', data)
  useEffect(() => {
    const fetchCharts = async () => {
      try {
        setLoading(true)

        const chartData = data

        console.log('client chartData: ', chartData)

        let yAxisMinimum = null
        let yAxisMaximum = null
        let xAxisTitle = ''
        let yAxisTitle = ''

        if ('y_axis_minimum_value' in chartData) {
          yAxisMinimum = chartData.y_axis_minimum_value
        }
        if ('y_axis_maximum_value' in chartData) {
          yAxisMaximum = chartData.y_axis_maximum_value
        }
        if ('x_axis_title' in chartData) {
          xAxisTitle = chartData.x_axis_title || ''
        }
        if ('y_axis_title' in chartData) {
          yAxisTitle = chartData.y_axis_title || ''
        }

        const { plots, x_axis, y_axis } = chartData

        let updatedPlots = plots.map((plot) => {
          return {
            ...plot,
            date_from: timePeriods[currentTimePeriodIndex].value.date_from,
            date_to: timePeriods[currentTimePeriodIndex].value.date_to,
          }
        })

        console.log('--------------------------------')
        console.log('Getting charts with: ')
        console.log('existing plots: ', plots)
        console.log('Plots: ', updatedPlots)
        console.log('X axis: ', x_axis)
        console.log('Y axis: ', y_axis)
        console.log('X axis title: ', xAxisTitle)
        console.log('Y axis title: ', yAxisTitle)
        console.log('Y axis maximum value: ', yAxisMaximum)
        console.log('Y axis minimum value: ', yAxisMinimum)
        console.log('--------------------------------')

        const requests =
          updatedPlots &&
          sizes.map((chart) =>
            getCharts({
              plots: updatedPlots,
              x_axis,
              y_axis,
              x_axis_title: xAxisTitle,
              y_axis_title: yAxisTitle,
              y_axis_maximum_value: yAxisMaximum,
              y_axis_minimum_value: yAxisMinimum,
              chart_width: chartSizes[chart.size]?.width ?? 515,
              chart_height: chartSizes[chart.size]?.height ?? 260,
            })
          )

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

    fetchCharts()
  }, [currentTimePeriodIndex, data, sizes])

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
      <h1 className="text-center">{legendTitle}</h1>
      {figure! && (
        <Suspense fallback={staticChart}>
          <ChartInteractive fallbackUntilLoaded={staticChart} figure={{ frames: [], ...figure }} />
        </Suspense>
      )}
      <div className="pt-6">
        <TimePeriodSelector
          timePeriods={timePeriods}
          currentTimePeriodIndex={currentTimePeriodIndex}
          onTimePeriodChange={handleTimePeriodChange}
        />
      </div>
      {/* Debugger */}
      {/* <div><strong>Chart Responses:</strong> {chartResponses.length}</div>
      <div>
        {chartResponses.map((chart, index) => (
          <div key={chart.data?.chart}>
            <div className='mb-2'><strong>Chart {index}:</strong> {chart.data?.toString() ?? 'No chart data'}</div>
            <div><strong>Success:</strong> {chart.success.toString()}</div>
            <div><strong>Error:</strong> {chart.error?.toString()}</div>
          </div>
        ))}
      </div> */}
    </div>
  )
}
