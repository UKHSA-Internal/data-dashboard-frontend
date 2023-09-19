import { postSuggestions } from './postSuggestions'

jest.mock('@/lib/logger')

jest.mock('./postSuggestions')
const postSuggestion = jest.mocked(postSuggestions)

test('Handles successful submission from the api', async () => {
  postSuggestion.mockResolvedValueOnce({ success: true })

  const { success } = await postSuggestions({
    improve_experience: '',
    did_you_find_everything: 'yes',
    reason: '',
    like_to_see: '',
  })

  expect(success).toBeTruthy()
})

test('Handles non 200 response from the api', async () => {
  postSuggestion.mockResolvedValueOnce({ success: false })

  const { success } = await postSuggestions({
    improve_experience: '',
    reason: '',
    like_to_see: '',
  })

  expect(success).toBeFalsy()
})
