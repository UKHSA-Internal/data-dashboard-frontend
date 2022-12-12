import React from "react";
import WeeklyGraph from "./WeeklyGraph";
import "./InfluenzaPage.css";

class InfluenzaPage extends React.Component {
  render() {
    const testdata = [];
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
              <WeeklyGraph></WeeklyGraph>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default InfluenzaPage;
