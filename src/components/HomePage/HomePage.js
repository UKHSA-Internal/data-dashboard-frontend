import React from "react";
import MiniCard from "./MiniCard";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      dataLoaded: false,
    };
  }

  componentDidMount() {
    const API = process.env.REACT_APP_API
    fetch(API + "items/")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            items: result,
            dataLoaded: true,
          });
        },
        (error) => {
          //TODO: handle ajax error gracefully
          console.log(error.toString());
        }
      );
  }

  render() {
    if (!this.state.dataLoaded) {
      return null;
    }

    return (
      <>
        <div className="govuk-grid-column">
          <div className="govuk-grid-row">
            <h1 className="govuk-heading-xl">Winter Pressures in England</h1>
            <p className="govuk-body">
              Weekly surveillance of Influenza, COVID-19 and other respiratory
              viruses in England showing the proportion of positive samples. Last updated on Thursday 5 January 2023 at
              6:10pm
            </p>
          </div>
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-one-half">
              <MiniCard data={this.getData("COVID-19")} />
            </div>
            <div className="govuk-grid-column-one-half">
              <MiniCard data={this.getData("Influenza")} />
            </div>
            <div className="govuk-grid-column-one-half">
              <MiniCard data={this.getData("Parainfluenza")} />
            </div>
            <div className="govuk-grid-column-one-half">
              <MiniCard data={this.getData("Rhinovirus")} />
            </div>
            <div className="govuk-grid-column-one-half">
              <MiniCard data={this.getData("RSV")} />
            </div>
            <div className="govuk-grid-column-one-half">
              <MiniCard data={this.getData("Adenovirus")} />
            </div>
            <div className="govuk-grid-column-one-half">
              <MiniCard data={this.getData("Acute Respiratory Infections")} />
            </div>
          </div>
        </div>
      </>
    );
  }


  getData(virusName) {
    const { items } = this.state;
    return {
      x: items["dates"],
      y: items[virusName],
      mode: "lines",
      type: "scatter",
      line: { color: "rgb(0, 0, 0)", width: 1 },
      fill: 'tozeroy',
      fillcolor: "rgb(220, 220, 220)",
      name: virusName
    };
  }
}
export default HomePage;
