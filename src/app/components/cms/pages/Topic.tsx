/* eslint-disable @next/next/no-img-element */
import { FilterLinkedSubplotData, FilterLinkedTimeSeriesData } from '@/api/models/cms/Page/GlobalFilter'
import { PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { AreaSelector } from '@/app/components/cms'
import { Details } from '@/app/components/ui/govuk'
import { Announcements, PageSection, PageSectionWithContents, View } from '@/app/components/ui/ukhsa'
import { GlobalFilterProvider } from '@/app/context/globalFilterContext'
import { getServerTranslation } from '@/app/i18n'
import { PageComponentBaseProps } from '@/app/types'
import { getChartTimespan } from '@/app/utils/chart.utils'
import { renderCard } from '@/app/utils/cms.utils'
import {
  extractDataFromGlobalFilter,
  ExtractedFilters,
  extractSubplotSectionData,
  extractTimeSeriesSectionData,
} from '@/app/utils/global-filter-content-parser'
import { clsx } from '@/lib/clsx'

import RedirectHandler from '../../ui/ukhsa/RedirectHandler/RedirectHandler'
import { RelatedLinksWrapper } from '../../ui/ukhsa/RelatedLinks/RelatedLinksWrapper'
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

  let extractedGlobalFilterContent = {} as ExtractedFilters
  let extractedSubplotData = {} as FilterLinkedSubplotData
  let extractedTimeSeriesData = {} as FilterLinkedTimeSeriesData

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
        if (content.type === 'global_filter_card') {
          extractedGlobalFilterContent = extractDataFromGlobalFilter(content)
        }
        if (content.type === 'filter_linked_sub_plot_chart_template') {
          extractedSubplotData = extractSubplotSectionData(content)
          extractedGlobalFilterContent.coverageTemplateData = extractedSubplotData
        }
        if (content.type === 'filter_linked_time_series_chart_template') {
          extractedTimeSeriesData = extractTimeSeriesSectionData(content)
          extractedGlobalFilterContent.timeseriesTemplateData = extractedTimeSeriesData
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
        {slug[1] === 'childhood-vaccinations' && (
          <img
            className="float-right"
            src={'/assets/images/accredited-official-statistics-logo.svg'}
            alt="Accredited Official Statistics"
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

            <GlobalFilterProvider filters={extractedGlobalFilterContent}>
              <PageSectionWithContents>
                {body.map(({ id, value }) => (
                  <PageSection key={id} heading={value.heading}>
                    {value.content.map((item) =>
                      renderCard(value.heading, [], timeseriesFilter, item, `${value.heading}${chartCardCounter++}`)
                    )}
                  </PageSection>
                ))}
              </PageSectionWithContents>
            </GlobalFilterProvider>
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
