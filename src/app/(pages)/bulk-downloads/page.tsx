import { Metadata } from 'next'

import { PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { DownloadButton, RichText } from '@/app/components/cms'
import { RelatedLink, RelatedLinks, View } from '@/app/components/ui/ukhsa'

export async function generateMetadata(): Promise<Metadata> {
  const {
    meta: { seo_title, search_description },
  } = await getPageBySlug('bulk-downloads', PageType.Composite)

  return {
    title: seo_title,
    description: search_description,
  }
}

export default async function BulkDownloads() {
  const { title, body, related_links: relatedLinks } = await getPageBySlug('bulk-downloads', PageType.Composite)

  return (
    <View heading={title}>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-three-quarters-from-desktop">
          {body.map(({ type, value, id }) => {
            if (type === 'text') {
              return <RichText key={id}>{value}</RichText>
            }
            if (type === 'button') {
              return (
                <DownloadButton
                  key={id}
                  aria-label="Bulk downloads"
                  endpoint={value.endpoint}
                  method={value.method}
                  label={value.text}
                  id={id}
                />
              )
            }
          })}
        </div>
      </div>

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
