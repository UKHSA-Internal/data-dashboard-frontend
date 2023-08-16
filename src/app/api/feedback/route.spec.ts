/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server'
import { Mock } from 'ts-mockery'

import { client } from '@/api/api-utils'
import { RequestParams } from '@/api/requests/suggestions/postSuggestions'
import { logger } from '@/lib/logger'

import { POST } from './route'

jest.mock('@/lib/logger')
jest.mock('@/api/api-utils')

test('Redirect to confirmation page when valid suggestions are provided', async () => {
  jest.mocked(client).mockResolvedValueOnce({
    data: null,
    status: 200,
  })

  const req = Mock.of<NextRequest & { url: string; body: RequestParams }>({
    nextUrl: {
      clone: jest.fn(() => new URL('http://localhost')),
    },
    body: {
      improve_experience: 'quality!',
      did_you_find_everything: 'yes',
      reason: 'testing',
      like_to_see: 'nothing',
    },
  })

  const res = await POST(req)

  expect(res.status).toBe(302)
  expect(res.headers.get('location')).toBe('http://localhost/feedback/confirmation')
})

test('Redirect to confirmation page when no suggestions are provided (form is non-mandatory)', async () => {
  jest.mocked(client).mockResolvedValueOnce({
    data: null,
    status: 200,
  })

  const req = Mock.of<NextRequest & { url: string; body: RequestParams }>({
    nextUrl: {
      clone: jest.fn(() => new URL('http://localhost')),
    },
    body: {
      improve_experience: '',
      did_you_find_everything: undefined,
      reason: '',
      like_to_see: '',
    },
  })

  const res = await POST(req)

  expect(res.status).toBe(302)
  expect(res.headers.get('location')).toBe('http://localhost/feedback/confirmation')
})

test('Redirect to error page when an error with the backend API occurs', async () => {
  jest.mocked(client).mockRejectedValueOnce({
    status: 500,
  })

  const req = Mock.of<NextRequest & { url: string; body: RequestParams }>({
    nextUrl: {
      clone: jest.fn(() => new URL('http://localhost')),
    },
    body: {
      improve_experience: '',
      did_you_find_everything: 'no',
      reason: '',
      like_to_see: '',
    },
  })

  const res = await POST(req)

  expect(logger.error).toHaveBeenCalledWith(new Error('form submission to backend failed'))
  expect(res.status).toBe(302)
  expect(res.headers.get('location')).toBe('http://localhost/feedback?error=1')
})
