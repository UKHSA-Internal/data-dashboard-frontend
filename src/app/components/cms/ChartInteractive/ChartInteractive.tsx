'use client'

import { ReactElement, useState } from 'react'
import Plot, { Figure } from 'react-plotly.js'
import { useIntersectionObserver } from 'usehooks-ts'

interface ChartInteractiveProps {
  fallbackUntilLoaded: ReactElement
  figure: Figure
}

const withoutTickMarks = (layout: Figure['layout']): Figure['layout'] => ({
  ...layout,
  xaxis: { ...layout?.xaxis, ticks: '', showticklabels: false },
  yaxis: { ...layout?.yaxis, ticks: '', showticklabels: false },
})

export const withMoreTickMarks = (layout: Figure['layout']): Figure['layout'] => ({
  ...layout,
  xaxis: { ...layout?.xaxis, nticks: 20, ticks: 'outside', showticklabels: true },
  yaxis: { ...layout?.yaxis, nticks: 20, ticks: 'outside', showticklabels: true },
})

export const withFewerTickMarks = (layout: Figure['layout']): Figure['layout'] => ({
  ...layout,
  xaxis: { ...layout?.xaxis, nticks: 2, ticks: 'outside', showticklabels: true },
  yaxis: { ...layout?.yaxis, nticks: 2, ticks: 'outside', showticklabels: true },
})

export const withSwappedBarOrientation = ({ data = [], layout }: Figure): Pick<Figure, 'data' | 'layout'> => ({
  data: data.map((trace) =>
    trace.type !== 'bar'
      ? trace
      : { ...trace, orientation: trace.orientation === 'h' ? 'v' : 'h', x: trace.y, y: trace.x }
  ),
  layout: {
    ...layout,
    xaxis: layout?.yaxis,
    yaxis: layout?.xaxis,
  },
})

export default function ChartInteractive({ fallbackUntilLoaded, figure: { data, layout } }: ChartInteractiveProps) {
  const [loaded, setLoaded] = useState(false)

  // Data
  let dynamicData = data

  // Layout
  let dynamicLayout = layout
  // dynamicLayout = withoutTickMarks(layout)
  dynamicLayout = withMoreTickMarks(layout)
  // dynamicLayout = withFewerTickMarks(layout)
  
  // const swappedBar = withSwappedBarOrientation({ data, layout })
  // dynamicData = swappedBar.data
  // dynamicLayout = swappedBar.layout


  return (
    <div>
      {!loaded ? fallbackUntilLoaded : null}
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
        />
    </div>
  )
}
