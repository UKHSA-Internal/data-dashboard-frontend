'use client'

export default function Error() {
  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds-from-desktop">
        <h1 className="govuk-heading-xl mb-4">Sorry, there is a problem with the service</h1>
        <p>Try again later.</p>
        <p>
          <a href="https://www.gov.uk/government/collections/contacts-public-health-england-regions-local-centres-and-emergency">
            Contact the UK Health Security Agency (UKHSA)
          </a>
          <span>if you need to speak to someone.</span>
        </p>
      </div>
    </div>
  )
}
