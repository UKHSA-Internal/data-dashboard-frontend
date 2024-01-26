/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server'
import { Mock } from 'ts-mockery'

import { client } from '@/api/utils/api.utils'
import { logger } from '@/lib/logger'

import { POST } from './route'

afterEach(() => {
  jest.resetAllMocks()
})

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

  const req = Mock.of<NextRequest & { url: string; formData: () => FormData }>({
    headers: {
      get: () => 'http://localhost',
    },
    formData: () => formData,
  })

  const res = await POST(req)

  expect(res.status).toBe(302)
  expect(res.headers.get('location')).toBe('http://localhost/feedback/confirmation')
})

test('Redirect to confirmation page when no suggestions are provided (form is non-mandatory)', async () => {
  const formData = new FormData()
  formData.set('improve_experience', '')
  formData.set('reason', '')
  formData.set('like_to_see', '')

  const req = Mock.of<NextRequest & { url: string; formData: () => FormData }>({
    headers: {
      get: () => 'http://localhost',
    },
    formData: () => formData,
  })

  const res = await POST(req)

  expect(res.status).toBe(302)
  expect(res.headers.get('location')).toBe('http://localhost/feedback/confirmation')
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

  const req = Mock.of<NextRequest & { url: string; formData: () => FormData }>({
    headers: {
      get: () => 'http://localhost',
    },
    formData: () => formData,
  })

  const res = await POST(req)

  expect(logger.error).toHaveBeenCalledWith('Failed to submit feedback form')
  expect(logger.trace).toHaveBeenCalledWith(new Error('form submission to backend failed'))
  expect(res.status).toBe(302)
  expect(res.headers.get('location')).toBe('http://localhost/feedback?error=1')
})
