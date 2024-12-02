import { redirect } from 'next/navigation'

import { client } from '@/api/utils/api.utils'
import { logger } from '@/lib/logger'

import { FormFields, handler } from './handler'

afterEach(() => {
  jest.resetAllMocks()
})

jest.mock('next/navigation')

test('Redirect to confirmation page when valid suggestions are provided', async () => {
  jest.mocked(client).mockResolvedValueOnce({
    data: null,
    status: 200,
  })

  const formFields: FormFields[] = [
    {
      id: 1,
      meta: { type: 'forms.FormField' },
      clean_name: 'what_was_your_reason_for_visiting_the_dashboard_today',
      label: 'What was your reason for visiting the dashboard today?',
      field_type: 'multiline',
      help_text:
        'We will not be able to get in touch with you about your responses so please do not leave any personal details, such as your name or email address.',
      required: false,
      choices: '',
      default_value: '',
    },
  ]

  const formData = new FormData()
  formData.set('how_could_we_improve_your_experience_with_the_dashboard', 'quality!')
  formData.set('did_you_find_everything_you_were_looking_for', 'yes')
  formData.set('what_was_your_reason_for_visiting_the_dashboard_today', 'testing')
  formData.set('what_would_you_like_to_see_on_the_dashboard_in_the_future', 'nothing')

  await handler(formFields, { message: '', errors: [] }, formData)

  expect(logger.info).toHaveBeenNthCalledWith(1, 'Feedback submitted successfully, redirecting to confirmation')
  expect(redirect).toHaveBeenNthCalledWith(1, '/feedback/confirmation')
})

test('Return errors to feedback page when required fields are not provided', async () => {
  const formFields: FormFields[] = [
    {
      id: 1,
      meta: { type: 'forms.FormField' },
      clean_name: 'what_was_your_reason_for_visiting_the_dashboard_today',
      label: 'What was your reason for visiting the dashboard today?',
      field_type: 'multiline',
      help_text:
        'We will not be able to get in touch with you about your responses so please do not leave any personal details, such as your name or email address.',
      required: true,
      choices: '',
      default_value: '',
    },
    {
      id: 2,
      meta: { type: 'forms.FormField' },
      clean_name: 'how_could_we_improve_your_experience_with_the_dashboard',
      label: 'How could we improve your experience with the dashboard?',
      field_type: 'multiline',
      help_text: '',
      required: true,
      choices: '',
      default_value: '',
    },
  ]

  const formData = new FormData()
  formData.set('how_could_we_improve_your_experience_with_the_dashboard', '')
  formData.set('did_you_find_everything_you_were_looking_for', 'yes')
  formData.set('what_was_your_reason_for_visiting_the_dashboard_today', '')
  formData.set('what_would_you_like_to_see_on_the_dashboard_in_the_future', 'nothing')

  const expectedError = [
    {
      clean_name: 'what_was_your_reason_for_visiting_the_dashboard_today',
      label: 'What was your reason for visiting the dashboard today?',
    },
    {
      clean_name: 'how_could_we_improve_your_experience_with_the_dashboard',
      label: 'How could we improve your experience with the dashboard?',
    },
  ]

  const res = await handler(formFields, { message: '', errors: [] }, formData)

  expect(redirect).not.toHaveBeenNthCalledWith(1, '/feedback/confirmation')
  expect(res).toEqual({ errors: expectedError, message: 'Errors have been identified in the form' })
})

test('Return errors to feedback page when required fields are not provided', async () => {
  const formFields: FormFields[] = [
    {
      id: 1,
      meta: { type: 'forms.FormField' },
      clean_name: 'what_was_your_reason_for_visiting_the_dashboard_today',
      label: 'What was your reason for visiting the dashboard today?',
      field_type: 'multiline',
      help_text:
        'We will not be able to get in touch with you about your responses so please do not leave any personal details, such as your name or email address.',
      required: true,
      choices: '',
      default_value: '',
    },
    {
      id: 2,
      meta: { type: 'forms.FormField' },
      clean_name: 'how_could_we_improve_your_experience_with_the_dashboard',
      label: 'How could we improve your experience with the dashboard?',
      field_type: 'multiline',
      help_text: '',
      required: true,
      choices: '',
      default_value: '',
    },
  ]

  const formData = new FormData()
  formData.set('how_could_we_improve_your_experience_with_the_dashboard', 'quality!')
  formData.set('did_you_find_everything_you_were_looking_for', 'yes')
  formData.set('what_was_your_reason_for_visiting_the_dashboard_today', '')
  formData.set('what_would_you_like_to_see_on_the_dashboard_in_the_future', 'nothing')

  const expectedError = [
    {
      clean_name: 'what_was_your_reason_for_visiting_the_dashboard_today',
      label: 'What was your reason for visiting the dashboard today?',
    },
  ]

  const res = await handler(formFields, { message: '', errors: [] }, formData)

  expect(redirect).not.toHaveBeenNthCalledWith(1, '/feedback/confirmation')
  expect(res).toEqual({ errors: expectedError, message: 'Errors have been identified in the form' })
})

test('Redirect to confirmation page when required fields are provided', async () => {
  jest.mocked(client).mockResolvedValueOnce({
    data: null,
    status: 200,
  })

  const formFields: FormFields[] = [
    {
      id: 1,
      meta: { type: 'forms.FormField' },
      clean_name: 'what_was_your_reason_for_visiting_the_dashboard_today',
      label: 'What was your reason for visiting the dashboard today?',
      field_type: 'multiline',
      help_text:
        'We will not be able to get in touch with you about your responses so please do not leave any personal details, such as your name or email address.',
      required: true,
      choices: '',
      default_value: '',
    },
    {
      id: 2,
      meta: { type: 'forms.FormField' },
      clean_name: 'how_could_we_improve_your_experience_with_the_dashboard',
      label: 'How could we improve your experience with the dashboard?',
      field_type: 'multiline',
      help_text: '',
      required: true,
      choices: '',
      default_value: '',
    },
  ]

  const formData = new FormData()
  formData.set('how_could_we_improve_your_experience_with_the_dashboard', 'quality!')
  formData.set('did_you_find_everything_you_were_looking_for', 'yes')
  formData.set('what_was_your_reason_for_visiting_the_dashboard_today', 'Looking into Data')
  formData.set('what_would_you_like_to_see_on_the_dashboard_in_the_future', 'nothing')

  await handler(formFields, { message: '', errors: [] }, formData)

  expect(logger.info).toHaveBeenNthCalledWith(1, 'Feedback submitted successfully, redirecting to confirmation')
  expect(redirect).toHaveBeenNthCalledWith(1, '/feedback/confirmation')
})

test('Redirect to confirmation page when no suggestions are provided (form is non-mandatory)', async () => {
  const formFields: FormFields[] = [
    {
      id: 1,
      meta: { type: 'forms.FormField' },
      clean_name: 'what_was_your_reason_for_visiting_the_dashboard_today',
      label: 'What was your reason for visiting the dashboard today?',
      field_type: 'multiline',
      help_text:
        'We will not be able to get in touch with you about your responses so please do not leave any personal details, such as your name or email address.',
      required: false,
      choices: '',
      default_value: '',
    },
  ]

  const formData = new FormData()
  formData.set('how_could_we_improve_your_experience_with_the_dashboard', '')
  formData.set('what_was_your_reason_for_visiting_the_dashboard_today', '')
  formData.set('what_would_you_like_to_see_on_the_dashboard_in_the_future', '')

  await handler(formFields, { message: '', errors: [] }, formData)

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

  const formFields: FormFields[] = [
    {
      id: 1,
      meta: { type: 'forms.FormField' },
      clean_name: 'what_was_your_reason_for_visiting_the_dashboard_today',
      label: 'What was your reason for visiting the dashboard today?',
      field_type: 'multiline',
      help_text:
        'We will not be able to get in touch with you about your responses so please do not leave any personal details, such as your name or email address.',
      required: false,
      choices: '',
      default_value: '',
    },
  ]

  const formData = new FormData()
  formData.set('how_could_we_improve_your_experience_with_the_dashboard', '')
  formData.set('did_you_find_everything_you_were_looking_for', 'no')
  formData.set('what_was_your_reason_for_visiting_the_dashboard_today', '')
  formData.set('what_would_you_like_to_see_on_the_dashboard_in_the_future', '')

  const res = await handler(formFields, { message: '', errors: [] }, formData)

  expect(res).toEqual({ errors: [], message: 'Unknown error' })
})
