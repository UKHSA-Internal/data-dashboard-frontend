import { PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { Announcements, View } from '@/app/components/ui/ukhsa'
import { getServerTranslation } from '@/app/i18n'
import { PageComponentBaseProps } from '@/app/types'
import { renderCompositeBlock } from '@/app/utils/cms.utils'

import { RichTextAutoHeadings } from '../../ui/ukhsa/RichTextAutoHeadings/RichTextAutoHeadings'
import { Description } from '../../ui/ukhsa/View/Description/Description'
import { Heading } from '../../ui/ukhsa/View/Heading/Heading'
import { LastUpdated } from '../../ui/ukhsa/View/LastUpdated/LastUpdated'

export default async function TopicsListPage({ slug }: PageComponentBaseProps) {
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

      <div className="govuk-grid-row">
        <div className="govuk-grid-column-full">
          {typeof body === 'string' ? (
            <RichTextAutoHeadings>{body}</RichTextAutoHeadings>
          ) : (
            body.map(renderCompositeBlock)
          )}
        </div>
      </div>
    </View>
  )
}
