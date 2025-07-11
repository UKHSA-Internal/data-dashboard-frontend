import { ComponentProps } from 'react'

import { getShowMoreURL } from '@/app/utils/show-more.utils'
import { render, screen, within } from '@/config/test-utils'

import { ChartRowCardHeader } from '../components/cms'
import {
  mockChartCardSectionWithSixCards,
  mockChartRowCardWithChartHeadlineAndTrendCard,
  mockChartRowCardWithDualChartCard,
  mockChartRowCardWithSingleChartCard,
  mockHeadlineNumbersRowCard,
  mockHeadlineNumbersRowCardWithOneColumn,
  mockLinkedMapCard,
  mockSectionNoLink,
  mockSectionWithCard,
  mockSectionWithLink,
  mockSectionWithLongHeading,
  mockTextCard,
} from './__mocks__/cms'
import { renderBlock, renderCard, renderCompositeBlock, renderSection } from './cms.utils'

// This is an ugly hack because Jest currently cannot render nested server components. As a result we must
// stub these components in order to test the functionality within cms.utils.tsx
jest.mock('../components/cms', () => ({
  ...jest.requireActual('../components/cms'),
  Timestamp: () => <div>Up to and including 27 September 2023</div>,
  Download: () => <div>Mocked download</div>,
  About: () => <div>Mocked About</div>,
  Table: () => <div>Mocked table</div>,
  Chart: () => <div>Mocked chart</div>,
  MapTab: () => <div>Mocked Map</div>,
  Percentage: () => <div>Mocked percentage number</div>,
  Headline: () => <div>Mocked headline number</div>,
  Trend: () => <div>Mocked trend number</div>,
  ChartRowCardHeader: ({ title, description, children, id }: ComponentProps<typeof ChartRowCardHeader>) => (
    <header>
      <h3 id={`chart-row-card-heading-${id}`}>{title}</h3>
      <p>{description}</p>
      {children}
    </header>
  ),
  ButtonExternal: () => <div>Mocked external download button</div>,
  ButtonInternal: () => <div>Mocked internal download button</div>,
  RichText: () => <div>Mocked richtext component</div>,
  CodeBlock: () => <div>Mocked code block</div>,
}))

//Mock the getShowLessURL and getShowMoreURL
jest.mock('@/app/utils/show-more.utils', () => ({
  getShowMoreURL: jest.fn(),
  getShowLessURL: jest.fn(),
}))

describe('Displaying a section from the cms home page', () => {
  test('renders a heading that links to the topic page', () => {
    render(renderSection([], mockSectionWithLink))
    expect(screen.getByRole('heading', { level: 2, name: 'COVID-19' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'COVID-19' })).toHaveAttribute('href', '/topics/covid-19')

    render(renderSection([], mockSectionWithLongHeading))
    expect(screen.getByRole('heading', { level: 2, name: 'Other respiratory viruses' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Other respiratory viruses' })).toHaveAttribute(
      'href',
      '/topics/other-respiratory-viruses'
    )
  })

  test('renders a heading with no link', () => {
    render(renderSection([], mockSectionNoLink))
    expect(screen.getByRole('heading', { level: 2, name: 'COVID-19' })).toBeInTheDocument()
  })

  test('renders a card', () => {
    render(renderSection([], mockSectionWithCard))
    expect(screen.getByText('This is some cms content')).toBeInTheDocument()
  })
})

describe('Text card', () => {
  test('text card displays correctly', () => {
    render(renderCard('Text card heading', [], '', mockTextCard))
    expect(screen.getByRole('heading', { level: 3, name: 'Text card heading' })).toBeInTheDocument()
    expect(screen.getByText('Text card body')).toBeInTheDocument()
  })
})

describe('Headline numbers row card', () => {
  test('displays a row of columns containing a heading and metric data', () => {
    render(renderCard('', [], '', mockHeadlineNumbersRowCard))

    expect(screen.getByTestId('headline-row')).toHaveClass('ukhsa-headline-numbers-row-card')

    // Cases
    const casesColumn = screen.getByTestId('headline-column-cases')
    expect(within(casesColumn).getByRole('heading', { level: 3, name: 'Cases' })).toBeInTheDocument()
    expect(within(casesColumn).getByText('Mocked headline number')).toBeInTheDocument()
    expect(within(casesColumn).getByText('Mocked trend number')).toBeInTheDocument()

    // Deaths
    const deathsColumn = screen.getByTestId('headline-column-deaths')
    expect(within(deathsColumn).getByRole('heading', { level: 3, name: 'Deaths' })).toBeInTheDocument()
    expect(within(deathsColumn).getByText('Mocked headline number')).toBeInTheDocument()
    expect(within(deathsColumn).getByText('Mocked trend number')).toBeInTheDocument()

    // Healthcare
    const healthcareColumn = screen.getByTestId('headline-column-healthcare')
    expect(within(healthcareColumn).getByRole('heading', { level: 3, name: 'Healthcare' })).toBeInTheDocument()
    expect(within(healthcareColumn).getByText('Mocked headline number')).toBeInTheDocument()
    expect(within(healthcareColumn).getByText('Mocked trend number')).toBeInTheDocument()

    // Vaccines
    const vaccinesColumn = screen.getByTestId('headline-column-vaccines')
    expect(within(vaccinesColumn).getByRole('heading', { level: 3, name: 'Vaccines' })).toBeInTheDocument()
    expect(within(vaccinesColumn).getByText('Mocked headline number')).toBeInTheDocument()

    // Testing
    const testingColumn = screen.getByTestId('headline-column-testing')
    expect(within(testingColumn).getByRole('heading', { level: 3, name: 'Testing' })).toBeInTheDocument()
    expect(within(testingColumn).getByText('Mocked percentage number')).toBeInTheDocument()
  })

  test('displays five columns on desktop devices when the default amount of columns (5) is set', () => {
    render(renderCard('', [], '', mockHeadlineNumbersRowCard))
    expect(screen.getByTestId('headline-row').firstChild).toHaveClass('md:grid-cols-5')
  })

  test('displays a mobile first in a two column layout, then a three-col layout for larger devices', () => {
    render(renderCard('', [], '', mockHeadlineNumbersRowCardWithOneColumn))
    const gridRow = screen.getByTestId('headline-row').firstChild
    expect(gridRow).toHaveClass('grid-cols-2 sm:grid-cols-3')
    expect(gridRow).not.toHaveClass('md:grid-cols-5')
  })
})
describe('Linked Map Card', () => {
  test('linked Map card displays correctly', () => {
    render(renderCard('', [], '', mockLinkedMapCard))

    expect(screen.getAllByRole('article')).toHaveLength(1)

    const article = screen.getByRole('article')
    expect(article).toBeInTheDocument()
    expect(article).toHaveClass('ukhsa-map-card')

    // Heading and description
    expect(within(article).getByRole('heading', { level: 3, name: 'Chart heading 1' })).toBeInTheDocument()
    expect(within(article).getByText('Chart description 1')).toBeInTheDocument()
    expect(within(article).getByText('Up to and including 27 September 2023')).toBeInTheDocument()

    // Tabs list
    expect(screen.getByRole('tablist')).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Map' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tab', { name: 'Tabular data' })).toHaveAttribute('aria-selected', 'false')
    expect(screen.getByRole('tab', { name: 'Download' })).toHaveAttribute('aria-selected', 'false')
    expect(screen.getByRole('tab', { name: 'About' })).toHaveAttribute('aria-selected', 'false')

    // Tabs panel
    expect(screen.getByRole('tab', { name: 'Map' })).toHaveAttribute('data-state', 'active')
    expect(screen.getByRole('tab', { name: 'Tabular data' })).toHaveAttribute('data-state', 'inactive')
    expect(screen.getByRole('tab', { name: 'Download' })).toHaveAttribute('data-state', 'inactive')
    expect(screen.getByRole('tab', { name: 'About' })).toHaveAttribute('data-state', 'inactive')

    // Chart
    expect(screen.getByText('Mocked Map')).toBeVisible()
  })
})

describe('Chart row card', () => {
  test('chart card displays correctly', () => {
    render(renderCard('', [], '', mockChartRowCardWithSingleChartCard))

    expect(screen.getAllByRole('article')).toHaveLength(1)

    const article = screen.getByRole('article', { name: 'Chart heading 1' })
    expect(article).toBeInTheDocument()
    expect(article).toHaveClass('ukhsa-chart-card')

    // Heading and description
    expect(within(article).getByRole('heading', { level: 3, name: 'Chart heading 1' })).toBeInTheDocument()
    expect(within(article).getByText('Chart description 1')).toBeInTheDocument()
    expect(within(article).getByText('Up to and including 27 September 2023')).toBeInTheDocument()

    // Tabs list
    expect(screen.getByRole('tablist')).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Chart' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tab', { name: 'Tabular data' })).toHaveAttribute('aria-selected', 'false')
    expect(screen.getByRole('tab', { name: 'Download' })).toHaveAttribute('aria-selected', 'false')
    expect(screen.getByRole('tab', { name: 'About' })).toHaveAttribute('aria-selected', 'false')

    // Tabs panel
    expect(screen.getByRole('tab', { name: 'Chart' })).toHaveAttribute('data-state', 'active')
    expect(screen.getByRole('tab', { name: 'Tabular data' })).toHaveAttribute('data-state', 'inactive')
    expect(screen.getByRole('tab', { name: 'Download' })).toHaveAttribute('data-state', 'inactive')
    expect(screen.getByRole('tab', { name: 'About' })).toHaveAttribute('data-state', 'inactive')

    // Chart
    expect(screen.getByText('Mocked chart')).toBeVisible()
  })

  test('chart card with headline and trend', () => {
    render(renderCard('', [], '', mockChartRowCardWithChartHeadlineAndTrendCard))

    // Heading and description
    const article = screen.getByRole('article', { name: 'Chart heading 1' })
    expect(within(article).getByText('Mocked percentage number')).toBeInTheDocument()
    expect(within(article).getByText('Mocked headline number')).toBeInTheDocument()
    expect(within(article).getByText('Mocked trend number')).toBeInTheDocument()
  })

  test('chart card in a full width column', () => {
    render(renderCard('', [], '', mockChartRowCardWithSingleChartCard))
    const article = screen.getByRole('article', { name: 'Chart heading 1' })
    expect(article.parentElement).toHaveClass('lg:w-full')
  })

  test('chart cards in two columns', () => {
    render(renderCard('', [], '', mockChartRowCardWithDualChartCard))
    const article1 = screen.getByRole('article', { name: 'Chart heading 1' })
    const article2 = screen.getByRole('article', { name: 'Chart heading 2' })
    expect(article1.parentElement).toHaveClass('lg:w-1/2')
    expect(article2.parentElement).toHaveClass('lg:w-1/2')
  })

  test('if more than 3 cards are provided then expect "Show More" link to be present', () => {
    const mockGetShowMoreURL = getShowMoreURL as jest.MockedFunction<typeof getShowMoreURL>
    mockGetShowMoreURL.mockImplementation((sections, heading) => `/mock-url/${heading}`)
    render(renderCard('', [], '', mockChartCardSectionWithSixCards))
    const showMoreButton = screen.getByRole('link', { name: 'Show More' })
    expect(showMoreButton).toBeInTheDocument()
  })
})

// describe('Chart card section (Simplified chart)', () => {})

// describe('Weather health alert card', () => {
//   test('heat health alerts card', () => {
//     render(renderCard(mockWeatherHealthAlertCard))
//     expect(screen.getByRole('heading', { level: 3, name: 'Heat health alerts' }))
//   })
// })

describe('Metrics', () => {
  test('percentage number', () => {
    render(
      renderBlock({
        type: 'percentage_number',
        value: {
          topic: 'COVID-19',
          metric: 'COVID-19_headline_positivity_latest',
          body: 'Virus tests positivity',
        },
        id: '36746bcd-1dce-4e5e-81f8-60c8b9994540',
        date_prefix: '',
      })
    )
    expect(screen.getByText('Mocked percentage number')).toBeInTheDocument()
  })

  test('headline number', () => {
    render(
      renderBlock({
        type: 'headline_number',
        value: {
          topic: 'COVID-19',
          metric: 'COVID-19_headline_totalvaccines_spring23',
          body: 'Autumn booster',
        },
        id: 'ae3344f7-5b23-4977-bea9-2e1ccd84eb50',
        date_prefix: '',
      })
    )
    expect(screen.getByText('Mocked headline number')).toBeInTheDocument()
  })

  test('trend number', () => {
    render(
      renderBlock({
        type: 'trend_number',
        value: {
          topic: 'COVID-19',
          metric: 'COVID-19_headline_newcases_7daychange',
          body: '',
          percentage_metric: 'COVID-19_headline_newcases_7daypercentchange',
        },
        id: '8c42a86e-f675-41d0-a65a-633c20ac98e3',
        date_prefix: '',
      })
    )
    expect(screen.getByText('Mocked trend number')).toBeInTheDocument()
  })
})

describe('Composite block', () => {
  test('composite with text block', () => {
    render(
      renderCompositeBlock({
        type: 'text',
        value: 'text test content',
        id: '2df8361c-12f4-40d3-aa01-ce2c68a24d04',
      })
    )
    expect(screen.getByText('Mocked richtext component')).toBeInTheDocument()
  })

  test('internal button', () => {
    render(
      renderCompositeBlock({
        type: 'internal_button',
        value: {
          text: 'download (zip)',
          button_type: 'BULK_DOWNLOAD',
          endpoint: '/api/bulkdownloads/v1',
          method: 'POST',
        },
        id: '3b750f69-d66f-40e7-aaa4-f67289ec4bde',
      })
    )
    expect(screen.getByText('Mocked internal download button')).toBeInTheDocument()
  })

  test('external button', () => {
    render(
      renderCompositeBlock({
        type: 'external_button',
        value: {
          text: 'Download',
          url: 'http://mockurl/an/external/asset.zip',
          button_type: 'primary',
          icon: '',
        },
        id: 'f7631790-5fcf-48c7-8186-dc36050f4d32',
      })
    )
    expect(screen.getByText('Mocked external download button')).toBeInTheDocument()
  })

  test('code block', () => {
    render(
      renderCompositeBlock({
        type: 'code_block',
        value: {
          heading: 'code block example',
          content: [
            {
              id: '8fec603a-fc71-4081-b7f6-8d278180ebbd',
              type: 'code_snippet',
              value: {
                language: 'javascript',
                code: 'const test = "example";',
              },
            },
          ],
        },
        id: 'f7631790-5fcf-48c7-8186-dc36050f4d32',
      })
    )
    expect(screen.getByText('Mocked code block')).toBeInTheDocument()
  })

  test('Internal page links', () => {
    render(
      renderCompositeBlock({
        type: 'internal_page_links',
        value: [
          {
            type: 'page_link',
            value: {
              title: 'COVID-19',
              sub_title: 'COVID-19 is a respiratory infection caused by the SARS-CoV-2-virus.',
              page: 'http://localhost:3000/topics/covid-19/',
            },
            id: 'c36d19c1-3a5e-4fcf-b696-91468c609369',
          },
        ],
        id: '99c01f1d-0280-4cf4-bd96-39543a6c1ac9',
      })
    )
    expect(screen.getByRole('link', { name: 'COVID-19' })).toBeInTheDocument()
    expect(screen.getByText('COVID-19 is a respiratory infection caused by the SARS-CoV-2-virus.')).toBeInTheDocument()
  })
})
