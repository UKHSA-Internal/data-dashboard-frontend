import './Content.css'
import MiniCard from './MiniCard';
import VaccCard from './VaccCard';
function Content() {
    return (
        <main className="main">
            <div className='main-inner'>
                <div className='govuk-grid-row'>
                    <div className='govuk-grid-column-full'>
                        <h1 className="govuk-heading-l govuk-!-margin-bottom-2 govuk-!-margin-top-2" data-nosnippet="true">England Summary</h1>
                        <p className="govuk-body-m govuk-!-margin-bottom-1 govuk-!-margin-top-3">The official UK government website for data and insights on coronavirus (COVID-19).</p>
                    </div>
                </div>
                <div><p className="govuk-body-m govuk-!-margin-bottom-3 govuk-!-margin-top-2">See the <a className="govuk-link govuk-link--no-visited-state" href="/easy_read">simple summary</a> for England.</p></div>

                <article>
                    <ul className='govuk-list card-container'>
                        <VaccCard />
                        <MiniCard name='Cases' title='People tested positive in England'
                            dataUpto='24 September 2022' count='40,650' trendNumber='12,106' trendPercent='42.4' trendRAG="bad" trendArrow="up-red"
                            graphURL='https://coronavirus.data.gov.uk/downloads/homepage/2022-09-29/thumbnail_newCasesBySpecimenDate.svg' />
                        <MiniCard name='Deaths' title='Deaths within 28 days of positive test in England'
                            dataUpto='24 September 2022' count='390' trendNumber='-8' trendPercent='-2.3' trendRAG="good" trendArrow="down-green"
                            graphURL='https://coronavirus.data.gov.uk/downloads/homepage/2022-09-29/thumbnail_newDeaths28DaysByDeathDate.svg' />
                        <MiniCard name='Healthcare' title='Patients admitted in England'
                            dataUpto='26 September 2022' count='5,050' trendNumber='1,915' trendPercent='47.7' trendRAG="bad"
                            graphURL='https://coronavirus.data.gov.uk/downloads/homepage/2022-09-29/thumbnail_newAdmissions.svg' />
                        <MiniCard name='Testing' title='Virus tests conducted in England'
                            dataUpto='27 September 2022' count='437,650' trendNumber='47,396' trendPercent='12.1' trendRAG="neutral"
                            graphURL='https://coronavirus.data.gov.uk/downloads/homepage/2022-09-29/thumbnail_newVirusTestsByPublishDate.svg' />
                    </ul>
                </article>
            </div>
        </main>
    );
};
export default Content;