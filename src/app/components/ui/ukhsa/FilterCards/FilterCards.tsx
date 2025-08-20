'use client'

import { kebabCase } from 'lodash'
import Link from 'next/link'
import { useState } from 'react'

import { Card } from '../Card/Card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../Tabs/Tabs'

const newCard = {
  id: 'time-series-card-test',
  type: 'chart_row_card' as const,
  value: {
    columns: [
      {
        type: 'chart_card' as const,
        value: {
          title: 'New test card',
          body: 'This is a new test card body content example text',
          related_links: [
            {
              type: 'related_link' as const,
              value: {
                link_display_text: 'Link 1',
                link: 'https://www.google.com',
              },
              id: 'd3fef747-7c5b-46d2-9ea0-da08ee98164e',
            },
            {
              type: 'related_link' as const,
              value: {
                link_display_text: 'Google Page',
                link: 'https://www.google.com',
              },
              id: '46ce6b14-ace8-46f0-af98-ee69afc79383',
            },
            {
              type: 'related_link' as const,
              value: {
                link_display_text: 'Link 2',
                link: 'https://www.google.com',
              },
              id: '45cc9523-d471-473a-af16-4bdbb9618072',
            },
          ],
          tag_manager_event_id: 'new_test_card',
          date_prefix: 'Up to',
          about: 'This is a new test card about text',
          x_axis: null,
          x_axis_title: 'New test card X axis title',
          y_axis: null,
          y_axis_title: 'New test card Y axis title',
          show_timeseries_filter: true,
          chart: [
            {
              type: 'plot' as const,
              value: {
                topic: 'COVID-19',
                metric: 'new_cases_daily',
                chart_type: 'bar',
                date_from: null,
                date_to: null,
                stratum: '',
                geography: '',
                geography_type: '',
                label: 'teshjkfdsjk',
                age: '',
                sex: null,
                line_colour: null,
                line_type: null,
              },
              id: '7d8ee647-1e12-4ea5-8051-dacda36d7dc1',
            },
          ],
        },
        id: 'a937cbb1-b846-4ce8-b334-83ad5988b57b',
      },
    ],
  },
}

const FilterCards = () => {
  const [cards, setCards] = useState<Array<{ id: string; card: typeof newCard }>>([])

  const addNewCard = () => {
    const cardId = `card-${Date.now()}`
    const newCardWithId = {
      ...newCard,
      id: cardId,
    }

    setCards((prevCards) => [...prevCards, { id: cardId, card: newCardWithId }])
  }

  return (
    <>
      <button onClick={addNewCard} className="mb-4 rounded bg-black px-4 py-2 text-white hover:bg-grey-2">
        Add New Card
      </button>

      {/* TODO: On adding a new card, should update URL params for persistence */}
      {cards.map(({ id, card }) => (
        <div key={id} className="mb-4">
          <Card
            asChild
            aria-labelledby={`chart-row-card-heading-${card.id}`}
            className="ukhsa-chart-card flex flex-col gap-6"
          >
            <article>
              <header>
                <h3 id={`chart-row-card-heading-${card.id}`} className="govuk-heading-m mb-2 font-bold">
                  {card.value.columns[0].value.title}
                </h3>
                <p className="govuk-body-s govuk-!-margin-bottom-2 pt-0 italic text-dark-grey">
                  {card.value.columns[0].value.body}
                </p>
              </header>

              <Tabs
                defaultValue={`${kebabCase(card.value.columns[0].value.title)}-chart`}
                className="govuk-!-margin-bottom-0"
              >
                <TabsList className="hidden no-js:block sm:block">
                  <TabsTrigger
                    asChild
                    value={`${kebabCase(card.value.columns[0].value.title)}-chart`}
                    aria-controls={`chart-${kebabCase(card.value.columns[0].value.title)}-content`}
                  >
                    <Link href={`#chart-${kebabCase(card.value.columns[0].value.title)}`}>
                      <span>Chart</span>
                    </Link>
                  </TabsTrigger>
                  <TabsTrigger
                    asChild
                    value={`${kebabCase(card.value.columns[0].value.title)}-table`}
                    aria-controls={`table-${kebabCase(card.value.columns[0].value.title)}-content`}
                  >
                    <Link href={`#table-${kebabCase(card.value.columns[0].value.title)}`}>
                      <span className="govuk-visually-hidden">Tabular data</span>
                      <span aria-hidden>
                        Tabular <span className="hidden lg:inline">data</span>
                      </span>
                    </Link>
                  </TabsTrigger>
                  <TabsTrigger
                    asChild
                    value={`${kebabCase(card.value.columns[0].value.title)}-download`}
                    aria-controls={`download-${kebabCase(card.value.columns[0].value.title)}-content`}
                  >
                    <Link href={`#download-${kebabCase(card.value.columns[0].value.title)}`}>
                      <span>Download</span>
                    </Link>
                  </TabsTrigger>
                </TabsList>
                <TabsContent
                  value={`${kebabCase(card.value.columns[0].value.title)}-chart`}
                  className="min-h-[var(--ukhsa-chart-card-tab-min-height)] no-js:mb-7"
                  data-type="chart"
                  id={`chart-${kebabCase(card.value.columns[0].value.title)}-content`}
                >
                  {/* <Chart data={card.value.columns[0].value} timeseriesFilter={""} chartId={card.id} sizes={[
                  {
                    minWidth: 768,
                    size: 'wide',
                  },
                ]} /> */}
                  Chart content
                </TabsContent>
                <TabsContent
                  value={`${kebabCase(card.value.columns[0].value.title)}-table`}
                  className="min-h-[var(--ukhsa-chart-card-tab-min-height)] no-js:mb-7"
                  data-type="table"
                  id={`table-${kebabCase(card.value.columns[0].value.title)}-content`}
                >
                  Table content
                </TabsContent>
                <TabsContent
                  value={`${kebabCase(card.value.columns[0].value.title)}-download`}
                  className="min-h-[var(--ukhsa-chart-card-tab-min-height)] no-js:mb-7"
                  data-type="download"
                  id={`download-${kebabCase(card.value.columns[0].value.title)}-content`}
                >
                  Download content
                </TabsContent>
              </Tabs>
            </article>
          </Card>
          {/* {renderCard('test', [], '', card, 'time-series')} */}
        </div>
      ))}
    </>
  )
}

export default FilterCards
