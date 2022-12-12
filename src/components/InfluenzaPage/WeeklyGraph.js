import Plotly from "plotly.js-cartesian-dist";
import React from "react";
import createPlotlyComponent from "react-plotly.js/factory";

const Plot = createPlotlyComponent(Plotly);

class WeeklyGraph extends React.Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       data: this.props.data,
  //     };
  //   }
  render() {
    return (
      <Plot
        data={[
          {
            x: [1, 2, 3],

            y: [2, 6, 3],

            type: "scatter",

            mode: "lines+markers",

            marker: { color: "red" },
          },

          { type: "bar", x: [1, 2, 3], y: [2, 5, 3] },
        ]}
        layout={{
          xaxis: {
            showgrid: false,
            zeroline: false,
            showline: false,
            showticklabels: false,
          },
          yaxis: {
            showgrid: true,
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
        config={{ displayModeBar: false }}
      ></Plot>
    );
  }
}

export default WeeklyGraph;
