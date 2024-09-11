import { type RelatedLinks, RelatedLinksLayout } from '@/api/models/cms/Page'
import { RelatedLink as RelatedLinkV1, RelatedLinks as RelatedLinksV1 } from '@/app/components/ui/ukhsa'
import {
  RelatedLink as RelatedLinkV2,
  RelatedLinks as RelatedLinksV2,
} from '@/app/components/ui/ukhsa/RelatedLinks/v2/RelatedLinks'
import { flags } from '@/app/constants/flags.constants'
import { getFeatureFlag } from '@/app/utils/flags.utils'
import { clsx } from '@/lib/clsx'

interface RelatedLinksWrapperProps {
  links: RelatedLinks
  layout: RelatedLinksLayout
}

export async function RelatedLinksWrapper({ links, layout }: RelatedLinksWrapperProps) {
  const { enabled: newLandingContentEnabled } = await getFeatureFlag(flags.landingPageContent)

  const variant = layout === 'Sidebar' ? 'sidebar' : 'footer'

  return (
    <div className={clsx({ 'govuk-row': variant === 'footer' })}>
      <div className={clsx({ 'govuk-grid-column-three-quarters-from-desktop': variant === 'footer' })}>
        {newLandingContentEnabled ? (
          <RelatedLinksV2 variant={variant}>
            {links.map(({ title, body, url, id }) => (
              <RelatedLinkV2 key={id} url={url} title={title}>
                {body}
              </RelatedLinkV2>
            ))}
          </RelatedLinksV2>
        ) : (
          <RelatedLinksV1 variant={variant}>
            {links.map(({ title, body, url, id }) => (
              <RelatedLinkV1 key={id} url={url} title={title}>
                {body}
              </RelatedLinkV1>
            ))}
          </RelatedLinksV1>
        )}
      </div>
    </div>
  )
}
