import type { Body } from '@/api/models/cms/Page/Body'
import { PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { getServerTranslation } from '@/app/i18n'
import { renderSection } from '@/app/utils/cms.utils'
import { fireEvent, render, screen, waitFor } from '@/config/test-utils'

import TopicsListPage, { getFilterItemsFromBody } from './TopicsList'

jest.mock('@/api/requests/getPageBySlug', () => ({ getPageBySlug: jest.fn() }))
jest.mock('@/app/i18n', () => ({ getServerTranslation: jest.fn() }))
jest.mock('@/app/utils/cms.utils', () => ({ renderSection: jest.fn() }))

jest.mock('@/app/components/ui/ukhsa', () => ({
  View: ({ children }: { children: React.ReactNode }) => <div data-testid="view">{children}</div>,
  Announcements: ({ announcements }: { announcements: unknown[] }) => (
    <div data-testid="announcements">{announcements.length}</div>
  ),
}))

jest.mock('@/app/components/ui/ukhsa/View/Heading/Heading', () => ({
  Heading: ({ heading }: { heading: string }) => <h1>{heading}</h1>,
}))

jest.mock('@/app/components/ui/ukhsa/View/LastUpdated/LastUpdated', () => ({
  LastUpdated: ({ lastUpdated }: { lastUpdated: string }) => <p>Last updated: {lastUpdated}</p>,
}))

jest.mock('@/app/components/ui/ukhsa/View/Description/Description', () => ({
  Description: ({ description }: { description: string }) => <div data-testid="page-description">{description}</div>,
}))

const mockedGetPageBySlug = jest.mocked(getPageBySlug)
const mockedGetServerTranslation = jest.mocked(getServerTranslation)
const mockedRenderSection = jest.mocked(renderSection)

type RenderSectionArgs = Parameters<typeof renderSection>

const topicsListBody = [
  {
    id: 'section-1',
    type: 'section' as const,
    value: {
      heading: 'Current topics',
      page_link: null,
      content: [
        { type: 'text' as const, id: 'noise', value: { body: '' } },
        {
          type: 'chart_card_section' as const,
          id: 'chart-block-1',
          value: {
            cards: [
              { type: 'chart_with_description_card' as const, id: 'topic-a', value: { title: 'Alpha' } },
              { type: 'chart_with_description_card' as const, value: { title: '' } },
            ],
          },
        },
      ],
    },
  },
  {
    id: 'section-2',
    type: 'section' as const,
    value: {
      heading: 'Other section',
      page_link: null,
      content: [
        {
          type: 'chart_card_section' as const,
          id: 'chart-block-2',
          value: {
            cards: [{ type: 'chart_with_description_card' as const, id: 'topic-b', value: { title: 'Beta' } }],
          },
        },
      ],
    },
  },
] as unknown as Body

beforeEach(() => {
  jest.clearAllMocks()

  mockedGetServerTranslation.mockResolvedValue({
    t: jest.fn((key: string, opts?: { title?: string }) => (key === 'pageTitle' && opts?.title ? opts.title : key)),
  } as never)

  mockedGetPageBySlug.mockResolvedValue({
    title: 'Health topics',
    body: topicsListBody,
    page_description: '<p>Index</p>',
    last_updated_at: '2026-03-04T20:45:22.913156Z',
    active_announcements: [],
  } as never)

  mockedRenderSection.mockImplementation(((_: RenderSectionArgs[0], section: RenderSectionArgs[1]) => {
    type MockCard = { id?: string; type: string; value?: { title?: string } }
    type MockBlock = { type: string; value?: { cards?: MockCard[] } }
    const sectionKey = String(section.id ?? section.value.heading ?? '')
    const cards = ((section.value.content ?? []) as MockBlock[])
      .filter((b) => b.type === 'chart_card_section')
      .flatMap((b) => b.value?.cards?.filter((c) => c.type === 'chart_with_description_card') ?? [])

    return (
      <div key={section.id} data-topics-list-section-key={sectionKey} role="region" aria-label={section.value.heading}>
        <h2>{section.value.heading}</h2>
        {cards.map((card) => {
          const filterId = card.id ?? card.value?.title ?? ''
          return (
            <div key={filterId} data-topic-filter-id={filterId}>
              {card.value?.title}
            </div>
          )
        })}
      </div>
    )
  }) as unknown as typeof renderSection)
})

describe('getFilterItemsFromBody', () => {
  test('builds filter groups from chart cards and skips empty titles', () => {
    expect(getFilterItemsFromBody(topicsListBody)).toEqual([
      { id: 'section-1', label: 'Current topics', children: [{ id: 'topic-a', label: 'Alpha' }] },
      { id: 'section-2', label: 'Other section', children: [{ id: 'topic-b', label: 'Beta' }] },
    ])
    expect(getFilterItemsFromBody([] as unknown as Body)).toEqual([])

    const noIdsBody = [
      {
        type: 'section' as const,
        value: {
          heading: 'No id section',
          page_link: null,
          content: [
            {
              type: 'chart_card_section' as const,
              value: {
                cards: [{ type: 'chart_with_description_card' as const, value: { title: 'Leaf' } }],
              },
            },
          ],
        },
      },
    ] as unknown as Body
    expect(getFilterItemsFromBody(noIdsBody)).toEqual([
      { id: 'No id section', label: 'No id section', children: [{ id: 'Leaf', label: 'Leaf' }] },
    ])
  })
})

describe('TopicsListPage', () => {
  test('loads page with topics list type', async () => {
    await TopicsListPage({ slug: ['health-topics'], searchParams: {} })
    expect(mockedGetPageBySlug).toHaveBeenCalledWith(['health-topics'], { type: PageType.TopicsList })
  })

  test('renders page shell and body sections', async () => {
    render(await TopicsListPage({ slug: ['health-topics'], searchParams: {} }))

    expect(screen.getByRole('heading', { level: 1, name: 'Health topics' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: 'Current topics' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: 'Other section' })).toBeInTheDocument()
    expect(mockedRenderSection).toHaveBeenCalledTimes(2)
  })

  test('selecting a topic hides the other section', async () => {
    render(await TopicsListPage({ slug: ['health-topics'], searchParams: {} }))

    const section2 = document.querySelector('[data-topics-list-section-key="section-2"]') as HTMLElement

    fireEvent.click(screen.getByRole('button', { name: 'Select themes or topics to view' }))
    fireEvent.click(screen.getAllByTitle('Expand')[0]!)
    fireEvent.click(screen.getByLabelText('Alpha'))

    await waitFor(() => {
      expect(section2.style.display).toBe('none')
    })
  })

  test('omits description when not provided', async () => {
    mockedGetPageBySlug.mockResolvedValue({
      title: 'Topics',
      body: topicsListBody,
      last_updated_at: '2026-01-01T00:00:00.000000Z',
      active_announcements: [],
    } as never)

    render(await TopicsListPage({ slug: ['topics'], searchParams: {} }))

    expect(screen.queryByTestId('page-description')).not.toBeInTheDocument()
  })
})
