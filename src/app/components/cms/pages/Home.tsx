import { View } from '@/app/components/ui/ukhsa'
import { flags } from '@/app/constants/flags.constants'
import { getHomePage, getLandingPage } from '@/app/utils/cms'
import { renderSection } from '@/app/utils/cms.utils'
import { getFeatureFlag } from '@/app/utils/flags.utils'

import { RelatedLinksWrapper } from '../../ui/ukhsa/RelatedLinks/RelatedLinksWrapper'

export default async function HomePage() {
  const { enabled: heroEnabled } = await getFeatureFlag(flags.landingPageHero)

  const {
    title,
    body,
    page_description: description,
    related_links: relatedLinks,
    related_links_layout: relatedLinksLayout,
  } = await getHomePage()

  const { body: landingBody } = await getLandingPage()

  const { enabled: newLandingContentEnabled } = await getFeatureFlag(flags.landingPageContent)

  return (
    <View heading={heroEnabled ? '' : title} description={heroEnabled ? '' : description} showWelcome={!heroEnabled}>
      {newLandingContentEnabled ? landingBody.map(renderSection) : body.map(renderSection)}

      {relatedLinksLayout === 'Sidebar' && !newLandingContentEnabled ? (
        <div className="govuk-grid-column-one-quarter-from-desktop govuk-!-margin-top-2 sticky top-2">
          <RelatedLinksWrapper layout={relatedLinksLayout} links={relatedLinks} />
        </div>
      ) : null}
      {/* </div> */}

      {relatedLinksLayout === 'Footer' && !newLandingContentEnabled ? (
        <RelatedLinksWrapper layout={relatedLinksLayout} links={relatedLinks} />
      ) : null}
    </View>
  )
}
