import { Metadata } from 'next'

import { BrowseCard } from '../components/ui/ukhsa/BrowseCard/BrowseCard'

export const metadata: Metadata = {
  title: 'Browse | UKHSA data dashboard',
}

export default function Browse() {
  return (
    <nav aria-label="Menu" className="govuk-!-margin-bottom-6">
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-third-from-desktop">
          <BrowseCard
            href="/"
            name="Dashboard"
            description="The UKHSA data dashboard is for anyone interested in UK health data. Currently, the dashboard reports data for respiratory viruses."
          />
        </div>
        <div className="govuk-grid-column-one-third-from-desktop">
          <BrowseCard
            href="/topics/coronavirus"
            name="COVID-19"
            description="The UKHSA data dashboard is for anyone interested in UK health data. Currently, the dashboard reports data for respiratory viruses."
          />
        </div>
        <div className="govuk-grid-column-one-third-from-desktop">
          <BrowseCard
            href="/topics/influenza"
            name="Influenza"
            description="The UKHSA data dashboard is for anyone interested in UK health data. Currently, the dashboard reports data for respiratory viruses."
          />
        </div>
      </div>

      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-third-from-desktop">
          <BrowseCard
            href="/topics/other-respiratory-viruses"
            name="Other respiratory viruses"
            description="The UKHSA data dashboard is for anyone interested in UK health data. Currently, the dashboard reports data for respiratory viruses."
          />
        </div>
        <div className="govuk-grid-column-one-third-from-desktop">
          <BrowseCard
            href={process.env.NEXT_PUBLIC_PUBLIC_API_URL}
            name="API"
            description="Search and download data by using the UKHSA data dashboard’s API."
          />
        </div>
        <div className="govuk-grid-column-one-third-from-desktop">
          <BrowseCard
            href="/about"
            name="About"
            description="The UKHSA data dashboard presents public health data in the UK. It’s produced by the UK Health Security Agency."
          />
        </div>
      </div>

      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-third-from-desktop">
          <BrowseCard
            href="/whats-new"
            name="What's new"
            description="The UKHSA data dashboard is regularly updated with new data and features. View a timeline of changes."
          />
        </div>
      </div>
    </nav>
  )
}
