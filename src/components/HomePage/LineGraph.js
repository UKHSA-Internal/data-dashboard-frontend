import Plotly from "plotly.js-cartesian-dist";
import React from "react";
import createPlotlyComponent from "react-plotly.js/factory";
import "./LineGraph.css";

const Plot = createPlotlyComponent(Plotly);

class LineGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    fetch("http://wp-lb-api-311373237.eu-west-2.elb.amazonaws.com/testdata/")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            items: result,
          });
        },
        (error) => {
          //TODO: handle ajax error gracefully
          console.log(error.toString());
        }
      );
  }

  render() {
    const { items } = this.state;
    items.forEach((element) => {
      element.mode = "line";
    });

    var sampleData = {
      x: [1, 2, 3, 4],
      y: [16, 5, 11, 9],
      mode: "lines",
      type: "scatter",
      line: { color: "rgb(0, 0, 0)", width: 2 },
    };
    return (
      <Plot
        data={[sampleData]}
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
        config={{ displayModeBar: false }}
      />
    );
  }
}

export default LineGraph;
