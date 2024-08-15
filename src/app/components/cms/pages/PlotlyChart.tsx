'use client'

import Plot from 'react-plotly.js'

import multiBar from './plot-data/multi-bar-plots.json'
import multiLine from './plot-data/multi-line-plots.json'
import singleBar from './plot-data/single-bar-plot.json'
import singleLine from './plot-data/single-line.json'

export function PlotlyChart() {
  return (
    <div>
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
      <br />
      <br />
      <br />
      <Plot
        className="h-[400px] w-full"
        data={multiLine.figure.data}
        layout={multiLine.figure.layout}
        config={{
          displayModeBar: false,
          scrollZoom: false,
        }}
        useResizeHandler
      />
      <br />
      <br />
      <br />
      <Plot
        className="h-[400px] w-full"
        data={singleBar.figure.data}
        layout={singleBar.figure.layout}
        config={{
          displayModeBar: false,
          scrollZoom: false,
        }}
        useResizeHandler
      />
      <br />
      <br />
      <br />
      <Plot
        className="h-[400px] w-full"
        data={multiBar.figure.data}
        layout={multiBar.figure.layout}
        config={{
          displayModeBar: false,
          scrollZoom: false,
        }}
        useResizeHandler
      />
    </div>
  )
}
