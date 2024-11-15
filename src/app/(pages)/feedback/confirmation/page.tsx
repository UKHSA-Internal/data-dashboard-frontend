import { Metadata } from 'next'
import Link from 'next/link'

import { PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { RichText } from '@/app/components/cms'
import { View } from '@/app/components/ui/ukhsa'
import { flags } from '@/app/constants/flags.constants'
import { getFeatureFlag } from '@/app/utils/flags.utils'

export const metadata: Metadata = {
  title: 'Feedback Confirmation | UKHSA data dashboard',
}

export default async function FeedbackConfirmation() {
  const {
    confirmation_panel_title: panelTitle,
    confirmation_panel_text: panelText,
    confirmation_body: body,
  } = await getPageBySlug<PageType.Feedback>('feedback')

  const { enabled } = await getFeatureFlag(flags.feedbackForm)

  return (
    <View>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <div className="govuk-panel govuk-panel--confirmation govuk-!-margin-bottom-6">
            <h1 className="govuk-panel__title">{enabled ? panelTitle : 'Form submitted'}</h1>
            <div className="govuk-panel__body">{enabled ? panelText : 'Thank you for your feedback'}</div>
          </div>
          {enabled ? (
            <RichText>{body}</RichText>
          ) : (
            <>
              <p>
                Thank you for giving feedback on the UKHSA data dashboard. We will use your comments to help us
                continually improve the service. We will not be able to get in touch with you about your comments.
              </p>
              <p data-block-key="2ao03">
                The feedback form is intended for feedback on your experience using the dashboard. If you need to get in
                touch with UK Health Security Agency, you can find contact information at the bottom of the{' '}
                <a href="https://www.gov.uk/government/organisations/uk-health-security-agency">UKHSA webpage</a>
              </p>
            </>
          )}

          <Link href="/" className="govuk-link--no-visited-state govuk-!-margin-top-2 govuk-body inline-block">
            Return to home page
          </Link>
        </div>
      </div>
    </View>
  )
}
