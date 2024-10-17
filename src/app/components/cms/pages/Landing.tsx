import { View } from '@/app/components/ui/ukhsa'
import { getLandingPage } from '@/app/utils/cms'
import { renderSection } from '@/app/utils/cms.utils'

import { RelatedLinksWrapper } from '../../ui/ukhsa/RelatedLinks/RelatedLinksWrapper'

// const getPage = cache(getLandingPage)

export default async function LandingPage() {
  // const { body, related_links_layout: relatedLinksLayout, related_links: relatedLinks } = await getPage()
  const { body, related_links_layout: relatedLinksLayout, related_links: relatedLinks } = await getLandingPage()

  return (
    <View>
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
