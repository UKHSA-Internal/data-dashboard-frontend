import { PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { RichText } from '@/app/components/cms'
import { View } from '@/app/components/ui/ukhsa'

export default async function WhatsNewChildPage() {
  const { title, body, additional_details, date_posted } = await getPageBySlug('whats-new-v2', PageType.WhatsNewChild)

  return (
    <View heading={title} backLink="/whats-new-v2" lastUpdated={date_posted}>
      <strong className="govuk-tag govuk-!-margin-bottom-2">New Feature</strong>
      <RichText>{body}</RichText>
      <h2 className="govuk-heading-m govuk-!-margin-top-4">Additional details</h2>
      <RichText>{additional_details}</RichText>
    </View>
  )
}
