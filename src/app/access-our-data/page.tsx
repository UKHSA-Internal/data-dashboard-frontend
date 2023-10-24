import Link from 'next/link'

import { View } from '../components/ui/ukhsa'

export default function AccessOurData() {
  return (
    <View heading="Access our data">
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-third-from-desktop govuk-!-padding-4 govuk-!-margin-4 bg-grey-3">
          <h2 className="govuk-heading-s">Documentation & bulk download</h2>
          <p className="govuk-body-s">Access and download our data without development experience</p>
          <Link href="/developers-guide" className="govuk-button govuk-button--start govuk-!-margin-bottom-1">
            Start now
            <svg
              className="govuk-button__start-icon"
              width="17.5"
              height="19"
              viewBox="0 0 33 40"
              aria-hidden="true"
              focusable="false"
            >
              <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z" />
            </svg>
          </Link>
        </div>
        <div className="govuk-grid-column-one-third-from-desktop govuk-!-padding-4 govuk-!-margin-4 bg-grey-3">
          <h2 className="govuk-heading-s">Developers Guide (API)</h2>
          <p className="govuk-body-s">
            View our API documentation, swagger schema or contribute to our open-source project
          </p>
          <Link href="/developers-guide" className="govuk-button govuk-button--start govuk-!-margin-bottom-1">
            Start now
            <svg
              className="govuk-button__start-icon"
              width="17.5"
              height="19"
              viewBox="0 0 33 40"
              aria-hidden="true"
              focusable="false"
            >
              <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z" />
            </svg>
          </Link>
        </div>
      </div>
    </View>
  )
}
