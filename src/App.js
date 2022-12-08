import { Footer, PhaseBanner, TopNav } from 'govuk-react';
import './App.css';
import Graph from './components/Graph/Graph';
import Card from './components/Card/Card';
import LineGraph from './components/LineGraph/LineGraph';
import Sidebar from './components/Sidebar/Sidebar';
import * as PropTypes from "prop-types";

function Crown(props) {
    return null;
}

Crown.propTypes = {
    height: PropTypes.string,
    width: PropTypes.string
};

function App() {
    return (
        <div className="App">
            <script>document.body.className = ((document.body.className) ? document.body.className + ' js-enabled' :
                'js-enabled');
            </script>
            <TopNav
                company={<TopNav.Anchor href="https://example.com" target="new"><TopNav.IconTitle
                    icon={<Crown height="32" width="36"/>}>GOV.UK</TopNav.IconTitle></TopNav.Anchor>}
                serviceTitle={<TopNav.NavLink href="https://example.com" target="new">Winter Pressures
                    Dashboard</TopNav.NavLink>}
            />
            <PhaseBanner level="beta">
                This part of GOV.UK is being rebuilt – Winter Pressures Dashboard under development{' '}
            </PhaseBanner>
            <div class="govuk-main-wrapper">
            <div class="dashboard-container">
            <Sidebar/>
            <main className="main" id="main-content">
                <div>
                    <div className="govuk-grid-row">
                        <div className="govuk-grid-column-full"><h1
                            className="govuk-heading-l govuk-!-margin-bottom-2 govuk-!-margin-top-2"
                            data-nosnippet="true">England Summary</h1><p
                            className="govuk-body-m govuk-!-margin-bottom-1 govuk-!-margin-top-3">The official UK
                            government website for data and insights on winter illnesses.</p></div>
                    </div>
                </div>
                <div><p className="govuk-body-m govuk-!-margin-bottom-3 govuk-!-margin-top-2">See the <a
                    className="govuk-link govuk-link--no-visited-state" href="/easy_read">simple summary</a> for
                    England.</p></div>

                <article>
                    <ul className="govuk-list card-container">
                        <Card title="Influenza A in England" data-source="influenza_a"/>
                        <Card title="Adenovirus in England" data-source="adenovirus"/>
                        <Card title="Parainfluenza in England" data-source="parainfluenza"/>
                        <Card title="Streptococcus A in England" data-source="strep_a"/>
                    </ul>
                </article>
            </main>
            </div>
            </div>
            <Footer/>
        </div>
    );
}

export default App;
