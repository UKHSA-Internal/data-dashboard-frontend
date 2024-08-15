import { RelatedLink, RelatedLinks, View } from '@/app/components/ui/ukhsa'
import { getHomePage } from '@/app/utils/cms'
import { renderSection } from '@/app/utils/cms.utils'

import { PlotlyChart } from './PlotlyChart'

export default async function HomePage() {
  const { title, body, page_description: description, related_links: relatedLinks } = await getHomePage()

  return (
    <View heading={title} description={description} showWelcome>
      <PlotlyChart />
      <br />
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
