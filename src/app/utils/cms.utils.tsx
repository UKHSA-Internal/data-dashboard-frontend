import kebabCase from 'lodash/kebabCase'
import Link from 'next/link'
import { Fragment } from 'react'
import { z } from 'zod'

import { Body, CardTypes, CompositeBody } from '@/api/models/cms/Page'
import { Blocks } from '@/api/models/cms/Page/Blocks'
import { List } from '@/app/components/ui/ukhsa/List/List'
import { ListItemArrow, ListItemArrowLink, ListItemArrowParagraph } from '@/app/components/ui/ukhsa/List/ListItemArrow'
import { getPath } from '@/app/utils/cms/slug'
import { getShowLessURL } from '@/app/utils/show-more.utils'

import {
  ButtonExternal,
  ButtonInternal,
  ChartCardSection,
  ChartRowCard,
  ChartRowCardContent,
  CodeBlock,
  Headline,
  HeadlineNumbersRowCard,
  Percentage,
  RichText,
  TextCard,
  Trend,
  WeatherHealthAlertCard,
} from '../components/cms'
import SubplotFilterCardContainer from '../components/ui/ukhsa/FilterLinkedCards/SubplotFilterCardContainer'
import TimeSeriesFilterCardsContainer from '../components/ui/ukhsa/FilterLinkedCards/TimeSeriesFilterCardsContainer'
import { ListItem } from '../components/ui/ukhsa/List/ListItem'
import { GlobalFilterLinkedMap } from '../features/global-filter'

/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO: Move this file into cms folder
export const renderSection = (
  showMoreSections: string[],
  { id, value: { heading, content, page_link: pageLink } }: z.infer<typeof Body>[number]
) => (
  <div
    id={kebabCase(heading)}
    key={id}
    className="govuk-!-margin-bottom-9 govuk-!-margin-top-4"
    data-testid={`section-${kebabCase(heading)}`}
    role="region"
    aria-label={heading}
  >
    <h2 className="govuk-heading-l govuk-!-margin-bottom-4">
      {pageLink ? (
        <Link href={getPath(pageLink)} className="govuk-link--no-visited-state">
          {heading}
        </Link>
      ) : (
        heading
      )}
    </h2>

    {content.map((item) => renderCard(heading, showMoreSections, '', item))}
    {showMoreSections.includes(kebabCase(heading)) ? (
      <Link
        className="govuk-link--no-visited-state bg-fill_arrow_up_blue bg-no-repeat"
        href={getShowLessURL(showMoreSections, kebabCase(heading))}
        prefetch
      >
        <span className="pl-4">Show Less</span>
      </Link>
    ) : null}
  </div>
)

export const renderCard = (
  heading: string,
  showMoreSections: string[],
  timeseriesFilter: string,
  { type, value, id }: z.infer<typeof CardTypes>,
  chartId?: string
) => {
  return (
    <div key={id}>
      {type === 'text_card' && <TextCard value={value} />}

      {type === 'headline_numbers_row_card' && <HeadlineNumbersRowCard value={value} />}

      {type === 'chart_row_card' && (
        <ChartRowCard>
          <ChartRowCardContent value={value} timeseriesFilter={timeseriesFilter} chartId={chartId} />
        </ChartRowCard>
      )}

      {type === 'filter_linked_map' && <GlobalFilterLinkedMap type={type} value={value} id={id} />}

      {type === 'filter_linked_sub_plot_chart_template' && <SubplotFilterCardContainer />}

      {type === 'filter_linked_time_series_chart_template' && <TimeSeriesFilterCardsContainer />}

      {type === 'chart_card_section' && (
        <ChartCardSection
          value={value}
          heading={heading}
          showMoreSections={showMoreSections}
          timeseriesFilter={timeseriesFilter}
          chartId={chartId}
        />
      )}

      {type === 'weather_health_alert_card' && <WeatherHealthAlertCard value={value} />}
    </div>
  )
}

export const renderBlock = ({
  id,
  type,
  value,
  date_prefix,
}: z.infer<typeof Blocks>[number] & { date_prefix: string }) => (
  <div key={id}>
    {type === 'percentage_number' && <Percentage data={value} datePrefix={date_prefix} />}
    {type === 'headline_number' && <Headline data={value} datePrefix={date_prefix} />}
    {type === 'trend_number' && <Trend data={value} datePrefix={date_prefix} />}
  </div>
)

export const renderCompositeBlock = ({ id, type, value }: CompositeBody[number]) => (
  <Fragment key={id}>
    {type === 'text' && <RichText>{value}</RichText>}

    {type === 'internal_button' && (
      <ButtonInternal
        id={id}
        label={value.text}
        endpoint={value.endpoint}
        method={value.method}
        variant={value.button_type}
        className="govuk-!-margin-bottom-6"
      />
    )}

    {type === 'external_button' && (
      <ButtonExternal
        label={value.text}
        href={value.url}
        icon={value.icon}
        type={value.button_type}
        className="govuk-!-margin-bottom-6"
      />
    )}

    {type === 'code_block' && (
      <>
        {value.heading && <h4 className="govuk-heading-m">{value.heading}</h4>}
        <CodeBlock language={value.content[0].value.language}>{value.content[0].value.code}</CodeBlock>
      </>
    )}

    {type === 'internal_page_links' && value && value.length > 0 && (
      <List>
        <hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible" />
        {value.map(({ id, value }) => (
          <ListItem key={id} spacing="m">
            <ListItemArrow>
              <ListItemArrowLink href={getPath(value.page)}>{value.title}</ListItemArrowLink>
              <ListItemArrowParagraph>{value.sub_title}</ListItemArrowParagraph>
            </ListItemArrow>
          </ListItem>
        ))}
      </List>
    )}
  </Fragment>
)
