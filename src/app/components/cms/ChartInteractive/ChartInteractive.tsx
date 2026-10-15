'use client'

import { Layout } from 'plotly.js'
import { ReactElement, useEffect, useMemo, useState } from 'react'
import Plot, { Figure } from 'react-plotly.js'
import { useIntersectionObserver } from 'usehooks-ts'

import { FigureConfig } from '@/api/requests/charts/getCharts'

export const NARROW_SCREEN_QUERY = '(max-width: 1100px)'

interface ChartInteractiveProps {
  fallbackUntilLoaded: ReactElement
  figure: Figure
  chartHeight: number
  figureConfig?: FigureConfig
}

function getIsNarrowScreen() {
  if (typeof window === 'undefined') return false
  return window.matchMedia(NARROW_SCREEN_QUERY).matches
}

export default function ChartInteractive({
  fallbackUntilLoaded,
  figure: { data, layout },
  chartHeight,
  figureConfig,
}: ChartInteractiveProps) {
  const [loaded, setLoaded] = useState(false)
  const [isNarrowScreen, setIsNarrowScreen] = useState(getIsNarrowScreen)

  useEffect(() => {
    const mediaWatcher = window.matchMedia(NARROW_SCREEN_QUERY)
    function updateIsNarrowScreen(event: MediaQueryListEvent) {
      setIsNarrowScreen(event.matches)
    }
    mediaWatcher.addEventListener('change', updateIsNarrowScreen)
    return function cleanup() {
      mediaWatcher.removeEventListener('change', updateIsNarrowScreen)
    }
  }, [])

  const dynamicLayout = useMemo<Partial<Layout>>(() => {
    const layoutOverrides = isNarrowScreen ? figureConfig?.xaxis_compact : figureConfig?.xaxis_full

    if (!layoutOverrides || Object.keys(layoutOverrides).length === 0) return layout

    return {
      ...layout,
      xaxis: {
        ...layoutOverrides,
      },
      autosize: true,
    }
  }, [layout, figureConfig, isNarrowScreen])

  const { isIntersecting, ref } = useIntersectionObserver({
    freezeOnceVisible: true,
  })

  return (
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
  )
}
