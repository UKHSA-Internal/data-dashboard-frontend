'use client'

import { kebabCase } from 'lodash'
import Link from 'next/link'
import { useState } from 'react'

import { Card } from '../Card/Card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../Tabs/Tabs'

const newCard = {
  title: 'New test card',
  description: 'This is a new test card description',
  upToAndIncluding: '2025-01-01',
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
            aria-labelledby={`chart-row-card-heading-${id}`}
            className="ukhsa-chart-card flex flex-col gap-6"
          >
            <article>
              <header>
                <h3 id={`chart-row-card-heading-${id}`} className="govuk-heading-m mb-2 font-bold">
                  {card.title}
                </h3>
                <p className="govuk-body-s govuk-!-margin-bottom-2 pt-0 italic text-dark-grey">{card.description}</p>
              </header>

              <Tabs defaultValue={`${kebabCase(card.title)}-chart`} className="govuk-!-margin-bottom-0">
                <TabsList className="hidden no-js:block sm:block">
                  <TabsTrigger
                    asChild
                    value={`${kebabCase(card.title)}-chart`}
                    aria-controls={`chart-${kebabCase(card.title)}-content`}
                  >
                    <Link href={`#chart-${kebabCase(card.title)}`}>
                      <span>Chart</span>
                    </Link>
                  </TabsTrigger>
                  <TabsTrigger
                    asChild
                    value={`${kebabCase(card.title)}-table`}
                    aria-controls={`table-${kebabCase(card.title)}-content`}
                  >
                    <Link href={`#table-${kebabCase(card.title)}`}>
                      <span className="govuk-visually-hidden">Tabular data</span>
                      <span aria-hidden>
                        Tabular <span className="hidden lg:inline">data</span>
                      </span>
                    </Link>
                  </TabsTrigger>
                  <TabsTrigger
                    asChild
                    value={`${kebabCase(card.title)}-download`}
                    aria-controls={`download-${kebabCase(card.title)}-content`}
                  >
                    <Link href={`#download-${kebabCase(card.title)}`}>
                      <span>Download</span>
                    </Link>
                  </TabsTrigger>
                </TabsList>
                <TabsContent
                  value={`${kebabCase(card.title)}-chart`}
                  className="min-h-[var(--ukhsa-chart-card-tab-min-height)] no-js:mb-7"
                  data-type="chart"
                  id={`chart-${kebabCase(card.title)}-content`}
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
                  value={`${kebabCase(card.title)}-table`}
                  className="min-h-[var(--ukhsa-chart-card-tab-min-height)] no-js:mb-7"
                  data-type="table"
                  id={`table-${kebabCase(card.title)}-content`}
                >
                  Table content
                </TabsContent>
                <TabsContent
                  value={`${kebabCase(card.title)}-download`}
                  className="min-h-[var(--ukhsa-chart-card-tab-min-height)] no-js:mb-7"
                  data-type="download"
                  id={`download-${kebabCase(card.title)}-content`}
                >
                  Download content
                </TabsContent>
              </Tabs>
            </article>
          </Card>
        </div>
      ))}
    </>
  )
}

export default FilterCards
