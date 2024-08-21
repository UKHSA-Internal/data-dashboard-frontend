import { RelatedLink, RelatedLinks, View } from '@/app/components/ui/ukhsa'
import { flags } from '@/app/constants/flags.constants'
import { getHomePage } from '@/app/utils/cms'
import { renderSection } from '@/app/utils/cms.utils'
import { getFeatureFlag } from '@/app/utils/flags.utils'

export default async function HomePage() {
  const { enabled: heroEnabled } = await getFeatureFlag(flags.landingPageHero)

  const { title, body, page_description: description, related_links: relatedLinks } = await getHomePage()

  return (
    <View heading={heroEnabled ? '' : title} description={heroEnabled ? '' : description} showWelcome={!heroEnabled}>
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
