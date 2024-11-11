'use client'

import { useState } from 'react'
import Plot, { Figure } from 'react-plotly.js'
import { useIntersectionObserver } from 'usehooks-ts'

interface ChartInteractiveProps {
  fallbackUntilLoaded: JSX.Element
  figure: Figure
}

export default function ChartInteractive({ fallbackUntilLoaded, figure: { data, layout } }: ChartInteractiveProps) {
  const [loaded, setLoaded] = useState(false)

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
          layout={layout}
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
