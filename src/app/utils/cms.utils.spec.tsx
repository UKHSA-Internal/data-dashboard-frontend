import { render, screen, within } from '@testing-library/react'

import {
  mockChartRowCardWithChartHeadlineAndTrendCard,
  mockChartRowCardWithDualChartCard,
  mockChartRowCardWithSingleChartCard,
  mockSection,
  mockSectionWithCard,
  mockSectionWithLongHeading,
  mockTextCard,
} from './__mocks__/cms'
import { renderCard, renderSection } from './cms.utils'

jest.mock('../components/cms', () => ({
  ...jest.requireActual('../components/cms'),
  Timestamp: () => <div>Up to and including 27 September 2023</div>,
  Download: () => <div>Mocked download</div>,
  Table: () => <div>Mocked table</div>,
  Chart: () => <div>Mocked chart</div>,
  Percentage: () => <div>Mocked percentage number</div>,
  Headline: () => <div>Mocked headline number</div>,
  Trend: () => <div>Mocked trend number</div>,
}))

describe('Displaying a section from the cms home page', () => {
  test('renders a heading that links to the topic page', () => {
    render(renderSection(mockSection))
    expect(screen.getByRole('heading', { level: 2, name: 'COVID-19' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'COVID-19' })).toHaveAttribute('href', '/topics/covid-19')

    render(renderSection(mockSectionWithLongHeading))
    expect(screen.getByRole('heading', { level: 2, name: 'Other respiratory viruses' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Other respiratory viruses' })).toHaveAttribute(
      'href',
      '/topics/other-respiratory-viruses'
    )
  })

  test('renders a card', () => {
    render(renderSection(mockSectionWithCard))
    expect(screen.getByText('This is some cms content')).toBeInTheDocument()
  })
})

describe('Text card', () => {
  test('text card displays correctly', () => {
    render(renderCard(mockTextCard))
    expect(screen.getByRole('heading', { level: 3, name: 'Text card heading' })).toBeInTheDocument()
    expect(screen.getByText('Text card body')).toBeInTheDocument()
  })
})

describe('Chart row card', () => {
  test('chart card displays correctly', () => {
    render(renderCard(mockChartRowCardWithSingleChartCard))

    expect(screen.getAllByRole('article')).toHaveLength(1)

    const article = screen.getByRole('article', { name: 'Chart heading 1' })
    expect(article).toBeInTheDocument()

    // Heading and description
    expect(within(article).getByRole('heading', { level: 3, name: 'Chart heading 1' })).toBeInTheDocument()
    expect(within(article).getByText('Chart description 1')).toBeInTheDocument()
    expect(within(article).getByText('Up to and including 27 September 2023')).toBeInTheDocument()

    // Tabs list
    expect(screen.getByRole('tablist')).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Chart' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tab', { name: 'Tabular data' })).toHaveAttribute('aria-selected', 'false')
    expect(screen.getByRole('tab', { name: 'Download' })).toHaveAttribute('aria-selected', 'false')

    // Tabs panel
    expect(screen.getByRole('tabpanel', { name: 'Chart' })).toHaveAttribute('data-state', 'active')
    expect(screen.getByRole('tabpanel', { name: 'Tabular data' })).toHaveAttribute('data-state', 'inactive')
    expect(screen.getByRole('tabpanel', { name: 'Download' })).toHaveAttribute('data-state', 'inactive')

    // Chart
    expect(screen.getByText('Mocked chart')).toBeVisible()
  })

  test('chart card with headline and trend', () => {
    render(renderCard(mockChartRowCardWithChartHeadlineAndTrendCard))

    // Heading and description
    const article = screen.getByRole('article', { name: 'Chart heading 1' })
    expect(within(article).getByText('Mocked percentage number')).toBeInTheDocument()
    expect(within(article).getByText('Mocked headline number')).toBeInTheDocument()
    expect(within(article).getByText('Mocked trend number')).toBeInTheDocument()
  })

  test('chart card in a full width column', () => {
    render(renderCard(mockChartRowCardWithSingleChartCard))
    const article = screen.getByRole('article', { name: 'Chart heading 1' })
    expect(article.parentElement).toHaveClass('lg:w-full')
  })

  test('chart cards in two columns', () => {
    render(renderCard(mockChartRowCardWithDualChartCard))
    const article1 = screen.getByRole('article', { name: 'Chart heading 1' })
    const article2 = screen.getByRole('article', { name: 'Chart heading 2' })
    expect(article1.parentElement).toHaveClass('lg:w-1/2')
    expect(article2.parentElement).toHaveClass('lg:w-1/2')
  })
})

// TODO - Add unit test for headline numbers row card
// describe.skip('Headline numbers row card', () => {})

// TODO - Add unit tests for renderCard and renderBlock functions
