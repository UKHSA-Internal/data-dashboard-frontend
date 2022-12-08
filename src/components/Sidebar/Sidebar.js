import './../../app.scss';

function Sidebar() {
    return (
            <nav className="dashboard-menu Sidebar">
            <div className="moj-side-navigation govuk-!-padding-right-4 govuk-!-padding-top-2 dashboard-menu" role="navigation"
                 aria-label="Website navigation" itemType="http://schema.org/SiteNavigationElement" itemScope="">
                <ul className="moj-side-navigation__list">
                    <li className="moj-side-navigation__item moj-side-navigation__item--active"><a
                        href="https://coronavirus.data.gov.uk/" aria-current="page"
                        className="govuk-link govuk-link--no-visited-state">Summary</a></li>
                </ul>
                <hr className="govuk-section-break govuk-section-break--m govuk-!-margin-top-3 govuk-!-margin-bottom-3 govuk-section-break--visible"/>
            </div>
            <div className="tertiary-menu govuk-!-margin-left-3">
                <ul className="govuk-list govuk-!-font-size-14">
                    <li className="govuk-!-padding-bottom-1"><a href="https://coronavirus.data.gov.uk/metrics/category"
                                                                className="govuk-link govuk-link--no-visited-state">Metrics
                        documentation</a></li>
                    <li className="govuk-!-padding-bottom-1"><a href="https://coronavirus.data.gov.uk/details/download"
                                                                className="govuk-link govuk-link--no-visited-state">Download
                        data</a></li>
                    <li className="govuk-!-padding-bottom-1"><a href="https://coronavirus.data.gov.uk/details/whats-new"
                                                                className="govuk-link govuk-link--no-visited-state">What's
                        new</a></li>
                    <li className="govuk-!-padding-bottom-1"><a
                        href="https://coronavirus.data.gov.uk/details/developers-guide"
                        className="govuk-link govuk-link--no-visited-state">Developer's guide</a></li>
                    <li className="govuk-!-padding-bottom-1"><a href="https://coronavirus.data.gov.uk/about"
                                                                className="govuk-link govuk-link--no-visited-state">About</a>
                    </li>
                </ul>
            </div>
            </nav>
    );
}

export default Sidebar;
