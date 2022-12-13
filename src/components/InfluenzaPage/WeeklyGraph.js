import Plotly from "plotly.js-cartesian-dist";
import React from "react";
import createPlotlyComponent from "react-plotly.js/factory";

const Plot = createPlotlyComponent(Plotly);

class WeeklyGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
    };
  }

  render() {
    // const { data } = this.state;

    var influenza_2019_2020 = this.getData("influenza_2019_2020");
    var influenza_2020_2021 = this.getData("influenza_2020_2021");
    var influenza_2021_2022 = this.getData("influenza_2021_2022");
    const influenzaData = [influenza_2019_2020, influenza_2020_2021, influenza_2021_2022];

    return (
      <Plot
        data={influenzaData}
        layout={{
          xaxis: {
            showgrid: false,
            zeroline: false,
            showline: true,
            showticklabels: true,
            type: "category"
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
          margin: {
            l: 0,
            r: 0,
            b: 30,
            t: 0,
            pad: 4
          },
        }}
        useResizeHandler={true}
        style={{ width: "100%", height: "100%" }}
        config={{ displayModeBar: false }}
      />
    );
  }

  getData(trend) {
    const { data } = this.state;

    return {
      x: data["week"],
      y: data[trend],
      mode: "lines",
      type: "scatter",
      name: trend
    };
  }
}

export default WeeklyGraph;
