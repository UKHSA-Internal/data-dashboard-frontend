const MiniCard = (props) => {
    return (
        <li className='mini-card'>
            <strong className="govuk-caption-m govuk-!-font-weight-regular" itemprop="name">{props.name}</strong>
            <h4 className="govuk-heading-m title-mobile govuk-!-margin-bottom-0">{props.title}</h4>
            <p className="grey govuk-!-font-size-14 govuk-!-margin-bottom-0 govuk-!-margin-top-0">
                <strong className="areatype-tag"><span className="govuk-visually-hidden">Available at </span>nation<span className="govuk-visually-hidden"> level.</span></strong>
                <span className="card-timestamp">Up to and including <time style={{ whiteSpace: "nowrap" }} datetime="2022-09-24T00:00:00.00Z">{props.dataUpto}</time></span>
            </p>
            <div className='govuk-grid-row bottom-aligned'>
                <ul className='govuk-grid-column-full'>
                    <li className='data-metric2'>
                        <strong className='govuk-body-s float govuk-!-margin-top-3 govuk-!-margin-bottom-0'>Last 7 days</strong>
                        <div className='number-group'>
                            <div className='number-container govuk-!-padding-right-4'>
                                <div className="float tooltip" itemprop="measuredValue">
                                    <div itemtype="https://schema.org/Number" itemprop="Number" className="float govuk-heading-m govuk-!-margin-bottom-0 govuk-!-padding-top-0 total-figure2">
                                        <span className="govuk-link--no-visited-state number-link" itemprop="QuantitativeValue" itemtype="https://schema.org/QuantitativeValue">{props.count}</span><span className="tooltiptext govuk-!-font-size-16" itemprop="disambiguatingDescription"></span></div></div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="float tooltip" style={{ marginLeft: "20px" }}>
                            <div className="float govuk-heading-m govuk-!-margin-bottom-0 govuk-!-padding-top-0 total-figure2">
                                <span className="govuk-link--no-visited-state number-link-red">
                                    <b className={`govuk-tag number govuk-!-margin-top-1 change-box ${props.trendRAG}`}>
                                        <img src="" alt="Direction arrow" width="12px" aria-hidden="true" className="govuk-!-margin-right-1" />
                                        <span className="govuk-!-font-weight-regular"><span className="govuk-visually-hidden">There has been </span><span className="govuk-visually-hidden">an increase of </span><strong className="govuk-!-margin-right-1">{props.trendNumber}</strong>({props.trendPercent}%)<span className="govuk-visually-hidden"> compared to the previous 7 days.</span></span>
                                    </b>
                                </span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <a href='https://coronavirus.data.gov.uk/details/cases?areaType=nation&amp;areaName=England' className='govuk-link govuk-link--no-visited-state bottom-aligned'>
                <figure className='graph mini-card-figure'>
                    <img src={props.graphURL} />
                </figure>
            </a>
            <hr className="govuk-section-break govuk-section-break--visible bottom-aligned"></hr>
            <div className="additional-info bottom-aligned">
                <p className="govuk-!-margin-bottom-0 govuk-!-margin-top-0 govuk-!-font-size-16">
                    <a className="govuk-link govuk-link--no-visited-state" href="/details/cases?areaType=nation&amp;areaName=England">
                        <strong>All cases data  in  England</strong>
                    </a>
                </p>
            </div>
            <h2>{props.hi}</h2>
        </li>
    );
}

export default MiniCard;