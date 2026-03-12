import { PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import {
  ExpandableFilterDropdown,
  type ExpandableFilterItem,
} from '@/app/components/cms/ExpandableFilterDropdown/ExpandableFilterDropdown'
import { Announcements, View } from '@/app/components/ui/ukhsa'
import { getServerTranslation } from '@/app/i18n'
import { PageComponentBaseProps } from '@/app/types'
import { renderSection } from '@/app/utils/cms.utils'
import { processSectionParams } from '@/app/utils/show-more.utils'

import { Description } from '../../ui/ukhsa/View/Description/Description'
import { Heading } from '../../ui/ukhsa/View/Heading/Heading'
import { LastUpdated } from '../../ui/ukhsa/View/LastUpdated/LastUpdated'

const SAMPLE_TOPICS_AND_THEMES: ExpandableFilterItem[] = [
  {
    id: 'theme-infectious-diseases',
    label: 'Infectious diseases',
    children: [
      { id: 'topic-covid-19', label: 'COVID-19' },
      { id: 'topic-flu', label: 'Seasonal flu' },
      { id: 'topic-tb', label: 'Tuberculosis' },
    ],
  },
  {
    id: 'theme-environmental-health',
    label: 'Environmental health',
    children: [
      { id: 'topic-air-quality', label: 'Air quality' },
      { id: 'topic-radiation', label: 'Radiation' },
    ],
  },
]

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

  return (
    <View>
      <Heading heading={t('pageTitle', { title })} />
      <LastUpdated lastUpdated={lastUpdated} />
      <Announcements announcements={activeAnnouncements} />
      <Description description={description} />

      <div className="govuk-grid-row govuk-!-margin-top-4">
        <div className="govuk-grid-column-full">
          <ExpandableFilterDropdown items={SAMPLE_TOPICS_AND_THEMES} />
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
