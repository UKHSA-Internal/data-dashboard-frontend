import { auth, signOut as nextAuthSignOut } from '@/auth'
import { logger } from '@/lib/logger'

import { getAuthApiBaseUrl } from '../../helpers'
import { signOut } from '../signOut'

jest.mock('@/auth')
jest.mock('@/lib/logger')
jest.mock('../../helpers')

describe('signOut', () => {
  const mockSession = {
    refreshToken: 'mock-refresh-token',
  }

  const mockOptions = {
    redirectTo: '/test',
    redirect: true as const,
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(getAuthApiBaseUrl as jest.Mock).mockReturnValue('https://test-cognito.com')
    process.env.AUTH_CLIENT_ID = 'test-client-id'
    process.env.AUTH_CLIENT_SECRET = 'test-client-secret'
  })

  it('should successfully revoke token and clear NextAuth session', async () => {
    // Mock successful auth session
    ;(auth as jest.Mock).mockResolvedValue(mockSession)

    // Mock successful fetch response
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn(),
    })

    await signOut(mockOptions)

    // Verify fetch was called with correct parameters
    expect(fetch).toHaveBeenCalledWith(
      'https://test-cognito.com/revoke',
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: expect.stringContaining('Basic'),
        },
        body: expect.stringContaining('mock-refresh-token'),
      })
    )

    // Verify NextAuth signOut was called
    expect(nextAuthSignOut).toHaveBeenCalledWith(mockOptions)
  })

  it('should handle missing refresh token gracefully', async () => {
    // Mock session without refresh token
    ;(auth as jest.Mock).mockResolvedValue({})

    await signOut(mockOptions)

    // Verify warning was logged
    expect(logger.warn).toHaveBeenCalledWith('No refresh token available during sign out')

    // Verify fetch was not called
    expect(fetch).not.toHaveBeenCalled()

    // Verify NextAuth signOut was still called
    expect(nextAuthSignOut).toHaveBeenCalledWith(mockOptions)
  })

  it('should handle token revocation failure gracefully', async () => {
    // Mock successful auth session
    ;(auth as jest.Mock).mockResolvedValue(mockSession)

    // Mock failed fetch response
    const mockError = { error: 'Revocation failed' }
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: jest.fn().mockResolvedValue(mockError),
    })

    await signOut(mockOptions)

    // Verify error was logged
    expect(logger.error).toHaveBeenCalledWith('Error revoking token:', mockError)

    // Verify NextAuth signOut was still called
    expect(nextAuthSignOut).toHaveBeenCalledWith(mockOptions)
  })

  it('should handle fetch errors gracefully', async () => {
    // Mock successful auth session
    ;(auth as jest.Mock).mockResolvedValue(mockSession)

    // Mock fetch error
    const mockError = new Error('Network error')
    global.fetch = jest.fn().mockRejectedValue(mockError)

    await signOut(mockOptions)

    // Verify error was logged
    expect(logger.error).toHaveBeenCalledWith('Error during sign out:', mockError)

    // Verify NextAuth signOut was still called
    expect(nextAuthSignOut).toHaveBeenCalledWith(mockOptions)
  })

  it('should work without options', async () => {
    // Mock successful auth session
    ;(auth as jest.Mock).mockResolvedValue(mockSession)

    // Mock successful fetch response
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn(),
    })

    await signOut()

    // Verify fetch was called
    expect(fetch).toHaveBeenCalled()

    // Verify NextAuth signOut was called without options
    expect(nextAuthSignOut).toHaveBeenCalledWith(undefined)
  })
})
