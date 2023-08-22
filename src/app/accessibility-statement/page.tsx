import { Metadata } from 'next'

import { View } from '../components/ui/ukhsa'

export const metadata: Metadata = {
  title: 'Accessibility Statement | UKHSA data dashboard',
}

export default async function FeedbackConfirmation() {
  return (
    <View>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <h1 className="govuk-heading-xl govuk-!-margin-bottom-4">Accessibility Statement</h1>
        </div>
      </div>
    </View>
  )
}
