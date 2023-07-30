import Link from 'next/link'
import { ReactElement } from 'react'

import { Layout } from '@/components/Layout'

const FeedbackConfirmation = () => {
  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <div className="govuk-panel govuk-panel--confirmation govuk-!-margin-bottom-6">
          <h1 className="govuk-panel__title">Form submitted</h1>
          <div className="govuk-panel__body">Thank you for your feedback</div>
        </div>
        <p>
          Thank you for taking the time to give feedback on the UKHSA data dashboard. We&apos;ll use your feedback to
          help us continually improve our services.
        </p>
        <p>
          We&apos;re constantly looking to improve our users&apos; experience of the dashboard. If you&apos;d like to
          share your thoughts further, please get in touch with our user research team at{' '}
          <a className="govuk-link--no-visited-state" href="mailto:researchteam.dpd@ukhsa.gov.uk">
            researchteam.dpd@ukhsa.gov.uk
          </a>
        </p>
        <Link href="/" className="govuk-link--no-visited-state govuk-!-margin-top-2 govuk-body inline-block">
          Return to home page
        </Link>
      </div>
    </div>
  )
}

export default FeedbackConfirmation

FeedbackConfirmation.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
