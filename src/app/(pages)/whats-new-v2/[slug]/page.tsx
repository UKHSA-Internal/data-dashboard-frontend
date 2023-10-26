// import { PageType } from '@/api/requests/cms/getPages'
// import { getPageBySlug } from '@/api/requests/getPageBySlug'
// import { RichText } from '@/app/components/cms'
import { RichText } from '@/app/components/cms'
import { View } from '@/app/components/ui/ukhsa'

export default async function WhatsNewChildPage() {
  // const { title, body } = await getPageBySlug('whats-new-v2', PageType.WhatsNewChild)
  // const { title, body, badge } = await getPageBySlug('whats-new-v2', PageType.WhatsNewChild)

  return (
    <View heading={'Soft launch of the UKHSA data dashboard'} backLink="/whats-new-v2">
      <strong className="govuk-tag govuk-!-margin-bottom-2">New Feature</strong>
      <RichText>Body</RichText>
      <h2 className="govuk-heading-m">Affected areas</h2>
      <ul>
        <li>item 1</li>
        <li>item 2</li>
        <li>item 3</li>
      </ul>
      <h2 className="govuk-heading-m govuk-!-margin-top-4">Additional information</h2>
      <p>Additional information</p>
    </View>
  )
}
