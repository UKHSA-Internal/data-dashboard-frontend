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
        <div>
        <h4 className="govuk-heading-m title-mobile govuk-!-margin-bottom-0">
          {data.name}
        </h4>
        <p className="grey govuk-!-font-size-14 govuk-!-margin-bottom-0 govuk-!-margin-top-0">
          <strong className="govuk-tag tag-padding-top">nation</strong>
        </p>
        <div className="govuk-grid-row bottom-aligned">
          <div className="govuk-grid-column-full">
            <LineGraph data={[data]}></LineGraph>
          </div>
        </div>
        <div>
          <details className="govuk-details" data-module="govuk-details">
            <summary className="govuk-details__summary">
                <span className="govuk-details__summary-text">
                  View data in a tabular format
                </span>
            </summary>
            <div className="govuk-details__text">
              <table className="govuk-table">
                <caption className="govuk-table__caption govuk-table__caption--m">
                  Monthly {data.name} cases
                </caption>
                <thead className="govuk-table__head">
                <tr className="govuk-table__row">
                  <th scope="col" className="govuk-table__header">Month</th>
                  <th scope="col" className="govuk-table__header">Amount</th>
                </tr>
                </thead>
                <tbody className="govuk-table__body">
                <tr className="govuk-table__row">
                  <th scope="row" className="govuk-table__header">January</th>
                  <td className="govuk-table__cell">43</td>
                </tr>
                <tr className="govuk-table__row">
                  <th scope="row" className="govuk-table__header">February</th>
                  <td className="govuk-table__cell">59</td>
                </tr>
                <tr className="govuk-table__row">
                  <th scope="row" className="govuk-table__header">March</th>
                  <td className="govuk-table__cell">25</td>
                </tr>
                <tr className="govuk-table__row">
                  <th scope="row" className="govuk-table__header">April</th>
                  <td className="govuk-table__cell">72</td>
                </tr>
                <tr className="govuk-table__row">
                  <th scope="row" className="govuk-table__header">May</th>
                  <td className="govuk-table__cell">21</td>
                </tr>
                <tr className="govuk-table__row">
                  <th scope="row" className="govuk-table__header">June</th>
                  <td className="govuk-table__cell">34</td>
                </tr>
                <tr className="govuk-table__row">
                  <th scope="row" className="govuk-table__header">July</th>
                  <td className="govuk-table__cell">87</td>
                </tr>
                <tr className="govuk-table__row">
                  <th scope="row" className="govuk-table__header">August</th>
                  <td className="govuk-table__cell">43</td>
                </tr>
                <tr className="govuk-table__row">
                  <th scope="row" className="govuk-table__header">September</th>
                  <td className="govuk-table__cell">23</td>
                </tr>
                <tr className="govuk-table__row">
                  <th scope="row" className="govuk-table__header">October</th>
                  <td className="govuk-table__cell">31</td>
                </tr>
                <tr className="govuk-table__row">
                  <th scope="row" className="govuk-table__header">November</th>
                  <td className="govuk-table__cell">54</td>
                </tr>
                <tr className="govuk-table__row">
                  <th scope="row" className="govuk-table__header">December</th>
                  <td className="govuk-table__cell">66</td>
                </tr>
                </tbody>
              </table>
              <a className="govuk-link">Download this data</a>
            </div>
          </details>
        </div>
      </div>
    );
  }
}

export default MiniCard;
