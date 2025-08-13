import { TimePeriod } from '@/api/models/cms/Page/GlobalFilter'
import { PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { AreaSelector } from '@/app/components/cms'
import { Details } from '@/app/components/ui/govuk'
import {
  Announcements,
  PageSection,
  PageSectionWithContents,
  // SelectedFilters,
  TopicBodyContextProvider,
  View,
} from '@/app/components/ui/ukhsa'
import { FilterBanner } from '@/app/components/ui/ukhsa/FilterBanner/FilterBanner'
import { getServerTranslation } from '@/app/i18n'
import { PageComponentBaseProps } from '@/app/types'
import { getChartTimespan } from '@/app/utils/chart.utils'
import { renderCard } from '@/app/utils/cms.utils'
import { clsx } from '@/lib/clsx'

import { TimePeriodsHandler } from '../../ui/ukhsa/Context/TimePeriodsHandler'
import RedirectHandler from '../../ui/ukhsa/RedirectHandler/RedirectHandler'
import { RelatedLinksWrapper } from '../../ui/ukhsa/RelatedLinks/RelatedLinksWrapper'
// import StaticFilter from '../../ui/ukhsa/StaticFilter/StaticFilter'
import { Description } from '../../ui/ukhsa/View/Description/Description'
import { Heading } from '../../ui/ukhsa/View/Heading/Heading'
import { LastUpdated } from '../../ui/ukhsa/View/LastUpdated/LastUpdated'

export default async function TopicPage({
  slug,
  searchParams: { areaName, areaType, timeseriesFilter = '' },
}: PageComponentBaseProps<{ areaType?: string; areaName?: string; timeseriesFilter?: string }>) {
  const { t } = await getServerTranslation('common')

  const {
    title,
    body,
    page_description: description,
    last_updated_at: lastUpdated,
    related_links: relatedLinks,
    related_links_layout: relatedLinksLayout,
    enable_area_selector: enableAreaSelector,
    selected_topics: selectedTopics,
    active_announcements: activeAnnouncements,
  } = await getPageBySlug<PageType.Topic>(slug, { type: PageType.Topic })

  let newChartFilters = ''

  let chartCounter = 0

  const showFilterBanner = false
  let extractedTimePeriods: TimePeriod[] = []

  body.map(({ value }) => {
    if (value.content) {
      value.content.map((content) => {
        if (content.type === 'chart_row_card' && content.value.columns) {
          content.value.columns.map((column) => {
            chartCounter++

            // Check timeseries enabled per chart
            if (!column.value.show_timeseries_filter) return

            const chartId = `${value.heading}${chartCounter}`

            const existingFilter = timeseriesFilter.split(';').find((filter) => filter.startsWith(chartId))

            if (existingFilter) {
              newChartFilters += `${existingFilter};`
              return
            }

            const timespan = getChartTimespan(column.value.chart)
            const valueToAdd = timespan.years < 2 ? 'all' : '1-year'

            newChartFilters += `${chartId}|${valueToAdd};`
          })
        }
        // abstract out available time periods
        if (content.type === 'global_filter_card' && content.value.time_range) {
          console.log('time_periods: ', content.value.time_range.time_periods)
          extractedTimePeriods = content.value.time_range.time_periods
        }
        // abstract out the other information received from the global filter card
        if (content.type === 'global_filter_card' && content.value.rows) {
          content.value.rows.map((items) => {
            console.log('items: ', items.value.filters)
          })
        }
      })
    }
  })

  let newRoute

  if (newChartFilters !== timeseriesFilter) {
    const newParams = new URLSearchParams('')
    if (newChartFilters !== '') {
      newParams.set('timeseriesFilter', newChartFilters)
    } else {
      newParams.delete('timeseriesFilter')
    }

    newRoute = `?${newParams.toString()}`
  }

  let chartCardCounter = 0

  return (
    <>
      <RedirectHandler newRoute={newRoute} />
      <View>
        {title === 'Childhood vaccinations' && (
          <img
            className="float-right"
            src={'/assets/images/accredited-official-statistics-logo.svg'}
            height={'70px'}
            width={'70px'}
          />
        )}
        <Heading heading={t('pageTitle', { context: areaName && 'withArea', title, areaName })} />
        <LastUpdated lastUpdated={lastUpdated} />
        <Announcements announcements={activeAnnouncements} />
        <Description description={description} />
        <div className="govuk-grid-row">
          <div
            className={clsx({
              'govuk-grid-column-three-quarters-from-desktop': relatedLinksLayout === 'Sidebar',
              'govuk-grid-column-full': relatedLinksLayout === 'Footer',
            })}
          >
            {enableAreaSelector && (
              <>
                <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible" />
                <Details
                  open={Boolean(areaType)}
                  label={t('areaSelector.detailsLabel')}
                  className="govuk-!-margin-top-6 govuk-!-margin-bottom-6"
                >
                  <AreaSelector areaType={areaType} selectedTopics={selectedTopics} />
                </Details>
              </>
            )}

            <TopicBodyContextProvider>
              <TimePeriodsHandler timePeriods={extractedTimePeriods} />
              {/* Example, do not un-comment */}
              {showFilterBanner && (
                <FilterBanner
                  message="&nbsp;&nbsp;<b>Import information :</b> You can only select <b>four locations </b> to display at a time."
                  showIcon={true}
                />
              )}
              {/*<StaticFilter>
                <SelectedFilters />
                <FilterDropdowns />
              </StaticFilter> */}

              <PageSectionWithContents>
                {body.map(({ id, value }) => (
                  <PageSection key={id} heading={value.heading}>
                    {value.content.map((item) =>
                      renderCard(value.heading, [], timeseriesFilter, item, `${value.heading}${chartCardCounter++}`)
                    )}
                  </PageSection>
                ))}
              </PageSectionWithContents>
            </TopicBodyContextProvider>
          </div>

          {relatedLinksLayout === 'Sidebar' ? (
            <div className="govuk-grid-column-one-quarter-from-desktop govuk-!-margin-top-6 sticky top-2">
              <RelatedLinksWrapper layout={relatedLinksLayout} links={relatedLinks} />
            </div>
          ) : null}
        </div>

        {relatedLinksLayout === 'Footer' ? (
          <RelatedLinksWrapper layout={relatedLinksLayout} links={relatedLinks} />
        ) : null}
      </View>
    </>
  )
}
