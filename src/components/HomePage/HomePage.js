import MiniCard from "./MiniCars";

const HomePage = () => {
    return (<>
        <div className='govuk-grid-row'>
            <div className='govuk-grid-column-full'>
                <h1 className="govuk-heading-l govuk-!-margin-bottom-2 govuk-!-margin-top-2" data-nosnippet="true">England Summary</h1>
                <p className="govuk-body-m govuk-!-margin-bottom-1 govuk-!-margin-top-3">
                    The official UK government website for data and insights on winter illnesses.
                </p>
            </div>
        </div>
        <div><p className="govuk-body-m govuk-!-margin-bottom-3 govuk-!-margin-top-2">See the <a className="govuk-link govuk-link--no-visited-state" href="/easy_read">simple summary</a> for England.</p></div>

        <article>
            <ul className='govuk-list card-container'>
                {/* <MiniCard></MiniCard> */}
            </ul>
        </article>
    </>
    );
}
export default HomePage;