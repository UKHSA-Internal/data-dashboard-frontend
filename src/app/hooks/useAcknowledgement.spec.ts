import { redirect } from 'next/navigation'

import { getCognitoSignoutURL } from '@/app/utils/auth.utils'
import { signOut } from '@/auth'
import { logger } from '@/lib/logger'

import { handleFormSubmit } from './useAcknowledgement'

// Mock dependencies
jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}))

jest.mock('@/auth', () => ({
  signOut: jest.fn(),
}))

jest.mock('@/lib/logger', () => ({
  logger: {
    error: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
  },
}))

jest.mock('@/app/utils/auth.utils', () => ({
  getCognitoSignoutURL: jest.fn(),
}))

describe('handleFormSubmit', () => {
  let mockFormData: FormData
  const mockCognitoUrl = 'https://cognito.example.com/logout'

  beforeEach(() => {
    jest.clearAllMocks()
    mockFormData = new FormData()
    ;(getCognitoSignoutURL as jest.Mock).mockReturnValue(mockCognitoUrl)
    ;(redirect as unknown as jest.Mock).mockImplementation((url: string) => {
      throw new Error(`NEXT_REDIRECT: ${url}`)
    })
  })

  describe('Disagree Action', () => {
    beforeEach(() => {
      mockFormData.set('action', 'disagree')
    })

    it('should call signOut with redirect false when user disagrees', async () => {
      try {
        await handleFormSubmit({}, mockFormData)
      } catch (_error) {
        // Expected redirect error
      }

      expect(signOut).toHaveBeenCalledWith({ redirect: false })
      expect(signOut).toHaveBeenCalledTimes(1)
    })

    it('should call getCognitoSignoutURL', async () => {
      try {
        await handleFormSubmit({}, mockFormData)
      } catch (_error) {
        // Expected redirect error
      }

      expect(getCognitoSignoutURL).toHaveBeenCalled()
      expect(getCognitoSignoutURL).toHaveBeenCalledTimes(1)
    })

    it('should redirect to Cognito logout URL', async () => {
      await expect(handleFormSubmit({}, mockFormData)).rejects.toThrow(`NEXT_REDIRECT: ${mockCognitoUrl}`)

      expect(redirect).toHaveBeenCalledWith(mockCognitoUrl)
    })

    it('should log error if signOut fails', async () => {
      const signOutError = new Error('SignOut failed')
      ;(signOut as jest.Mock).mockRejectedValueOnce(signOutError)

      try {
        await handleFormSubmit({}, mockFormData)
      } catch (_error) {
        // Expected redirect error
      }

      expect(logger.error).toHaveBeenCalledWith('issue calling authJS signout.')
    })

    it('should still redirect even if signOut throws error', async () => {
      ;(signOut as jest.Mock).mockRejectedValueOnce(new Error('SignOut error'))

      await expect(handleFormSubmit({}, mockFormData)).rejects.toThrow(`NEXT_REDIRECT: ${mockCognitoUrl}`)

      expect(redirect).toHaveBeenCalledWith(mockCognitoUrl)
    })

    it('should handle synchronous signOut error', async () => {
      ;(signOut as jest.Mock).mockImplementationOnce(() => {
        throw new Error('Sync error')
      })

      try {
        await handleFormSubmit({}, mockFormData)
      } catch (_error) {
        // Expected redirect error
      }

      expect(logger.error).toHaveBeenCalledWith('issue calling authJS signout.')
      expect(redirect).toHaveBeenCalledWith(mockCognitoUrl)
    })

    it('should not return FormState when redirecting on disagree', async () => {
      try {
        await handleFormSubmit({}, mockFormData)
        fail('Should have thrown redirect error')
      } catch (_error) {
        expect(_error).toBeDefined()
      }
    })
  })

  describe('Agree Action', () => {
    beforeEach(() => {
      mockFormData.set('action', 'agree')
    })

    it('should return error when acknowledgement is not provided', async () => {
      // Don't set acknowledgement field
      const result = await handleFormSubmit({}, mockFormData)

      expect(result).toEqual({
        error: 'You must accept the terms and conditions to continue',
      })
    })

    it('should return error when acknowledgement is empty string', async () => {
      mockFormData.set('acknowledgement', '')

      const result = await handleFormSubmit({}, mockFormData)

      expect(result).toEqual({
        error: 'You must accept the terms and conditions to continue',
      })
    })

    it('should not redirect when acknowledgement is missing', async () => {
      await handleFormSubmit({}, mockFormData)

      expect(redirect).not.toHaveBeenCalled()
    })

    it('should log user agreement when acknowledgement is provided', async () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
      mockFormData.set('acknowledgement', 'acknowledgement accepted')

      try {
        await handleFormSubmit({}, mockFormData)
      } catch (_error) {
        // Expected redirect error
      }

      expect(consoleSpy).toHaveBeenCalledWith('User agreed', 'acknowledgement accepted')
      consoleSpy.mockRestore()
    })

    it('should redirect to home page when acknowledgement is accepted', async () => {
      mockFormData.set('acknowledgement', 'acknowledgement accepted')

      await expect(handleFormSubmit({}, mockFormData)).rejects.toThrow('NEXT_REDIRECT: /')

      expect(redirect).toHaveBeenCalledWith('/')
    })

    it('should accept any truthy acknowledgement value', async () => {
      mockFormData.set('acknowledgement', 'yes')

      try {
        await handleFormSubmit({}, mockFormData)
      } catch (_error) {
        // Expected redirect error
      }

      expect(redirect).toHaveBeenCalledWith('/')
    })

    it('should not call signOut when user agrees', async () => {
      mockFormData.set('acknowledgement', 'acknowledgement accepted')

      try {
        await handleFormSubmit({}, mockFormData)
      } catch (_error) {
        // Expected redirect error
      }

      expect(signOut).not.toHaveBeenCalled()
    })

    it('should not call getCognitoSignoutURL when user agrees', async () => {
      mockFormData.set('acknowledgement', 'acknowledgement accepted')

      try {
        await handleFormSubmit({}, mockFormData)
      } catch (_error) {
        // Expected redirect error
      }

      expect(getCognitoSignoutURL).not.toHaveBeenCalled()
    })
  })
})
