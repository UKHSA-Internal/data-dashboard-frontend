import type { Body, CardTypes } from '@/api/models/cms/Page/Body'
import { PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { type ExpandableFilterItem } from '@/app/components/cms/ExpandableFilterDropdown/ExpandableFilterDropdown'
import { Announcements, View } from '@/app/components/ui/ukhsa'
import { getServerTranslation } from '@/app/i18n'
import { PageComponentBaseProps } from '@/app/types'
import { renderSection } from '@/app/utils/cms.utils'
import { processSectionParams } from '@/app/utils/show-more.utils'

import { Description } from '../../ui/ukhsa/View/Description/Description'
import { Heading } from '../../ui/ukhsa/View/Heading/Heading'
import { LastUpdated } from '../../ui/ukhsa/View/LastUpdated/LastUpdated'
import { TopicsListFilterController } from '../TopicsListFilterController/TopicsListFilterController'

const getFilterItemsFromBody = (body: Body): ExpandableFilterItem[] => {
  return body
    .filter((section) => section.value.heading && Array.isArray(section.value.content))
    .map((section) => {
      const children =
        section.value.content?.flatMap((content: CardTypes) => {
          if (content.type !== 'chart_card_section') return []

          return content.value.cards
            .map((card) => {
              const title = card.value.title
              if (!title) return null

              const id = card.id ?? title
              return { id, label: title }
            })
            .filter(Boolean) as { id: string; label: string }[]
        }) ?? []

      return {
        id: section.id ?? section.value.heading,
        label: section.value.heading,
        children,
      }
    })
    .filter((item) => item.children && item.children.length > 0)
}

export default async function TopicsListPage({
  slug,
  searchParams: { section },
}: PageComponentBaseProps<{ section?: string }>) {
  const { t } = await getServerTranslation('common')

  const {
    title,
    body,
    page_description: description,
    last_updated_at: lastUpdated,
    active_announcements: activeAnnouncements,
  } = await getPageBySlug<PageType.TopicsList>(slug, { type: PageType.TopicsList })

  const filterItems = getFilterItemsFromBody(body)

  return (
    <View>
      <Heading heading={t('pageTitle', { title })} />
      <LastUpdated lastUpdated={lastUpdated} />
      <Announcements announcements={activeAnnouncements} />
      <Description description={description} />

      <div className="govuk-grid-row govuk-!-margin-top-4">
        <div className="govuk-grid-column-full">
          <TopicsListFilterController items={filterItems} />
        </div>
      </div>

      <div className="govuk-grid-row">
        <div className="govuk-grid-column-full">
          {body.map(renderSection.bind(null, processSectionParams(section)))}
        </div>
      </div>
    </View>
  )
}
