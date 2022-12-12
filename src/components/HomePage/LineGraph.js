import Plotly from "plotly.js-cartesian-dist";
import React from "react";
import createPlotlyComponent from "react-plotly.js/factory";
import "./LineGraph.css";

const Plot = createPlotlyComponent(Plotly);

class LineGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
    };
  }

  render() {
    const { data } = this.state;

    return (
      <Plot
        data={data}
        layout={{
          xaxis: {
            showgrid: false,
            zeroline: false,
            showline: false,
            showticklabels: false,
          },
          yaxis: {
            showgrid: false,
            zeroline: false,
            showline: false,
            showticklabels: false,
          },
          plot_bgcolor: "rgba(0,0,0,0)",
          paper_bgcolor: "rgba(0,0,0,0)",
          autosize: true,
        }}
        useResizeHandler={true}
        style={{ width: "100%", height: "100%" }}
        config={{ displayModeBar: false, responsive: true }}
      />
    );
  }
}

export default LineGraph;
