import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./app.scss";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SideNav from "./components/SideNav";
import HomePage from "./components/HomePage/HomePage.js";
import InfluenzaPage from "./components/InfluenzaPage";
function App() {
  return (
    <>
      <Header />
      <div className="govuk-width-container">
        <div className="govuk-main-wrapper">
          <div className="govuk-phase-banner">
            <p className="govuk-phase-banner__content">
              <strong className="govuk-tag govuk-phase-banner__content__tag">
                alpha
              </strong>
              <span className="govuk-phase-banner__text">
            This is a new service – your <a className="govuk-link" href="#">feedback</a> will help us to improve it.
          </span>
            </p>
          </div>
          <div className="dashboard-container">
            <main className="main">
              <ul className="app-navigation__list app-width-container winter-pressure-menu-list flex">
                <li className="app-navigation__list-item winter-pressure-menu-link">
                  <a href="dashboards/dashboard-v3/national-insight.html"
                     className="govuk-link govuk-link--no-visited-state govuk-link--no-underline app-navigation__link js-app-navigation__link govuk-heading-s">National
                    Insight</a>
                </li>
                <li className="app-navigation__list-item winter-pressure-menu-link">
                  <a href="dashboards/dashboard-v3/prevalence-cases-positivity.html"
                     className="govuk-link govuk-link--no-visited-state govuk-link--no-underline app-navigation__link js-app-navigation__link govuk-heading-s">Prevelance
                    Cases Positivity</a>
                </li>
                <li className="app-navigation__list-item winter-pressure-menu-link">
                  <a href="dashboards/dashboard-v3/current-healthcare-situation.html"
                     className="govuk-link govuk-link--no-visited-state govuk-link--no-underline app-navigation__link js-app-navigation__link govuk-heading-s">Current
                    Healthcare Situation</a>
                </li>
                <li className="app-navigation__list-item winter-pressure-menu-link">
                  <a href="dashboards/dashboard-v3/vaccination-uptake.html"
                     className="govuk-link govuk-link--no-visited-state govuk-link--no-underline app-navigation__link js-app-navigation__link govuk-heading-s">Vaccination
                    Uptake</a>
                </li>
                <li className="app-navigation__list-item winter-pressure-menu-link">
                  <a href="dashboards/dashboard-v3/mortality.html"
                     className="govuk-link govuk-link--no-visited-state govuk-link--no-underline app-navigation__link js-app-navigation__link govuk-heading-s">Mortality</a>
                </li>
              </ul>

              <div class="govuk-grid-column-three-quarters">
              <div className="main-inner">
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<HomePage />}></Route>
                    <Route path="influenza" element={<InfluenzaPage />}></Route>
                  </Routes>
                </BrowserRouter>
              </div>
              </div>

              <div class="govuk-grid-column-one-quarter">
              <h2 className="govuk-heading-l">Related Links</h2>
              <ul className="govuk-list">
                <li className="govuk-!-padding-bottom-1">
                  <a href="https://www.gov.uk/government/statistics/national-flu-and-covid-19-surveillance-reports-2022-to-2023-season"
                     className="govuk-link govuk-link--no-visited-state govuk-!-font-weight-bold">National flu and
                    COVID-19 surveillance reports: 2022 to 2023
                    season</a>
                  <p className="govuk-body">
                    National influenza and COVID-19 report, monitoring COVID-19
                    activity, seasonal flu and other seasonal respiratory illnesses.
                  </p>
                </li>
                <li className="govuk-!-padding-bottom-1">
                  <a href="https://www.gov.uk/government/collections/respiratory-syncytial-virus-rsv-guidance-data-and-analysis"
                     className="govuk-link govuk-link--no-visited-state govuk-!-font-weight-bold">Respiratory syncytial
                    virus (RSV): guidance, data and
                    analysis</a>
                  <p>
                    These documents provide advice on the symptoms, diagnosis,
                    treatment, management and epidemiology of respiratory syncytial
                    virus.
                  </p>
                </li>
                <li className="govuk-!-padding-bottom-1">
                  <a href="https://www.gov.uk/government/statistics/national-norovirus-and-rotavirus-surveillance-reports-2022-to-2023-season/national-norovirus-and-rotavirus-report-week-1-report-data-up-to-week-51-25-december-2022"
                     className="govuk-link govuk-link--no-visited-state govuk-!-font-weight-bold">National norovirus and
                    rotavirus report, week 1 report: data up
                    to week 51 (25 December 2022)</a>
                  <p>
                    Data reported here provide a summary of norovirus
                    and rotavirus activity (including enteric virus (EV) outbreaks)
                    in England up to reporting week 51 of the 2022/2023 season.
                  </p>
                </li>
                <li className="govuk-!-padding-bottom-1">
                  <a href="https://www.gov.uk/government/news/hepatitis-liver-inflammation-cases-in-children-latest-updates"
                     className="govuk-link govuk-link--no-visited-state govuk-!-font-weight-bold">Hepatitis (liver
                    inflammation) cases in children – latest
                    updatess</a>
                  <p>
                    Regular UKHSA updates on the ongoing investigation into higher
                    than usual rates of liver inflammation (hepatitis) in children
                    across the UK.
                  </p>
                </li>
                <li className="govuk-!-padding-bottom-1">
                  <a href="https://www.gov.uk/government/collections/human-parainfluenza-viruses-guidance-and-data"
                     className="govuk-link govuk-link--no-visited-state govuk-!-font-weight-bold">Human parainfluenza
                    viruses: guidance and data</a>
                  <p>
                    The symptoms, diagnosis, management and epidemiology of human
                    parainfluenza viruses (HPIVs).
                  </p>
                </li>
              </ul>
              </div>

            </main>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
