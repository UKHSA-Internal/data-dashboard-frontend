import "./Sidebar.css"
function Sidebar() {
    return (
        <nav className="dashboard-menu">
            <script>document.body.className = ((document.body.className) ? document.body.className + ' js-enabled' : 'js-enabled');</script>
            <div className="moj-side-navigation govuk-!-padding-right-4 govuk-!-padding-top-2 dashboard-menu" role="navigation"
                aria-label="Website navigation" itemType="http://schema.org/SiteNavigationElement" itemScope="">
                <ul className="moj-side-navigation__list">
                    <li className="moj-side-navigation__item moj-side-navigation__item--active"><a
                        href="https://coronavirus.data.gov.uk/" aria-current="page"
                        className="govuk-link govuk-link--no-visited-state">Daily update</a></li>
                    <li className="moj-side-navigation__item"><a
                        href="https://coronavirus.data.gov.uk/details/testing?areaType=nation&amp;areaName=England"
                        className="govuk-link govuk-link--no-visited-state">Testing</a></li>
                    <li className="moj-side-navigation__item"><a
                        href="https://coronavirus.data.gov.uk/details/cases?areaType=nation&amp;areaName=England"
                        className="govuk-link govuk-link--no-visited-state">Cases</a></li>
                    <li className="moj-side-navigation__item"><a
                        href="https://coronavirus.data.gov.uk/details/healthcare?areaType=nation&amp;areaName=England"
                        className="govuk-link govuk-link--no-visited-state">Healthcare</a></li>
                    <li className="moj-side-navigation__item"><a
                        href="https://coronavirus.data.gov.uk/details/vaccinations?areaType=nation&amp;areaName=England"
                        className="govuk-link govuk-link--no-visited-state">Vaccinations</a></li>
                    <li className="moj-side-navigation__item"><a
                        href="https://coronavirus.data.gov.uk/details/deaths?areaType=nation&amp;areaName=England"
                        className="govuk-link govuk-link--no-visited-state">Deaths</a></li>
                </ul>
                <hr className="govuk-section-break govuk-section-break--m govuk-!-margin-top-3 govuk-!-margin-bottom-3 govuk-section-break--visible" />
            </div>
            <div className="tertiary-menu govuk-!-margin-left-3">
                <ul className="govuk-list govuk-!-font-size-14">
                    <li className="govuk-!-padding-bottom-1"><a
                        href="https://coronavirus.data.gov.uk/details/interactive-map"
                        className="govuk-link govuk-link--no-visited-state">Interactive maps</a></li>
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
