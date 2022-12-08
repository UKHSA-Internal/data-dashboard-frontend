import Plot from "react-plotly.js";
import React from "react";

class Card extends React.Component {

render() {
    return (

        <li className="mini-card" itemType="https://schema.org/SpecialAnnouncement"
            itemProp="SpecialAnnouncement" itemScope="">
            <strong
                className="govuk-caption-m govuk-!-font-weight-regular"
                itemProp="name">Cases</strong><h4
            className="govuk-heading-m title-mobile govuk-!-margin-bottom-0">{this.props.title}</h4>
            <p className="grey govuk-!-font-size-14 govuk-!-margin-bottom-0 govuk-!-margin-top-0">
                <strong className="areatype-tag"><span
                    className="govuk-visually-hidden">Available at </span>nation<span
                    className="govuk-visually-hidden"> level.</span></strong><span
                className="card-timestamp">Up to and including 26 November 2022</span>
            </p>
            <div className="govuk-grid-row bottom-aligned">
                <ul className="govuk-grid-column-full">
                    <li className="data-metric2"><strong
                        className="govuk-body-s float govuk-!-margin-top-3 govuk-!-margin-bottom-0">Last
                        7 days</strong>
                        <div className="number-group">
                            <div className="number-container govuk-!-padding-right-4">
                                <div itemProp="Observation" itemType="https://schema.org/Observation" itemScope="">


                                </div>

                                <div className="float tooltip" itemProp="measuredValue">
                                    <div itemType="https://schema.org/Number" itemProp="Number"
                                         className="float govuk-heading-m govuk-!-margin-bottom-0 govuk-!-padding-top-0 total-figure2">
                                        <span className="govuk-link--no-visited-state number-link"
                                              itemProp="QuantitativeValue"
                                              itemType="https://schema.org/QuantitativeValue">{this.props.number}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li itemProp="Observation"
                        itemType="https://schema.org/Observation" itemScope="">
                        <div className="float tooltip">
                            <div className="float govuk-heading-m govuk-!-margin-bottom-0 govuk-!-padding-top-0 total-figure2">
                                <span className="govuk-link--no-visited-state number-link-red">
                                    <b className="govuk-tag number govuk-!-margin-top-1 change-box bad">
                                    <span className="govuk-!-font-weight-regular">
                                    <strong className="govuk-!-margin-right-1">698</strong>(3.6%)</span></b>
                                </span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <a href="https://coronavirus.data.gov.uk/details/cases?areaType=nation&amp;areaName=England"
               aria-hidden="true"
               className="govuk-link govuk-link--no-visited-state bottom-aligned">
                <figure className="graph mini-card-figure"><img
                    src="https://coronavirus.data.gov.uk/downloads/homepage/2022-12-01/thumbnail_newCasesBySpecimenDate.svg"
                    alt="Graph of 7-day rolling average of cases over the last 6 months - click for more details"
                    loading="lazy"/></figure>
            </a>
            <hr className="govuk-section-break govuk-section-break--visible bottom-aligned"/>
            <div className="additional-info bottom-aligned">
                <p className="govuk-!-margin-bottom-0 govuk-!-margin-top-0 govuk-!-font-size-16">

                    <a className="govuk-link govuk-link--no-visited-state"
                       href="/details/cases?areaType=nation&amp;areaName=England"><strong>All
                        cases data in England</strong></a>
                </p>
            </div>
        </li>
    );}}

export default Card;