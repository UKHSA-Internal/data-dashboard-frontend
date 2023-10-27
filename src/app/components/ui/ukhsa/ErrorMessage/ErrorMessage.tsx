'use client'

import Link from 'next/link'

export default function Error() {
  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds-from-desktop">
        <h1 className="govuk-heading-xl mb-4">Sorry, there is a problem with the service</h1>
        <p>Please try again later.</p>
        <p>
          If you need to get in touch with UK Health Security Agency, you can find contact information at the bottom of
          the{` `}
          <a
            className="govuk-link--no-visited-state"
            href="https://www.gov.uk/government/organisations/uk-health-security-agency"
          >
            UKHSA webpage
          </a>
        </p>
        <Link href="/" className="govuk-link--no-visited-state govuk-!-margin-top-2 govuk-body inline-block">
          Return to home page
        </Link>
      </div>
    </div>
  )
}
