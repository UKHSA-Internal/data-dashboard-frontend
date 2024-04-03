import { redirect } from 'next/navigation'

import { client } from '@/api/utils/api.utils'
import { logger } from '@/lib/logger'

import { handler } from './handler'

afterEach(() => {
  jest.resetAllMocks()
})

jest.mock('next/navigation')

test('Redirect to confirmation page when valid suggestions are provided', async () => {
  jest.mocked(client).mockResolvedValueOnce({
    data: null,
    status: 200,
  })

  const formData = new FormData()
  formData.set('improve_experience', 'quality!')
  formData.set('did_you_find_everything', 'yes')
  formData.set('reason', 'testing')
  formData.set('like_to_see', 'nothing')

  await handler({ message: '', errors: {} }, formData)

  expect(logger.info).toHaveBeenNthCalledWith(1, 'Feedback submitted successfully, redirecting to confirmation')
  expect(redirect).toHaveBeenNthCalledWith(1, '/feedback/confirmation')
})

test('Redirect to confirmation page when no suggestions are provided (form is non-mandatory)', async () => {
  const formData = new FormData()
  formData.set('improve_experience', '')
  formData.set('reason', '')
  formData.set('like_to_see', '')

  await handler({ message: '', errors: {} }, formData)

  expect(logger.info).toHaveBeenNthCalledWith(
    1,
    'Empty feedback form submitted, redirecting to confirmation and skipping api request'
  )
  expect(redirect).toHaveBeenNthCalledWith(1, '/feedback/confirmation')
})

test('Redirect to error page when an error with the backend API occurs', async () => {
  jest.mocked(client).mockRejectedValueOnce({
    status: 500,
  })

  const formData = new FormData()
  formData.set('improve_experience', '')
  formData.set('did_you_find_everything', 'no')
  formData.set('reason', '')
  formData.set('like_to_see', '')

  const res = await handler({ message: '', errors: {} }, formData)

  expect(res).toEqual({ errors: {}, message: 'Unknown error' })
})
