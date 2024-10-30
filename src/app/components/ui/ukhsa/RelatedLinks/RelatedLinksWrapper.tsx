import { type RelatedLinks, RelatedLinksLayout } from '@/api/models/cms/Page'
import {
  RelatedLink as RelatedLinkV2,
  RelatedLinks as RelatedLinksV2,
  RelatedSidebarLink as RelatedSidebarLinkV2,
} from '@/app/components/ui/ukhsa/RelatedLinks/v2/RelatedLinks'

interface RelatedLinksWrapperProps {
  links: RelatedLinks
  layout: RelatedLinksLayout
}

export async function RelatedLinksWrapper({ links, layout }: RelatedLinksWrapperProps) {
  const variant = layout === 'Sidebar' ? 'sidebar' : 'footer'

  return (
    <RelatedLinksV2 variant={variant}>
      {links.map(({ title, body, url, id }) =>
        variant === 'sidebar' ? (
          <RelatedSidebarLinkV2 key={id} url={url} title={title}>
            {body}
          </RelatedSidebarLinkV2>
        ) : (
          <RelatedLinkV2 key={id} url={url} title={title}>
            {body}
          </RelatedLinkV2>
        )
      )}
    </RelatedLinksV2>
  )
}
