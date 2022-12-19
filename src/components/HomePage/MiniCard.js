import React from "react";
import LineGraph from "./LineGraph";
import "./MiniCard.css";

class MiniCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
    };
  }
  render() {
    const { data } = this.state;
    return (
      <li
        className="mini-card"
        itemType="https://schema.org/SpecialAnnouncement"
        itemProp="SpecialAnnouncement"
        itemScope=""
      >
        <h4 className="govuk-heading-m title-mobile govuk-!-margin-bottom-0">
          {data.name}
        </h4>
        <p className="grey govuk-!-font-size-14 govuk-!-margin-bottom-0 govuk-!-margin-top-0">
          Proportion of positive samples
        </p>
        <p className="grey govuk-!-font-size-14 govuk-!-margin-bottom-0 govuk-!-margin-top-0">
          <strong className="areatype-tag">
            <span className="govuk-visually-hidden">Available at </span>nation
            <span className="govuk-visually-hidden"> level.</span>
          </strong>
          <span className="card-timestamp">
            Up to and including 26 November 2022
          </span>
        </p>
        <div className="govuk-grid-row bottom-aligned">
          <div className="govuk-grid-column-full">
            <LineGraph data={[data]}></LineGraph>
          </div>
        </div>
      </li>
    );
  }
}

export default MiniCard;
