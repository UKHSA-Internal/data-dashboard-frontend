import { PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { RelatedLink, RelatedLinks } from '@/app/components/ui/ukhsa'

export default async function SidebarView() {
  const { related_links: relatedLinks } = await getPageBySlug<PageType.Composite>('access-our-data')

  return (
    <RelatedLinks variant="sidebar">
      {relatedLinks.map(({ title, url, id }) => (
        <RelatedLink key={id} url={url} title={title} />
      ))}
    </RelatedLinks>
  )
}
