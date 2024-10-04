import { RelatedLink as RelatedLinkV1, RelatedLinks as RelatedLinksV1, View } from '@/app/components/ui/ukhsa'
import { flags } from '@/app/constants/flags.constants'
import { getHomePage, getLandingPage } from '@/app/utils/cms'
import { renderSection } from '@/app/utils/cms.utils'
import { getFeatureFlag } from '@/app/utils/flags.utils'

export default async function HomePage() {
  const { enabled: heroEnabled } = await getFeatureFlag(flags.landingPageHero)

  const { title, body, page_description: description, related_links: relatedLinks } = await getHomePage()

  const { body: landingBody } = await getLandingPage()

  const { enabled: newLandingContentEnabled } = await getFeatureFlag(flags.landingPageContent)

  return (
    <View heading={heroEnabled ? '' : title} description={heroEnabled ? '' : description} showWelcome={!heroEnabled}>
      {newLandingContentEnabled ? landingBody.map(renderSection) : body.map(renderSection)}

      {newLandingContentEnabled ? null : (
        <RelatedLinksV1 variant="footer">
          {relatedLinks.map(({ title, body, url, id }) => (
            <RelatedLinkV1 key={id} url={url} title={title}>
              {body}
            </RelatedLinkV1>
          ))}
        </RelatedLinksV1>
      )}
    </View>
  )
}
