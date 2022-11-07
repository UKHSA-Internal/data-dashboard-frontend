import Plot from "react-plotly.js";
import React from "react";

class Graph extends React.Component {
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

                layout={{ width: 500, height: 440, title: "Graph Example" }}

            />);
    }
}

export default Graph;