import { ComponentProps } from 'react'
import { z } from 'zod'

import { CardTypes } from '@/api/models/cms/Page'
import { getShowMoreURL } from '@/app/utils/show-more.utils'
import { render, screen } from '@/config/test-utils'

import { ChartRowCardHeader } from '../components/ui/ukhsa'
import {
  mockChartCardSectionWithSixCards,
  mockSectionNoLink,
  mockSectionWithCard,
  mockSectionWithLink,
  mockSectionWithLongHeading,
} from './__mocks__/cms'
import { renderBlock, renderCard, renderCompositeBlock, renderSection } from './cms.utils'

jest.mock('@/app/components/ui/ukhsa/FilterLinkedCards/TimeSeriesFilterCardsContainer', () => ({
  TimeSeriesFilterCardsContainer: () => <div>Mocked time series filter cards container</div>,
}))

jest.mock('@/app/components/ui/ukhsa/FilterLinkedCards/SubplotFilterCardContainer', () => ({
  SubplotFilterCardContainer: () => <div>Mocked subplot filter card container</div>,
}))

jest.mock('@/app/components/ui/ukhsa', () => ({
  ...jest.requireActual('@/app/components/ui/ukhsa'),
  Chart: () => <div>Mocked chart</div>,
}))
// This is an ugly hack because Jest currently cannot render nested server components. As a result we must
// stub these components in order to test the functionality within cms.utils.tsx
jest.mock('../components/cms', () => ({
  ...jest.requireActual('../components/cms'),
  Timestamp: () => <div>Up to and including 27 September 2023</div>,
  Download: () => <div>Mocked download</div>,
  About: () => <div>Mocked About</div>,
  Table: () => <div>Mocked table</div>,
  Chart: () => <div>Mocked chart</div>,
  MapCardWrapper: () => <div>Mocked Map</div>,
  Percentage: () => <div>Mocked percentage number</div>,
  Headline: () => <div>Mocked headline number</div>,
  Trend: () => <div>Mocked trend number</div>,
  RichText: ({ children }: { children: string }) => <div>{children}</div>,
  ChartRowCardHeader: ({ title, description, children, id }: ComponentProps<typeof ChartRowCardHeader>) => (
    <header>
      <h3 id={`chart-row-card-heading-${id}`}>{title}</h3>
      <p>{description}</p>
      {children}
    </header>
  ),
  ButtonExternal: () => <div>Mocked external download button</div>,
  ButtonInternal: () => <div>Mocked internal download button</div>,
  CodeBlock: () => <div>Mocked code block</div>,
}))
//Mock the getShowLessURL and getShowMoreURL
jest.mock('@/app/utils/show-more.utils', () => ({
  getShowMoreURL: jest.fn(),
  getShowLessURL: jest.fn(),
}))

jest.mock('@/app/hooks/getSearchParams', () => ({
  getSearchParams: jest.fn(() => new URL('http://localhost').searchParams),
}))

jest.mock('@/app/i18n', () => ({
  getServerTranslation: jest.fn(() =>
    Promise.resolve({
      t: jest.fn((key: string) => key),
      i18n: {},
    })
  ),
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

describe('renderCard function', () => {
  test('renders different card types correctly', () => {
    // Test that renderCard can handle different card types
    const textCard: z.infer<typeof CardTypes> = {
      id: 'test-id',
      type: 'text_card',
      value: { body: 'Test content' },
    }

    render(renderCard('Test heading', [], '', textCard))
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  test('if more than 3 cards are provided then expect "Show More" link to be present', () => {
    const mockGetShowMoreURL = getShowMoreURL as jest.MockedFunction<typeof getShowMoreURL>
    mockGetShowMoreURL.mockImplementation((sections, heading) => `/mock-url/${heading}`)
    render(renderCard('', [], '', mockChartCardSectionWithSixCards))
    const showMoreButton = screen.getByRole('link', { name: 'Show More' })
    expect(showMoreButton).toBeInTheDocument()
  })
})

describe('renderBlock function', () => {
  test('renders different block types correctly', () => {
    // Test percentage number
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
})

describe('renderCompositeBlock function', () => {
  test('renders different composite block types correctly', () => {
    // Test text block
    const textValue = 'text test content'
    render(
      renderCompositeBlock({
        type: 'text',
        value: textValue,
        id: '2df8361c-12f4-40d3-aa01-ce2c68a24d04',
      })
    )
    expect(screen.getByText(textValue)).toBeInTheDocument()
  })

  test('renders internal page links correctly', () => {
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
