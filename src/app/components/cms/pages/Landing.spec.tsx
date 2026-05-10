import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { getLandingPage } from '@/app/utils/cms'
import { renderSection } from '@/app/utils/cms.utils'
import { render, screen } from '@/config/test-utils'

import LandingPage from './Landing'

jest.mock('@/api/requests/getPageBySlug', () => ({
  getPageBySlug: jest.fn(),
}))

jest.mock('@/app/utils/cms', () => ({
  getLandingPage: jest.fn(),
}))

jest.mock('@/app/utils/cms.utils', () => ({
  renderSection: jest.fn(),
}))

jest.mock('@/app/components/ui/ukhsa', () => ({
  View: ({ children }: { children: React.ReactNode }) => <div data-testid="view">{children}</div>,
  Announcements: ({ announcements }: { announcements: unknown[] }) => (
    <div data-testid="announcements">Announcements: {announcements.length}</div>
  ),
}))

jest.mock('@/app/components/ui/ukhsa/View/Heading/Heading', () => ({
  Heading: ({ heading }: { heading: string }) => <h1>{heading}</h1>,
}))

jest.mock('@/app/components/ui/ukhsa/View/LastUpdated/LastUpdated', () => ({
  LastUpdated: ({ lastUpdated }: { lastUpdated: string }) => <p>Last updated: {lastUpdated}</p>,
}))

jest.mock('@/app/components/ui/ukhsa/View/Description/Description', () => ({
  Description: ({ description }: { description: string }) => <div>{description}</div>,
}))

jest.mock('@/app/components/ui/ukhsa/RelatedLinks/RelatedLinksWrapper', () => ({
  RelatedLinksWrapper: ({ layout, links }: { layout: string; links: unknown[] }) => (
    <aside data-testid={`related-links-${layout.toLowerCase()}`}>Related links: {links.length}</aside>
  ),
}))

const mockedGetLandingPage = jest.mocked(getLandingPage)
const mockedGetPageBySlug = jest.mocked(getPageBySlug)
const mockedRenderSection = jest.mocked(renderSection)

const defaultHealthTopic = [
  {
    type: 'health_topic' as const,
    id: 'health-topic-block',
    value: { heading: 'Health topics', page: 'health-topics' },
  },
]
type RenderSectionArgs = Parameters<typeof renderSection>

const landingBody = [
  {
    id: 'section-1',
    type: 'section' as const,
    value: {
      heading: 'Popular topics',
      page_link: null,
      content: [],
    },
  },
  {
    id: 'section-2',
    type: 'section' as const,
    value: {
      heading: 'Current outbreaks',
      page_link: null,
      content: [],
    },
  },
]

beforeEach(() => {
  jest.clearAllMocks()

  mockedGetPageBySlug.mockResolvedValue({ body: [] } as never)

  mockedRenderSection.mockImplementation(((_: RenderSectionArgs[0], section: RenderSectionArgs[1]) => (
    <section key={section.id}>{section.value.heading}</section>
  )) as unknown as typeof renderSection)
})

describe('LandingPage', () => {
  test('renders heading intro content from landing CMS fields', async () => {
    mockedGetLandingPage.mockResolvedValue({
      title: 'About the UKHSA data dashboard',
      body: landingBody,
      page_description: '<p>this is another page description</p>',
      related_links_layout: 'Sidebar',
      related_links: [],
      last_published_at: '2026-03-05T15:36:08.726625Z',
      active_announcements: [],
      health_topic: defaultHealthTopic,
    } as never)

    render(await LandingPage({ slug: [], searchParams: {} }))

    expect(screen.getByRole('heading', { level: 1, name: 'About the UKHSA data dashboard' })).toBeInTheDocument()
    expect(screen.getByText('<p>this is another page description</p>')).toBeInTheDocument()
  })

  test('shows related links beside heading for Sidebar layout', async () => {
    mockedGetLandingPage.mockResolvedValue({
      title: 'Landing page',
      body: landingBody,
      page_description: '<p>Description</p>',
      related_links_layout: 'Sidebar',
      related_links: [{ id: 1, title: 'Link 1', url: 'https://example.com', meta: { type: 'x' }, body: '<p>x</p>' }],
      last_published_at: '2026-03-05T15:36:08.726625Z',
      active_announcements: [],
      health_topic: defaultHealthTopic,
    } as never)

    render(await LandingPage({ slug: [], searchParams: {} }))

    expect(screen.getByTestId('related-links-sidebar')).toBeInTheDocument()
    expect(screen.queryByTestId('related-links-footer')).not.toBeInTheDocument()
  })

  test('shows related links in footer for Footer layout', async () => {
    mockedGetLandingPage.mockResolvedValue({
      title: 'Landing page',
      body: landingBody,
      page_description: '<p>Description</p>',
      related_links_layout: 'Footer',
      related_links: [{ id: 1, title: 'Link 1', url: 'https://example.com', meta: { type: 'x' }, body: '<p>x</p>' }],
      last_published_at: '2026-03-05T15:36:08.726625Z',
      active_announcements: [],
      health_topic: defaultHealthTopic,
    } as never)

    render(await LandingPage({ slug: [], searchParams: {} }))

    expect(screen.getByTestId('related-links-footer')).toBeInTheDocument()
    expect(screen.queryByTestId('related-links-sidebar')).not.toBeInTheDocument()
  })

  test('renders contents links for landing sections', async () => {
    mockedGetLandingPage.mockResolvedValue({
      title: 'Landing page',
      body: landingBody,
      page_description: '<p>Description</p>',
      related_links_layout: 'Sidebar',
      related_links: [],
      last_published_at: '2026-03-05T15:36:08.726625Z',
      active_announcements: [],
      health_topic: defaultHealthTopic,
    } as never)

    render(await LandingPage({ slug: [], searchParams: {} }))

    expect(screen.getByRole('link', { name: 'Popular topics' })).toHaveAttribute('href', '#popular-topics')
    expect(screen.getByRole('link', { name: 'Current outbreaks' })).toHaveAttribute('href', '#current-outbreaks')
  })

  test('passes section query params to renderSection in lowercase', async () => {
    mockedGetLandingPage.mockResolvedValue({
      title: 'Landing page',
      body: landingBody,
      page_description: '<p>Description</p>',
      related_links_layout: 'Sidebar',
      related_links: [],
      last_published_at: '2026-03-05T15:36:08.726625Z',
      active_announcements: [],
      health_topic: defaultHealthTopic,
    } as never)

    render(
      await LandingPage({
        slug: [],
        searchParams: { section: 'Current-Outbreaks' },
      })
    )

    expect(mockedRenderSection).toHaveBeenCalledTimes(landingBody.length)
    expect(mockedRenderSection).toHaveBeenNthCalledWith(1, ['current-outbreaks'], landingBody[0], true)
    expect(mockedRenderSection).toHaveBeenNthCalledWith(2, ['current-outbreaks'], landingBody[1], true)
  })
})
