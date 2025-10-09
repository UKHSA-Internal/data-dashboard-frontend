import { render, screen, within } from '@/config/test-utils'

import { HeadlineNumbersRowCard } from './HeadlineNumbersRowCard'

// Mock the renderBlock function and components
jest.mock('@/app/utils/cms.utils', () => ({
  ...jest.requireActual('@/app/utils/cms.utils'),
  renderBlock: jest.fn(),
}))

jest.mock('@/app/components/cms', () => ({
  ...jest.requireActual('@/app/components/cms'),
  Percentage: () => <div>Mocked percentage number</div>,
  Headline: () => <div>Mocked headline number</div>,
  Trend: () => <div>Mocked trend number</div>,
}))

describe('HeadlineNumbersRowCard', () => {
  const mockValue = {
    columns: [
      {
        type: 'column',
        value: {
          title: 'Cases',
          date_prefix: 'Up to',
          rows: [
            {
              type: 'headline_number',
              value: {
                topic: 'COVID-19',
                metric: 'COVID-19_headline_newcases_7daytotals',
                body: 'Weekly',
              },
              id: 'eff08341-7bfa-4a3b-b013-527e7b954ce8',
            },
            {
              type: 'trend_number',
              value: {
                topic: 'COVID-19',
                metric: 'COVID-19_headline_newcases_7daychange',
                body: 'Last 7 days',
                percentage_metric: 'COVID-19_headline_newcases_7daypercentchange',
              },
              id: 'a57a4ad5-6b52-45a6-acfd-2fe208cb5617',
            },
          ],
        },
        id: 'ff081d2a-e235-4bc2-9b09-220f8fe20494',
      },
      {
        type: 'column',
        value: {
          title: 'Deaths',
          date_prefix: 'Up to',
          rows: [
            {
              type: 'headline_number',
              value: {
                topic: 'COVID-19',
                metric: 'COVID-19_headline_ONSdeaths_7daytotals',
                body: 'Weekly',
              },
              id: '2e403485-030c-4122-86be-5827a095f30d',
            },
            {
              type: 'trend_number',
              value: {
                topic: 'COVID-19',
                metric: 'COVID-19_headline_ONSdeaths_7daychange',
                body: 'Last 7 days',
                percentage_metric: 'COVID-19_headline_ONSdeaths_7daypercentchange',
              },
              id: 'ea8603ca-7b4d-4ef5-a8b1-f27a565938b5',
            },
          ],
        },
        id: '530cf367-092c-40d1-9129-c2274c7836b9',
      },
      {
        type: 'column',
        value: {
          title: 'Healthcare',
          date_prefix: 'Up to',
          rows: [
            {
              type: 'headline_number',
              value: {
                topic: 'COVID-19',
                metric: 'COVID-19_headline_7DayAdmissions',
                body: 'Patients admitted',
              },
              id: '2f49a215-02e7-4ded-94b1-1a0c2933708b',
            },
            {
              type: 'trend_number',
              value: {
                topic: 'COVID-19',
                metric: 'COVID-19_headline_7DayAdmisionsChange',
                body: 'Last 7 days',
                percentage_metric: 'COVID-19_headline_7DayAdmissionsPercentChange',
              },
              id: '6c09d01e-82c5-425f-aa07-1bdd22d1eaa8',
            },
          ],
        },
        id: 'fad2e89a-8a65-44a8-b962-9df59169c0af',
      },
      {
        type: 'column',
        value: {
          title: 'Vaccines',
          date_prefix: 'Up to',
          rows: [
            {
              type: 'headline_number',
              value: {
                topic: 'COVID-19',
                metric: 'COVID-19_headline_totalvaccines_spring23',
                body: 'Autumn booster',
              },
              id: 'ae3344f7-5b23-4977-bea9-2e1ccd84eb50',
            },
          ],
        },
        id: '93b6367b-fbb3-47e8-96db-f724d947fa00',
      },
      {
        type: 'column',
        value: {
          title: 'Testing',
          date_prefix: 'Up to',
          rows: [
            {
              type: 'percentage_number',
              value: {
                topic: 'COVID-19',
                metric: 'COVID-19_headline_positivity_latest',
                body: 'Virus tests positivity',
              },
              id: '36746bcd-1dce-4e5e-81f8-60c8b9994540',
            },
          ],
        },
        id: '1e3bf214-88e4-4cf4-9b78-3ad7eabb2eaa',
      },
    ],
  }

  test('displays a row of columns containing a heading and metric data', () => {
    // Had to define as any as could be of multiple types, tests pass
    render(<HeadlineNumbersRowCard value={mockValue as any} />)

    expect(screen.getByTestId('headline-row')).toHaveClass('ukhsa-headline-numbers-row-card')

    // Cases
    const casesColumn = screen.getByTestId('headline-column-cases')
    expect(within(casesColumn).getByRole('heading', { level: 3, name: 'Cases' })).toBeInTheDocument()

    // Deaths
    const deathsColumn = screen.getByTestId('headline-column-deaths')
    expect(within(deathsColumn).getByRole('heading', { level: 3, name: 'Deaths' })).toBeInTheDocument()

    // Healthcare
    const healthcareColumn = screen.getByTestId('headline-column-healthcare')
    expect(within(healthcareColumn).getByRole('heading', { level: 3, name: 'Healthcare' })).toBeInTheDocument()

    // Vaccines
    const vaccinesColumn = screen.getByTestId('headline-column-vaccines')
    expect(within(vaccinesColumn).getByRole('heading', { level: 3, name: 'Vaccines' })).toBeInTheDocument()

    // Testing
    const testingColumn = screen.getByTestId('headline-column-testing')
    expect(within(testingColumn).getByRole('heading', { level: 3, name: 'Testing' })).toBeInTheDocument()
  })

  test('displays five columns on desktop devices when the default amount of columns (5) is set', () => {
    render(<HeadlineNumbersRowCard value={mockValue as any} />)
    expect(screen.getByTestId('headline-row').firstChild).toHaveClass('md:grid-cols-5')
  })

  test('displays a mobile first in a two column layout, then a three-col layout for larger devices', () => {
    const mockValueWithOneColumn = {
      columns: [
        {
          type: 'column',
          value: {
            title: 'Cases',
            date_prefix: 'Up to',
            rows: [
              {
                type: 'headline_number',
                value: {
                  topic: 'COVID-19',
                  metric: 'COVID-19_headline_newcases_7daytotals',
                  body: 'Weekly',
                },
                id: 'eff08341-7bfa-4a3b-b013-527e7b954ce8',
              },
            ],
          },
          id: 'ff081d2a-e235-4bc2-9b09-220f8fe20494',
        },
      ],
    }

    render(<HeadlineNumbersRowCard value={mockValueWithOneColumn as any} />)
    const gridRow = screen.getByTestId('headline-row').firstChild
    expect(gridRow).toHaveClass('grid-cols-2 sm:grid-cols-3')
    expect(gridRow).not.toHaveClass('md:grid-cols-5')
  })
})
