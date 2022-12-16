import React from "react";
import WeeklyGraph from "./WeeklyGraph";
import "./InfluenzaPage.css";

class InfluenzaPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      dataLoaded: false,
    };
  }
  componentDidMount() {
    // fetch("http://wp-lb-api-1448457284.eu-west-2.elb.amazonaws.com/testdata/")
    fetch("http://localhost:5100/influenza/")
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

    const d1 = this.getData("influenza_2019_2020");
    const d2 = this.getData("influenza_2020_2021");
    const d3 = this.getData("influenza_2021_2022");

    return (
      <>
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-full">
            <h1
              className="govuk-heading-l govuk-!-margin-bottom-2 govuk-!-margin-top-2"
              data-nosnippet="true"
            >
              Influenza
            </h1>
            <p className="govuk-body-m govuk-!-margin-bottom-1 govuk-!-margin-top-3">
              Weekly surveillance of Influenza in England.
            </p>
          </div>
        </div>
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-full">
            <div className="graph-holder">
              <p>Weekly positivity (%) for Influenza in England</p>
              <WeeklyGraph data={[d1, d2, d3]} />
            </div>
          </div>
        </div>
      </>
    );
  }

  getData(virusName) {
    const { items } = this.state;
    return {
      x: items["week"],
      y: items[virusName],
      mode: "lines",
      type: "scatter",
      line: { width: 3 },
      name: virusName
    };
  }
}

export default InfluenzaPage;
