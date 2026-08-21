import { ACKNOWLEDGEMENT_STORAGE_KEY } from '@/app/utils/acknowledgement.utils'
import { render, screen, waitFor } from '@/config/test-utils'

import { AcknowledgementRouteGuard } from './AcknowledgementRouteGuard'

const mockReplace = jest.fn()
let mockPathname = '/'
let mockSearchParams = new URLSearchParams()

jest.mock('next/navigation', () => ({
  usePathname: () => mockPathname,
  useRouter: () => ({ replace: mockReplace }),
  useSearchParams: () => mockSearchParams,
}))

function setAcceptedAcknowledgementMarker() {
  localStorage.setItem(
    ACKNOWLEDGEMENT_STORAGE_KEY,
    JSON.stringify({
      accepted: true,
      acceptedAt: '2026-07-28T12:00:00.000Z',
    })
  )
}

function renderGuard(isAuthenticated: boolean) {
  return render(
    <AcknowledgementRouteGuard isAuthenticated={isAuthenticated}>
      <div>Guarded content</div>
    </AcknowledgementRouteGuard>
  )
}

describe('AcknowledgementRouteGuard', () => {
  beforeEach(() => {
    localStorage.clear()
    mockReplace.mockClear()
    mockPathname = '/'
    mockSearchParams = new URLSearchParams()
  })

  it('redirects logged-out users away from the acknowledgement page', async () => {
    mockPathname = '/acknowledgement'

    renderGuard(false)

    expect(screen.queryByText('Guarded content')).not.toBeInTheDocument()
    await waitFor(() => expect(mockReplace).toHaveBeenCalledWith('/start'))
  })

  it('keeps existing logged-out behaviour for non-acknowledgement routes', () => {
    mockPathname = '/respiratory-viruses/covid-19'

    renderGuard(false)

    expect(screen.getByText('Guarded content')).toBeInTheDocument()
    expect(mockReplace).not.toHaveBeenCalled()
  })

  it('redirects authenticated users without a marker from private routes to acknowledgement with returnTo', async () => {
    mockPathname = '/respiratory-viruses/covid-19'
    mockSearchParams = new URLSearchParams({ areaType: 'Nation' })

    renderGuard(true)

    expect(screen.queryByText('Guarded content')).not.toBeInTheDocument()
    await waitFor(() =>
      expect(mockReplace).toHaveBeenCalledWith(
        '/acknowledgement?returnTo=%2Frespiratory-viruses%2Fcovid-19%3FareaType%3DNation'
      )
    )
  })

  it('renders private routes for authenticated users with a marker', () => {
    setAcceptedAcknowledgementMarker()
    mockPathname = '/respiratory-viruses/covid-19'

    renderGuard(true)

    expect(screen.getByText('Guarded content')).toBeInTheDocument()
    expect(mockReplace).not.toHaveBeenCalled()
  })

  it('renders the acknowledgement page fot authenticated users without a marker', () => {
    mockPathname = '/acknowledgement'

    renderGuard(true)

    expect(screen.getByText('Guarded content')).toBeInTheDocument()
    expect(mockReplace).not.toHaveBeenCalled()
  })

  it('redirects authenticated users with a marker away from acknowledgement to private home', async () => {
    setAcceptedAcknowledgementMarker()
    mockPathname = '/acknowledgement'

    renderGuard(true)

    expect(screen.queryByText('Guarded content')).not.toBeInTheDocument()
    await waitFor(() => expect(mockReplace).toHaveBeenCalledWith('/'))
  })

  it('redirects authenticated users with a marker away from start to private home', async () => {
    setAcceptedAcknowledgementMarker()
    mockPathname = '/start'

    renderGuard(true)

    expect(screen.queryByText('Guarded content')).not.toBeInTheDocument()
    await waitFor(() => expect(mockReplace).toHaveBeenCalledWith('/'))
  })

  it('redirects authenticated users without a marker from start to acknowledgement', async () => {
    mockPathname = '/start'

    renderGuard(true)

    expect(screen.queryByText('Guarded content')).not.toBeInTheDocument()
    await waitFor(() => expect(mockReplace).toHaveBeenCalledWith('/acknowledgement'))
  })

  it('allows authenticated users to access non-start auth routes without requiring acknowledgement', () => {
    mockPathname = '/auth/signout'

    renderGuard(true)

    expect(screen.getByText('Guarded content')).toBeInTheDocument()
    expect(mockReplace).not.toHaveBeenCalled()
  })
})
