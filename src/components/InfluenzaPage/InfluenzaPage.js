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

    const { items } = this.state;

    console.log(items);

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
              <WeeklyGraph data={items}></WeeklyGraph>
            </div>
          </div>
        </div>
      </>
    );
  }


}

export default InfluenzaPage;
