import { flags } from '@/app/constants/flags.constants'
import { getHomePage } from '@/app/utils/cms'
import { renderSection } from '@/app/utils/cms.utils'
import { getFeatureFlag } from '@/app/utils/flags.utils'

import { RelatedLinksWrapper } from '../../ui/ukhsa/RelatedLinks/RelatedLinksWrapper'
import { View } from '../../ui/ukhsa/View/View'

export default async function HomePage() {
  const [
    { enabled: heroEnabled },
    {
      title,
      body,
      page_description: description,
      related_links: relatedLinks,
      related_links_layout: relatedLinksLayout,
    },
  ] = await Promise.all([getFeatureFlag(flags.landingPageHero), getHomePage()])

  return (
    <View heading={heroEnabled ? '' : title} description={heroEnabled ? '' : description} showWelcome={!heroEnabled}>
      {body.map(renderSection)}

      {relatedLinksLayout === 'Sidebar' && (
        <div className="govuk-grid-column-one-quarter-from-desktop govuk-!-margin-top-2 sticky top-2">
          <RelatedLinksWrapper layout={relatedLinksLayout} links={relatedLinks} />
        </div>
      )}
      {relatedLinksLayout === 'Footer' && <RelatedLinksWrapper layout={relatedLinksLayout} links={relatedLinks} />}
    </View>
  )
}
