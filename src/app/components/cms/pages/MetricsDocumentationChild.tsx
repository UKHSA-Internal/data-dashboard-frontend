import { PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { RichText } from '@/app/components/cms'
import { Announcements, PageSection, PageSectionWithContents, View } from '@/app/components/ui/ukhsa'
import MetricsSummary from '@/app/components/ui/ukhsa/MetricsSummary/MetricsSummary'
import { getServerTranslation } from '@/app/i18n'
import { PageComponentBaseProps } from '@/app/types'
import { extractRootSlug } from '@/app/utils/cms/slug'

import { BackLink } from '../../ui/ukhsa/View/BackLink/Backlink'
import { Heading } from '../../ui/ukhsa/View/Heading/Heading'
import { LastUpdated } from '../../ui/ukhsa/View/LastUpdated/LastUpdated'

export default async function MetricsChildPage({
  slug,
  searchParams: { returnUrl },
}: PageComponentBaseProps<{ returnUrl: string }>) {
  const { t } = await getServerTranslation('metrics')

  const {
    title,
    topic,
    metric,
    metric_group: group,
    body,
    last_updated_at: lastUpdated,
    announcements,
  } = await getPageBySlug<PageType.MetricsChild>(slug, { type: PageType.MetricsChild })

  const backLink = returnUrl || extractRootSlug(slug)

  return (
    <View>
      <Announcements announcements={announcements} />

      <BackLink backlink={backLink} />
      <Heading heading={title} />
      <LastUpdated lastUpdated={lastUpdated} />
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-three-quarters-from-desktop">
          <PageSectionWithContents>
            <PageSection heading={'Summary'}>
              <MetricsSummary topic={topic} group={group} metric={metric} />
            </PageSection>
            {body.map(({ id, value: { title, body } }) => (
              <PageSection key={id} heading={title}>
                {body ? (
                  <RichText>{body}</RichText>
                ) : (
                  <p className="govuk-body">{t('emptyDescriptionText', { value: title.toLowerCase() })}</p>
                )}
              </PageSection>
            ))}
          </PageSectionWithContents>
        </div>
      </div>
    </View>
  )
}
