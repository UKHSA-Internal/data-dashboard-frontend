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

  delete layout.width

  return (
    <div ref={ref}>
      {!loaded ? fallbackUntilLoaded : null}
      {isIntersecting ? (
        <Plot
          onInitialized={() => setLoaded(true)}
          data={data.map((plot) => ({ ...plot, hovertemplate: `%{y} <extra></extra>` }))}
          layout={{
            ...layout,
            legend: {
              ...layout.legend,
              itemclick: false,
              itemdoubleclick: false,
            },
            hoverlabel: {
              bgcolor: '#0b0c0c',
              bordercolor: '#0b0c0c',
              font: {
                color: 'white',
                size: 16,
                family: 'var(--font-primary), arial, sans-serif',
              },
            },
            xaxis: {
              ...layout.xaxis,
              showspikes: false,
            },
            autosize: true,
          }}
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
