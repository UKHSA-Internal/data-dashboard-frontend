import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import type { z } from 'zod'

import { PopularTopicsCardValue as popularTopicsCardSchema } from '@/api/models/cms/Page/Body'
import { render, screen } from '@/config/test-utils'
import { landingPageMock } from '@/mock-server/handlers/cms/pages/fixtures/page/landing'

/** Props for the `next/link` jest mock (avoids `Record<string, unknown>` widening `children` to `unknown`). */
type NextLinkMockProps = Omit<ComponentPropsWithoutRef<'a'>, 'href'> & {
  href?: string
  prefetch?: boolean
}

jest.mock('@/app/hooks/queries/useWeatherHealthAlertList', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    isLoading: false,
    data: [
      {
        slug: 'london',
        status: 'Green',
        geography_name: 'London',
        geography_code: 'E12000007',
        refresh_date: null,
      },
    ],
  })),
}))

jest.mock('@/app/utils/cms/slug', () => ({
  getPath: jest.fn((url: string) => (url ? `/resolved-${url.replace(/^https?:\/\/[^/]*\//, '')}` : '/')),
}))

jest.mock('@/app/components/ui/ukhsa', () => ({
  Card: ({ children, asChild: _asChild, ...props }: { children?: ReactNode; asChild?: boolean }) => (
    <div data-testid="ukhsa-card" {...props}>
      {children}
    </div>
  ),
  Chart: () => <div data-testid="popular-topics-chart">Chart</div>,
}))

jest.mock('next/link', () => {
  return function MockLink({ children, href, prefetch: _prefetch, ...props }: NextLinkMockProps) {
    return (
      <a href={typeof href === 'string' ? href : '/'} {...props}>
        {children}
      </a>
    )
  }
})

jest.mock('@/app/utils/cms.utils', () => ({
  renderBlock: jest.fn(() => <div data-testid="mock-render-block" />),
}))

jest.mock('../ChartWithDescriptionCard/ChartWithDescriptionCard', () => ({
  ChartWithDescriptionCard: ({ value }: { value: { title: string } }) => (
    <div data-testid="mock-chart-with-description">{value.title}</div>
  ),
}))

import { PopularTopicsCard } from './PopularTopicsCard'

type PopularTopicsCardData = z.infer<typeof popularTopicsCardSchema>

/**
 * Loads a popular_topics_card value from the landing fixture and validates with zod.
 *
 * @param cardId - `id` of the `popular_topics_card` block in `landingPageMock`.
 */
function getPopularTopicsValue(cardId: string): PopularTopicsCardData {
  for (const section of landingPageMock.body) {
    for (const item of section.value.content) {
      if (item.type === 'popular_topics_card' && item.id === cardId) {
        const parsed = popularTopicsCardSchema.safeParse(item.value)
        if (!parsed.success) {
          throw new Error(`Invalid popular topics fixture: ${parsed.error.message}`)
        }
        return parsed.data
      }
    }
  }
  throw new Error(`popular_topics_card not found: ${cardId}`)
}

describe('PopularTopicsCard', () => {
  test('renders chart-with-description left column, right chart, and headline metric blocks', () => {
    const value = getPopularTopicsValue('9f390365-c8f2-41f5-ba48-fb1dc81b06e8')

    render(<PopularTopicsCard value={value} />)

    expect(screen.getByTestId('popular-topics-card')).toBeInTheDocument()
    expect(screen.getByTestId('mock-chart-with-description')).toHaveTextContent('Childhood vaccination coverage')
    expect(screen.getByRole('heading', { name: 'COVID-19 cases by day' })).toBeInTheDocument()
    expect(screen.getByTestId('popular-topics-chart')).toBeInTheDocument()
    expect(screen.getAllByTestId('mock-render-block').length).toBeGreaterThan(0)
    expect(screen.getByTestId('headline-metric-card-4bb7768b-57fd-4090-a70c-a29d8dce91d1')).toBeInTheDocument()
  })

  test('renders weather health alert left column with description and source', () => {
    const value = getPopularTopicsValue('7962648a-9493-463e-a9e9-067bfbdaea4d')

    render(<PopularTopicsCard value={value} />)

    expect(screen.getByTestId('popular-topics-card')).toBeInTheDocument()
    expect(screen.getByText('Cold health alerts')).toBeInTheDocument()
    expect(screen.getByText('Optional description for the weather health alerts card.')).toBeInTheDocument()
    expect(screen.getByText('Source:')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Weather alerts source' })).toHaveAttribute(
      'href',
      'https://example.org/weather-alerts'
    )
  })
})
