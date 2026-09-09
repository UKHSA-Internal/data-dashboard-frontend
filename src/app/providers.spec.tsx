import * as React from 'react'

import { render, screen } from '@/config/test-utils'

// --- Mocks ---

const mockQueryClient = {
  defaultOptions: {},
  mount: jest.fn(),
  unmount: jest.fn(),
}

jest.mock('@tanstack/react-query', () => ({
  isServer: false,
  QueryClient: jest.fn().mockImplementation(() => mockQueryClient),
  QueryClientProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="query-client-provider">{children}</div>
  ),
}))

jest.mock('@tanstack/react-query-devtools', () => ({
  ReactQueryDevtools: () => <div data-testid="react-query-devtools" />,
}))

jest.mock('@tanstack/react-query-next-experimental', () => ({
  ReactQueryStreamedHydration: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="streamed-hydration">{children}</div>
  ),
}))

jest.mock('next-auth/react', () => ({
  SessionProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="session-provider">{children}</div>
  ),
}))

jest.mock('@/app/features/Acknowledgement/AcknowledgementRouteGuard', () => ({
  AcknowledgementRouteGuard: ({
    children,
    isAuthenticated,
  }: {
    children: React.ReactNode
    isAuthenticated: boolean
  }) => (
    <div data-authenticated={String(isAuthenticated)} data-testid="acknowledgement-route-guard">
      {children}
    </div>
  ),
}))

const mockAuthEnabled = { authEnabled: false }
jest.mock('@/config/constants', () => mockAuthEnabled)

jest.mock('@/app/features/Acknowledgement/AcknowledgementRouteGuard', () => ({
  AcknowledgementRouteGuard: ({
    children,
    isAuthenticated,
  }: {
    children: React.ReactNode
    isAuthenticated: boolean
  }) => (
    <div data-authenticated={String(isAuthenticated)} data-testid="acknowledgement-route-guard">
      {children}
    </div>
  ),
}))

// --- Helpers ---

async function renderProviders({
  authEnabled = false,
  children = <div data-testid="child">hello</div>,
  isAuthenticated = false,
}: {
  authEnabled?: boolean
  children?: React.ReactNode
  isAuthenticated?: boolean
} = {}) {
  // Re-import after mock mutations
  const { Providers } = await import('./providers')
  return render(
    <Providers authEnabled={authEnabled} isAuthenticated={isAuthenticated}>
      {children}
    </Providers>
  )
}

// --- Tests ---

describe('Providers', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  describe('when authEnabled is false', () => {
    it('renders QueryClientProvider', async () => {
      await renderProviders()
      expect(screen.getByTestId('query-client-provider')).toBeInTheDocument()
    })

    it('renders ReactQueryStreamedHydration', async () => {
      await renderProviders()
      expect(screen.getByTestId('streamed-hydration')).toBeInTheDocument()
    })

    it('renders children', async () => {
      await renderProviders()
      expect(screen.getByTestId('child')).toBeInTheDocument()
    })

    it('does NOT render SessionProvider', async () => {
      await renderProviders()
      expect(screen.queryByTestId('session-provider')).not.toBeInTheDocument()
    })

    it('renders ReactQueryDevtools', async () => {
      await renderProviders()
      expect(screen.getByTestId('react-query-devtools')).toBeInTheDocument()
    })
  })

  describe('when authEnabled is true', () => {
    beforeEach(() => {
      jest.resetModules()
    })

    it('renders SessionProvider wrapping StreamedHydration', async () => {
      await renderProviders({ authEnabled: true })
      const sessionProvider = screen.getByTestId('session-provider')
      const acknowledgementRouteGuard = screen.getByTestId('acknowledgement-route-guard')
      const streamedHydration = screen.getByTestId('streamed-hydration')
      expect(sessionProvider).toBeInTheDocument()
      expect(sessionProvider).toContainElement(acknowledgementRouteGuard)
      expect(sessionProvider).toContainElement(streamedHydration)
    })

    it('passes auth state into AcknowledgementRouteGuard', async () => {
      await renderProviders({ authEnabled: true })

      expect(screen.getByTestId('acknowledgement-route-guard')).toHaveAttribute('data-authenticated', 'false')
    })

    it('passes authenticated auth state into AcknowledgementRouteGuard', async () => {
      await renderProviders({ authEnabled: true, isAuthenticated: true })

      expect(screen.getByTestId('acknowledgement-route-guard')).toHaveAttribute('data-authenticated', 'true')
    })

    it('renders children inside SessionProvider', async () => {
      await renderProviders({ authEnabled: true })
      const sessionProvider = screen.getByTestId('session-provider')
      expect(sessionProvider).toContainElement(screen.getByTestId('child'))
    })

    it('renders ReactQueryDevtools', async () => {
      await renderProviders({ authEnabled: true })
      expect(screen.getByTestId('react-query-devtools')).toBeInTheDocument()
    })
  })

  describe('QueryClient instantiation', () => {
    it('reuses the same QueryClient instance across renders on the client', async () => {
      const { QueryClient } = await import('@tanstack/react-query')
      const { Providers } = await import('./providers')

      render(
        <Providers>
          <div />
        </Providers>
      )
      render(
        <Providers>
          <div />
        </Providers>
      )

      // QueryClient constructor should only have been called once (singleton on client)
      expect(QueryClient).toHaveBeenCalledTimes(1)
    })

    it('creates a new QueryClient on each call when on the server', async () => {
      jest.resetModules()
      jest.doMock('@tanstack/react-query', () => ({
        isServer: true,
        QueryClient: jest.fn().mockImplementation(() => mockQueryClient),
        QueryClientProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
      }))
      jest.doMock('@tanstack/react-query-devtools', () => ({
        ReactQueryDevtools: () => null,
      }))
      jest.doMock('@tanstack/react-query-next-experimental', () => ({
        ReactQueryStreamedHydration: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
      }))
      jest.doMock('next-auth/react', () => ({
        SessionProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
      }))
      jest.doMock('@/config/constants', () => ({ authEnabled: false }))

      const { QueryClient } = await import('@tanstack/react-query')
      const { Providers } = await import('./providers')

      render(
        <Providers>
          <div />
        </Providers>
      )
      render(
        <Providers>
          <div />
        </Providers>
      )

      // On the server a fresh client is created per render
      expect(QueryClient).toHaveBeenCalledTimes(2)
    })
  })

  describe('QueryClient default options', () => {
    it('creates a QueryClient with staleTime of 60 seconds', async () => {
      const { QueryClient } = await import('@tanstack/react-query')
      const { Providers } = await import('./providers')

      render(
        <Providers>
          <div />
        </Providers>
      )

      expect(QueryClient).toHaveBeenCalledWith(
        expect.objectContaining({
          defaultOptions: {
            queries: { staleTime: 60 * 1000 },
          },
        })
      )
    })
  })
})
