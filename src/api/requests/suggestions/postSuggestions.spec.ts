import { client } from '@/api/utils/api.utils'

import { postSuggestions } from './postSuggestions'

const postSuggestion = jest.mocked(client)

test('Handles successful submission from the api', async () => {
  postSuggestion.mockResolvedValueOnce({ status: 200, data: {} })

  const { success } = await postSuggestions({
    what_was_your_reason_for_visiting_the_dashboard_today: '',
    did_you_find_everything_you_were_looking_for: 'Yes',
    how_could_we_improve_your_experience_with_the_dashboard: '',
    what_would_you_like_to_see_on_the_dashboard_in_the_future: '',
  })

  expect(success).toBeTruthy()
})

test('Handles non 200 response from the api', async () => {
  postSuggestion.mockResolvedValueOnce({ status: 500, data: {} })

  const { success } = await postSuggestions({
    how_could_we_improve_your_experience_with_the_dashboard: '',
    what_was_your_reason_for_visiting_the_dashboard_today: '',
    what_would_you_like_to_see_on_the_dashboard_in_the_future: '',
  })

  expect(success).toBeFalsy()
})
