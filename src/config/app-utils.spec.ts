import { getStaticPropsRevalidateValue } from './app-utils'

test('getNextRevalidateValue', () => {
  // Converts a string of "false" to an actual boolean type
  process.env.NEXT_REVALIDATE_TIME = 'false'
  expect(getStaticPropsRevalidateValue()).toEqual(false)

  // Otherwise, falls back to a number.
  process.env.NEXT_REVALIDATE_TIME = '60'
  expect(getStaticPropsRevalidateValue()).toEqual(60)
})
