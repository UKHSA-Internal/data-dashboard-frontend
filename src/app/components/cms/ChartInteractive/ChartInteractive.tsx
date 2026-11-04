'use client'

import { Layout } from 'plotly.js'
import { ReactElement, type RefObject, useMemo, useRef, useState } from 'react'
import Plot, { Figure } from 'react-plotly.js'
import { useIntersectionObserver, useResizeObserver } from 'usehooks-ts'

import { FigureConfig } from '@/api/requests/charts/getCharts'
import { chartSizes } from '@/config/constants'

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

  const dynamicLayout = useMemo<Partial<Layout>>(() => {
    const layoutOverrides = isCompactChart ? figureConfig?.xaxis_compact : figureConfig?.xaxis_full

    if (!layoutOverrides || Object.keys(layoutOverrides).length === 0) return layout

    return {
      ...layout,
      xaxis: {
        ...layout.xaxis,
        ...layoutOverrides,
      },
      autosize: true,
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
            data={data}
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
