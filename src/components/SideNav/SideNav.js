const SideNave = () => {
    return (
        <nav className="dashboard-menu">
            <script>document.body.className = ((document.body.className) ? document.body.className + ' js-enabled' : 'js-enabled');</script>
            <div className="moj-side-navigation govuk-!-padding-right-4 govuk-!-padding-top-2 dashboard-menu" role="navigation"
                aria-label="Website navigation" itemType="http://schema.org/SiteNavigationElement" itemScope="">
                <ul className="moj-side-navigation__list">
                    <li className="moj-side-navigation__item moj-side-navigation__item--active"><a
                        href="http://#" aria-current="page"
                        className="govuk-link govuk-link--no-visited-state">Summary</a>
                    </li>
                </ul>
                <hr className="govuk-section-break govuk-section-break--m govuk-!-margin-top-3 govuk-!-margin-bottom-3 govuk-section-break--visible" />
            </div>
            <div className="tertiary-menu govuk-!-margin-left-3">
                <ul className="govuk-list govuk-!-font-size-14">
                    <li className="govuk-!-padding-bottom-1"><a href="http://#"
                        className="govuk-link govuk-link--no-visited-state">Metrics
                        documentation</a></li>
                    <li className="govuk-!-padding-bottom-1"><a href="http://#"
                        className="govuk-link govuk-link--no-visited-state">Download
                        data</a></li>
                    <li className="govuk-!-padding-bottom-1"><a href="http://#"
                        className="govuk-link govuk-link--no-visited-state">What's
                        new</a></li>
                    <li className="govuk-!-padding-bottom-1"><a
                        href="http://#"
                        className="govuk-link govuk-link--no-visited-state">Developer's guide</a></li>
                    <li className="govuk-!-padding-bottom-1"><a href="http://#"
                        className="govuk-link govuk-link--no-visited-state">About</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default SideNave;