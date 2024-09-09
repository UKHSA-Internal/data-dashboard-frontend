import { PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { RelatedLinks, RelatedSidebarLink } from '@/app/components/ui/ukhsa/RelatedLinks/v2/RelatedLinks'

export default async function SidebarView() {
  const { related_links: relatedLinks } = await getPageBySlug<PageType.Composite>('access-our-data')

  return (
    <RelatedLinks variant="sidebar">
      {relatedLinks.map(({ title, url, id }) => (
        <RelatedSidebarLink key={id} url={url} title={title} />
      ))}
    </RelatedLinks>
  )
}
