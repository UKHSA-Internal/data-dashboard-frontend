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
  formData.set('how_could_we_improve_your_experience_with_the_dashboard', 'quality!')
  formData.set('did_you_find_everything_you_were_looking_for', 'yes')
  formData.set('what_was_your_reason_for_visiting_the_dashboard_today', 'testing')
  formData.set('what_would_you_like_to_see_on_the_dashboard_in_the_future', 'nothing')

  await handler({ message: '', errors: {} }, formData)

  expect(logger.info).toHaveBeenNthCalledWith(1, 'Feedback submitted successfully, redirecting to confirmation')
  expect(redirect).toHaveBeenNthCalledWith(1, '/feedback/confirmation')
})

test('Redirect to confirmation page when no suggestions are provided (form is non-mandatory)', async () => {
  const formData = new FormData()
  formData.set('how_could_we_improve_your_experience_with_the_dashboard', '')
  formData.set('what_was_your_reason_for_visiting_the_dashboard_today', '')
  formData.set('what_would_you_like_to_see_on_the_dashboard_in_the_future', '')

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
  formData.set('how_could_we_improve_your_experience_with_the_dashboard', '')
  formData.set('did_you_find_everything_you_were_looking_for', 'no')
  formData.set('what_was_your_reason_for_visiting_the_dashboard_today', '')
  formData.set('what_would_you_like_to_see_on_the_dashboard_in_the_future', '')

  const res = await handler({ message: '', errors: {} }, formData)

  expect(res).toEqual({ errors: {}, message: 'Unknown error' })
})
