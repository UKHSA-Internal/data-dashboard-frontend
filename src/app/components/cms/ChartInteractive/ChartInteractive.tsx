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

  const dyanmicData = useMemo<Data[]>(() => {
    const dataOverrides = isCompactChart ? figureConfig?.compact.data : figureConfig?.full.data

    if (!dataOverrides || Object.keys(dataOverrides).length === 0) return data

    if (dataOverrides.length !== data.length) {
      logger.error("Chart rendering error: data overides don't match chart data size")
      return data
    }

    return data.map((plot, idx) => ({ ...plot, ...dataOverrides[idx] }) as Data)
  }, [data, figureConfig, isCompactChart])

  const dynamicLayout = useMemo<Partial<Layout>>(() => {
    const layoutOverrides = isCompactChart ? figureConfig?.compact.layout : figureConfig?.full.layout

    if (!layoutOverrides || Object.keys(layoutOverrides).length === 0) return layout

    return {
      ...layout,
      ...layoutOverrides,
    }
  }, [layout, figureConfig, isCompactChart])

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
            data={dyanmicData}
            layout={dynamicLayout}
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
