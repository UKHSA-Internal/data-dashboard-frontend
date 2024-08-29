'use client'

import Plot from 'react-plotly.js'
import { useIntersectionObserver } from 'usehooks-ts'

import singleLine from './single-line.json'

export default function ChartInteractive() {
  const { isIntersecting, ref } = useIntersectionObserver({
    freezeOnceVisible: true,
  })
  return (
    <div ref={ref}>
      {isIntersecting ? (
        <Plot
          className="h-[400px] w-full"
          data={singleLine.figure.data}
          layout={singleLine.figure.layout}
          config={{
            displayModeBar: false,
            scrollZoom: false,
          }}
          useResizeHandler
        />
      ) : null}
    </div>
  )
}
