import Plot from 'react-plotly.js';
import React, {Component} from 'react';

class LineGraph extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        const endpoint = "http://localhost:8000/items";
        fetch(endpoint)
            .then(response => response.json())
            .then(data => {
                this.setState({data: data})
            })
    };

    render() {
        return(
            <Plot
                data={[
                    {
                        x: [1,2,3,4,5,6,7,8,9,10,11],
                        y: this.state.data["adenovirus"],
                        type: 'scatter',
                        mode: 'lines',
                        marker: {color: '#ed022d'}
                    },
                    {
                        x: [1,2,3,4,5,6,7,8,9,10,11],
                        y: this.state.data["rhinovirus"],
                        type: 'scatter',
                        mode: 'lines',
                        marker: {color: '#ed022d'}
                    }
                ]}
                layout={{width: 640, height: 480,
                    font: {
                        family: "GDS Transport",
                        size: 14,
                        color: "#0b0c0c"
                    }}}
            />)
    }

}

export default LineGraph

