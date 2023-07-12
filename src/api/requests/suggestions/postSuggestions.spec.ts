import { rest } from 'msw'

import { server } from '@/api/msw/server'

import { getApiBaseUrl } from '../helpers'
import { postSuggestions } from './postSuggestions'

jest.mock('@/lib/logger')

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

test('Handles successful submission from the api', async () => {
  const { success } = await postSuggestions({
    improve_experience: '',
    did_you_find_everything: 'yes',
    reason: '',
    like_to_see: '',
  })

  expect(success).toBeTruthy()
})

test('Handles non 200 response from the api', async () => {
  server.use(
    rest.post(`${getApiBaseUrl()}/suggestions/v1`, (req, res, ctx) => {
      return res(ctx.status(500))
    })
  )

  const { success } = await postSuggestions({
    improve_experience: '',
    did_you_find_everything: 'yes',
    reason: '',
    like_to_see: '',
  })

  expect(success).toBeFalsy()
})
