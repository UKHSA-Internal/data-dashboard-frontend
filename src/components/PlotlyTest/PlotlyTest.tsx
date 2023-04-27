import dynamic from 'next/dynamic'
import { Container } from './PlotlyTest.styles'

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false })

const layout = {
  showlegend: false,
  height: 220,
  margin: {
    t: 20,
    b: 15,
    l: 0,
    r: 0,
  },
  xaxis: { fixedrange: true },
  yaxis: { fixedrange: true },
  paper_bgcolor: 'transparent',
  plot_bgcolor: 'transparent',
}

const config = {
  displayModeBar: false,
  responsive: true,
}

interface PlotlyTestProps {
  show: boolean
  displayHandler: () => void
}

const PlotlyTest = ({ show, displayHandler }: PlotlyTestProps) => {
  return (
    <Container show={show}>
      <Plot
        data={[
          {
            x: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
            y: [12, 17, 15, 13, 14, 15, 12.5],
            mode: 'lines+markers',
            line: { shape: 'spline' },
            type: 'scatter',
            marker: { color: '#383F43' },
          },
        ]}
        layout={layout}
        config={config}
        onAfterPlot={displayHandler}
        useResizeHandler={true}
        style={{ width: '100%', height: '220px' }}
      />
    </Container>
  )
}

export default PlotlyTest
