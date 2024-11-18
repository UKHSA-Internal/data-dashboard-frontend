import { Metadata } from 'next'
import Link from 'next/link'

import { PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { RichText } from '@/app/components/cms'
import { View } from '@/app/components/ui/ukhsa'

export const metadata: Metadata = {
  title: 'Feedback Confirmation | UKHSA data dashboard',
}

export default async function FeedbackConfirmation() {
  const {
    confirmation_panel_title: panelTitle,
    confirmation_panel_text: panelText,
    confirmation_body: body,
  } = await getPageBySlug<PageType.Feedback>('feedback')

  return (
    <View>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <div className="govuk-panel govuk-panel--confirmation govuk-!-margin-bottom-6">
            <h1 className="govuk-panel__title">{panelTitle}</h1>
            <div className="govuk-panel__body">{panelText}</div>
          </div>

          <RichText>{body}</RichText>

          <Link href="/" className="govuk-link--no-visited-state govuk-!-margin-top-2 govuk-body inline-block">
            Return to home page
          </Link>
        </div>
      </div>
    </View>
  )
}
