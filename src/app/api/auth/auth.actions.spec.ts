import { redirect } from 'next/navigation'

import { signOut } from '@/api/requests/auth/signOut'
import { getCognitoSignoutURL } from '@/app/utils/auth.utils'
import { logger } from '@/lib/logger'

import { serverSignOut } from './auth.actions'

jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}))

jest.mock('@/api/requests/auth/signOut', () => ({
  signOut: jest.fn(),
}))

jest.mock('@/app/utils/auth.utils', () => ({
  getCognitoSignoutURL: jest.fn(),
}))

jest.mock('@/lib/logger', () => ({
  logger: {
    error: jest.fn(),
  },
}))

const mockRedirect = jest.mocked(redirect)
const mockSignOut = jest.mocked(signOut)
const mockGetCognitoSignoutURL = jest.mocked(getCognitoSignoutURL)
const mockLoggerError = jest.mocked(logger.error)

describe('serverSignOut', () => {
  beforeEach(() => {
    mockGetCognitoSignoutURL.mockReturnValue('https://cognito.example.com/logout?redirect=/start')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('calls signOut', async () => {
    await serverSignOut()
    expect(mockSignOut).toHaveBeenCalledTimes(1)
  })

  test('redirects to the Cognito logout URL after signing out', async () => {
    await serverSignOut()
    expect(mockGetCognitoSignoutURL).toHaveBeenCalledWith('/start')
    expect(mockRedirect).toHaveBeenCalledWith('https://cognito.example.com/logout?redirect=/start')
  })

  test('redirects to Cognito even when signOut throws', async () => {
    mockSignOut.mockRejectedValueOnce(new Error('signOut failed'))
    await serverSignOut()
    expect(mockRedirect).toHaveBeenCalledWith('https://cognito.example.com/logout?redirect=/start')
  })

  test('logs an error when signOut throws', async () => {
    mockSignOut.mockRejectedValueOnce(new Error('signOut failed'))
    await serverSignOut()
    expect(mockLoggerError).toHaveBeenCalledWith('issue calling signout.')
  })

  test('does not log an error when signOut succeeds', async () => {
    await serverSignOut()
    expect(mockLoggerError).not.toHaveBeenCalled()
  })

  test('redirect is called after signOut regardless of success or failure', async () => {
    // Success case
    await serverSignOut()
    expect(mockRedirect).toHaveBeenCalledTimes(1)

    jest.clearAllMocks()
    mockGetCognitoSignoutURL.mockReturnValue('https://cognito.example.com/logout?redirect=/start')

    // Failure case
    mockSignOut.mockRejectedValueOnce(new Error('signOut failed'))
    await serverSignOut()
    expect(mockRedirect).toHaveBeenCalledTimes(1)
  })
})
