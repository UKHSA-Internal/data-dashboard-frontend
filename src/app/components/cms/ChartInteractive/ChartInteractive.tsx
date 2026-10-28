'use client'

import { Data, Layout } from 'plotly.js'
import { ReactElement, type RefObject, useMemo, useRef, useState } from 'react'
import Plot, { Figure } from 'react-plotly.js'
import { useIntersectionObserver, useResizeObserver } from 'usehooks-ts'

import { FigureConfig } from '@/api/requests/charts/getCharts'
import { chartSizes } from '@/config/constants'
import { logger } from '@/lib/logger'

interface ChartInteractiveProps {
  fallbackUntilLoaded: ReactElement
  figure: Figure
  chartHeight: number
  figureConfig?: FigureConfig
}

type DynamicChartConfig = {
  data: Data[]
  layout: Partial<Layout>
}

export default function ChartInteractive({
  fallbackUntilLoaded,
  figure: { data, layout },
  chartHeight,
  figureConfig,
}: ChartInteractiveProps) {
  const [loaded, setLoaded] = useState(false)
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const { width: chartWidth } = useResizeObserver<HTMLDivElement>({
    ref: chartContainerRef as RefObject<HTMLDivElement>,
  })
  const isCompactChart = chartWidth === undefined || chartWidth < chartSizes.wide.width

  const dyanmicChartConfig = useMemo<DynamicChartConfig>(() => {
    const unModified: DynamicChartConfig = { data, layout }

    if (!figureConfig) return unModified

    const { data: dataOverrides = null, layout: layoutOverrides = null } = isCompactChart
      ? figureConfig.compact
      : figureConfig.full

    if (!dataOverrides || dataOverrides?.length !== data.length) {
      logger.error("Chart rendering error: data overides don't match chart data size")
      return unModified
    }

    return {
      data: data.map((plot, idx) => ({ ...plot, ...dataOverrides[idx] }) as Data),
      layout:
        layoutOverrides && Object.keys(layoutOverrides).length > 0 ? { ...layout, ...layoutOverrides } : { ...layout },
    }
  }, [data, layout, figureConfig, isCompactChart])

  const { isIntersecting, ref } = useIntersectionObserver({
    freezeOnceVisible: true,
  })

  return (
    <div ref={chartContainerRef}>
      <div ref={ref}>
        {!loaded ? fallbackUntilLoaded : null}
        {isIntersecting ? (
          <Plot
            onInitialized={() => setLoaded(true)}
            data={dyanmicChartConfig.data}
            layout={dyanmicChartConfig.layout}
            style={{ width: '100%', height: `${chartHeight}px` }}
            config={{
              displayModeBar: false,
              scrollZoom: false,
              responsive: true,
            }}
            useResizeHandler
          />
        ) : null}
      </div>
    </div>
  )
}
