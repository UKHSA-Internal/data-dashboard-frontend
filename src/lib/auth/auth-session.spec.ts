import { getClientSession, getServerSession } from './auth-session'

// Mock next-auth
const mockAuth = jest.fn()
const mockGetSession = jest.fn()

jest.mock(
  '@/auth',
  () => ({
    auth: mockAuth,
  }),
  { virtual: true }
)

jest.mock(
  'next-auth/react',
  () => ({
    getSession: mockGetSession,
  }),
  { virtual: true }
)

// Mock React's cache to be a passthrough so we can test the inner functions
jest.mock('react', () => ({
  cache: (fn: unknown) => fn,
}))

describe('getServerSession', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return the session from auth()', async () => {
    const mockSession = { user: { name: 'Alice', email: 'alice@example.com' } }
    mockAuth.mockResolvedValue(mockSession)

    const session = await getServerSession()

    expect(session).toEqual(mockSession)
    expect(mockAuth).toHaveBeenCalledTimes(1)
  })

  it('should return null when there is no active session', async () => {
    mockAuth.mockResolvedValue(null)

    const session = await getServerSession()

    expect(session).toBeNull()
    expect(mockAuth).toHaveBeenCalledTimes(1)
  })

  it('should propagate errors thrown by auth()', async () => {
    mockAuth.mockRejectedValue(new Error('Auth service unavailable'))

    await expect(getServerSession()).rejects.toThrow('Auth service unavailable')
  })
})

describe('getClientSession', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return the session from getSession()', async () => {
    const mockSession = { user: { name: 'Bob', email: 'bob@example.com' } }
    mockGetSession.mockResolvedValue(mockSession)

    const session = await getClientSession()

    expect(session).toEqual(mockSession)
    expect(mockGetSession).toHaveBeenCalledTimes(1)
  })

  it('should return null when there is no active client session', async () => {
    mockGetSession.mockResolvedValue(null)

    const session = await getClientSession()

    expect(session).toBeNull()
    expect(mockGetSession).toHaveBeenCalledTimes(1)
  })

  it('should propagate errors thrown by getSession()', async () => {
    mockGetSession.mockRejectedValue(new Error('Session fetch failed'))

    await expect(getClientSession()).rejects.toThrow('Session fetch failed')
  })
})
