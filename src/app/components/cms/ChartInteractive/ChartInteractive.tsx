'use client'

import { Data, Layout } from 'plotly.js'
import { ReactElement, useEffect, useState } from 'react'
import Plot, { Figure } from 'react-plotly.js'
import { useIntersectionObserver } from 'usehooks-ts'

interface ChartInteractiveProps {
  fallbackUntilLoaded: ReactElement
  figure: Figure
}

type BarTrace = Data & {
  x?: unknown
  y?: unknown
  orientation?: 'h' | 'v'
  hovertemplate?: string | string[]
}

// Regex to swap x and y axis in hovertemplate string
// Matches all intances in the string of x / y and swaps them, leaving the rest of the string intact
const swapHoverTemplateAxes = (template?: string): string | undefined =>
  template?.replace(/%\{(x|y)([^}]*)\}/g, (_, axis, rest) => `%{${axis === 'x' ? 'y' : 'x'}${rest}}`)

export const withSwappedBarOrientation = ({
  data = [],
  layout,
}: Pick<Figure, 'data' | 'layout'>): Pick<Figure, 'data' | 'layout'> => {
  // Checks all plots are 'Bar', only rotating full bar charts for now
  const allTracesAreBar = data.length > 0 && data.every((trace) => trace.type === 'bar')
  if (!allTracesAreBar) return { data, layout }

  return {
    data: (data as BarTrace[]).map((trace) => {
      const swappedTrace = {
        ...trace,
        orientation: trace.orientation === 'h' ? 'v' : 'h',
        x: trace.y,
        y: trace.x,
        hovertemplate: swapHoverTemplateAxes(trace.hovertemplate as string | undefined),
      } as Data

      return swappedTrace
    }),
    layout: { ...layout, xaxis: layout?.yaxis, yaxis: layout?.xaxis } as Layout,
  }
}

function getIsNarrowScreen() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(max-width: 700px)').matches
}

export default function ChartInteractive({ fallbackUntilLoaded, figure: { data, layout } }: ChartInteractiveProps) {
  const [loaded, setLoaded] = useState(false)
  const [isNarrowScreen, setIsNarrowScreen] = useState(getIsNarrowScreen)

  useEffect(() => {
    const mediaWatcher = window.matchMedia('(max-width: 700px)')

    function updateIsNarrowScreen(event: MediaQueryListEvent) {
      setIsNarrowScreen(event.matches)
    }
    mediaWatcher.addEventListener('change', updateIsNarrowScreen)

    return function cleanup() {
      mediaWatcher.removeEventListener('change', updateIsNarrowScreen)
    }
  }, [])

  let dynamicData = data
  let dynamicLayout = layout

  if (isNarrowScreen) {
    const swappedBar = withSwappedBarOrientation({ data, layout })
    dynamicData = swappedBar.data
    dynamicLayout = swappedBar.layout
  }

  const { isIntersecting, ref } = useIntersectionObserver({
    freezeOnceVisible: true,
  })

  return (
    <div ref={ref}>
      {!loaded ? fallbackUntilLoaded : null}
      {isIntersecting ? (
        <Plot
          onInitialized={() => setLoaded(true)}
          data={dynamicData}
          layout={dynamicLayout}
          style={{ width: '100%', height: '100%' }}
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
