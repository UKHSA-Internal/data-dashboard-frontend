import { RelatedLink, RelatedLinks, View } from '@/app/components/ui/ukhsa'
import { flags } from '@/app/constants/flags.constants'
import { getHomePage } from '@/app/utils/cms'
import { renderSection } from '@/app/utils/cms.utils'
import { getFeatureFlag } from '@/app/utils/flags.utils'

export default async function HomePage() {
  const { title, body, page_description: description, related_links: relatedLinks } = await getHomePage()

  const { enabled } = await getFeatureFlag(flags.weatherHealthAlert)
  const { enabled: landingPageEnabled } = await getFeatureFlag(flags.newLandingPage)

  return (
    <View heading={title} description={description} showWelcome>
      <h1 className="govuk-heading-l text-green">Weather health alert flag: {enabled.toString()}</h1>
      <h1 className="govuk-heading-l text-green">New landing page flag: {landingPageEnabled.toString()}</h1>

      {body.map(renderSection)}

      <RelatedLinks variant="footer">
        {relatedLinks.map(({ title, body, url, id }) => (
          <RelatedLink key={id} url={url} title={title}>
            {body}
          </RelatedLink>
        ))}
      </RelatedLinks>
    </View>
  )
}
