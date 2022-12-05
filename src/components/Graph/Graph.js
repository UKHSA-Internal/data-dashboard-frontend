import Plot from "react-plotly.js";
import React from "react";
class Graph extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            items: []
        };
    }

    componentDidMount() {
        fetch("/testdata/")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        items: result
                    })
                },
                (error) => {
                    //TODO: handle ajax error gracefully
                    console.log(error.toString());
                }
            );
    }



    render() {
        const { items } = this.state;
        items.forEach(element => {
            element.mode = 'line';
        });
        return (
            <Plot data={items} layout={{ width: 800, height: 600, title: "Winter Pressures" }} />
        );
    }
}

export default Graph;