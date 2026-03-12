// @ts-nocheck
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { getServerTranslation } from '@/app/i18n'
import { render, screen } from '@/config/test-utils'

import AuthError from './AuthError'

jest.mock('@/api/requests/getPageBySlug')
jest.mock('@/app/i18n')
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>,
}))

jest.mock('@/app/components/ui/ukhsa', () => ({
  Announcements: ({ announcements }: { announcements: unknown[] }) => (
    <div data-testid="announcements">{announcements.length} announcements</div>
  ),
  View: ({ children }: { children: React.ReactNode }) => <div data-testid="view">{children}</div>,
}))

jest.mock('@/app/components/ui/ukhsa/RelatedLinks/RelatedLinksWrapper', () => ({
  RelatedLinksWrapper: ({ layout, links }: { layout: string; links: unknown[] }) => (
    <div data-testid={`related-links-${layout.toLowerCase()}`}>{links.length} related links</div>
  ),
}))

jest.mock('@/app/components/ui/ukhsa/View/Heading/Heading', () => ({
  Heading: ({ heading }: { heading: string }) => <h1 data-testid="heading">{heading}</h1>,
}))

jest.mock('../RichText/RichText', () => ({
  RichText: ({ children, className }: { children: string; className?: string }) => (
    <div data-testid="rich-text" className={className}>
      {children}
    </div>
  ),
}))

describe('AuthError', () => {
  const mockPageData = {
    title: 'Authentication Error',
    error_line: 'There was a problem with your authentication',
    error_text: 'You do not have permission to access this resource.',
    sub_text: 'Please contact your administrator if you believe this is an error.',
    related_links: [
      { id: '1', title: 'Help', url: '/help' },
      { id: '2', title: 'Support', url: '/support' },
    ],
    related_links_layout: 'Sidebar',
    active_announcements: [{ id: '1', message: 'System maintenance scheduled' }],
  }

  const mockTranslation = {
    t: jest.fn((key: string) => {
      const translations: Record<string, string> = {
        backButtonText: 'Go back to start',
      }
      return translations[key] || key
    }),
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(getPageBySlug as jest.Mock).mockResolvedValue(mockPageData)
    ;(getServerTranslation as jest.Mock).mockResolvedValue(mockTranslation)
  })

  test('renders the error page with correct title and error line', async () => {
    const component = await AuthError({ slug: 'auth-error' })
    const { container } = render(component)

    expect(screen.getByTestId('heading')).toHaveTextContent('Authentication Error')
    expect(container.querySelector('.text-red')).toHaveTextContent('There was a problem with your authentication')
  })

  test('fetches page data using the correct slug', async () => {
    await AuthError({ slug: 'custom-error-slug' })

    expect(getPageBySlug).toHaveBeenCalledWith('custom-error-slug')
  })

  test('renders error text content in RichText component', async () => {
    const component = await AuthError({ slug: 'auth-error' })
    render(component)

    const richTextElements = screen.getAllByTestId('rich-text')
    expect(richTextElements[0]).toHaveTextContent('You do not have permission to access this resource.')
  })

  test('renders sub text content in RichText component with correct styling', async () => {
    const component = await AuthError({ slug: 'auth-error' })
    render(component)

    const richTextElements = screen.getAllByTestId('rich-text')
    const subTextElement = richTextElements.find((el) => el.classList.contains('mt-6'))

    expect(subTextElement).toHaveTextContent('Please contact your administrator if you believe this is an error.')
  })

  test('renders back button with translated text', async () => {
    const component = await AuthError({ slug: 'auth-error' })
    const { container } = render(component)

    const backLink = container.querySelector('a[href="/start"]')
    expect(backLink).toBeInTheDocument()
    expect(backLink).toHaveTextContent('Go back to start')
  })

  test('loads translations with correct namespace', async () => {
    await AuthError({ slug: 'auth-error' })

    expect(getServerTranslation).toHaveBeenCalledWith('auth')
  })

  test('renders announcements component with active announcements', async () => {
    const component = await AuthError({ slug: 'auth-error' })
    render(component)

    expect(screen.getByTestId('announcements')).toHaveTextContent('1 announcements')
  })

  test('renders related links in sidebar when layout is Sidebar', async () => {
    const component = await AuthError({ slug: 'auth-error' })
    render(component)

    expect(screen.getByTestId('related-links-sidebar')).toBeInTheDocument()
    expect(screen.getByTestId('related-links-sidebar')).toHaveTextContent('2 related links')
    expect(screen.queryByTestId('related-links-footer')).not.toBeInTheDocument()
  })

  test('renders related links in footer when layout is Footer', async () => {
    ;(getPageBySlug as jest.Mock).mockResolvedValue({
      ...mockPageData,
      related_links_layout: 'Footer',
    })

    const component = await AuthError({ slug: 'auth-error' })
    render(component)

    expect(screen.getByTestId('related-links-footer')).toBeInTheDocument()
    expect(screen.queryByTestId('related-links-sidebar')).not.toBeInTheDocument()
  })

  test('does not render related links when layout is neither Sidebar nor Footer', async () => {
    ;(getPageBySlug as jest.Mock).mockResolvedValue({
      ...mockPageData,
      related_links_layout: 'None',
    })

    const component = await AuthError({ slug: 'auth-error' })
    render(component)

    expect(screen.queryByTestId('related-links-sidebar')).not.toBeInTheDocument()
    expect(screen.queryByTestId('related-links-footer')).not.toBeInTheDocument()
  })

  test('renders error border styling correctly', async () => {
    const component = await AuthError({ slug: 'auth-error' })
    const { container } = render(component)

    const errorBorder = container.querySelector('.border-l-\\[9px\\].border-l-red.pl-9')
    expect(errorBorder).toBeInTheDocument()
  })

  test('renders back button with correct SVG icon', async () => {
    const component = await AuthError({ slug: 'auth-error' })
    const { container } = render(component)

    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('width', '20')
    expect(svg).toHaveAttribute('height', '20')
  })

  test('wraps content in View component', async () => {
    const component = await AuthError({ slug: 'auth-error' })
    render(component)

    expect(screen.getByTestId('view')).toBeInTheDocument()
  })

  test('handles empty announcements array', async () => {
    ;(getPageBySlug as jest.Mock).mockResolvedValue({
      ...mockPageData,
      active_announcements: [],
    })

    const component = await AuthError({ slug: 'auth-error' })
    render(component)

    expect(screen.getByTestId('announcements')).toHaveTextContent('0 announcements')
  })

  test('handles empty related links array', async () => {
    ;(getPageBySlug as jest.Mock).mockResolvedValue({
      ...mockPageData,
      related_links: [],
      related_links_layout: 'Sidebar',
    })

    const component = await AuthError({ slug: 'auth-error' })
    render(component)

    expect(screen.getByTestId('related-links-sidebar')).toHaveTextContent('0 related links')
  })
})
