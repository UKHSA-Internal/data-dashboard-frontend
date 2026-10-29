'use client'

import { Data, Layout } from 'plotly.js'
import { ReactElement, type RefObject, useMemo, useRef, useState } from 'react'
import Plot, { Figure } from 'react-plotly.js'
import { useIntersectionObserver, useResizeObserver, useWindowSize } from 'usehooks-ts'

import { FigureConfig } from '@/api/requests/charts/getCharts'
import { chartSizes, singleColumnLayoutBreakpoint } from '@/config/constants'
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
  height: number
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
  const { width: viewportWidth } = useWindowSize()
  const isCompactChart = chartWidth === undefined || chartWidth < chartSizes.wide.width
  const isCompactRotatedChart = viewportWidth > 0 && viewportWidth < singleColumnLayoutBreakpoint

  const dyanmicChartConfig = useMemo<DynamicChartConfig>(() => {
    const unModified: DynamicChartConfig = { data, layout, height: chartHeight }

    if (!figureConfig) return unModified

    const { data: dataOverrides = null, layout: layoutOverrides = null } = isCompactRotatedChart
      ? figureConfig.compact_rotated
      : isCompactChart
        ? figureConfig.compact
        : figureConfig.full

    if (!dataOverrides || dataOverrides?.length !== data.length) {
      logger.error("Chart rendering error: data overides don't match chart data size")
      return unModified
    }

    const compactHeight = layoutOverrides?.height
    const responsiveHeight =
      isCompactChart && typeof compactHeight === 'number' && compactHeight > 0 ? compactHeight : chartHeight
    const mergedLayout: Partial<Layout> =
      layoutOverrides && Object.keys(layoutOverrides).length > 0 ? { ...layout, ...layoutOverrides } : { ...layout }

    return {
      data: data.map((plot, idx) => ({ ...plot, ...dataOverrides[idx] }) as Data),
      layout: mergedLayout,
      height: responsiveHeight,
    }
  }, [chartHeight, data, layout, figureConfig, isCompactChart, isCompactRotatedChart])

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
            style={{ width: '100%', height: `${dyanmicChartConfig.height}px` }}
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
