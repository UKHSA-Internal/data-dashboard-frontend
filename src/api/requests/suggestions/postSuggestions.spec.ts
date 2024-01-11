import { client } from '@/api/api-utils'

import { postSuggestions } from './postSuggestions'

const postSuggestion = jest.mocked(client)

test('Handles successful submission from the api', async () => {
  postSuggestion.mockResolvedValueOnce({ status: 200, data: {} })

  const { success } = await postSuggestions({
    improve_experience: '',
    did_you_find_everything: 'yes',
    reason: '',
    like_to_see: '',
  })

  expect(success).toBeTruthy()
})

test('Handles non 200 response from the api', async () => {
  postSuggestion.mockResolvedValueOnce({ status: 500, data: {} })

  const { success } = await postSuggestions({
    improve_experience: '',
    reason: '',
    like_to_see: '',
  })

  expect(success).toBeFalsy()
})
