import { SITE_URL } from '../constants/app.constants'
import { getStaticPropsRevalidateValue, isProd } from './app.utils'

test('getStaticPropsRevalidateValue', () => {
  // Converts a string of "false" to an actual boolean type
  process.env.NEXT_REVALIDATE_TIME = 'false'
  expect(getStaticPropsRevalidateValue()).toEqual(false)

  // Otherwise, falls back to a number.
  process.env.NEXT_REVALIDATE_TIME = '60'
  expect(getStaticPropsRevalidateValue()).toEqual(60)
})

test('Determine prod env based on hostname', () => {
  window = Object.create(window)

  Object.defineProperty(window, 'location', {
    value: {
      hostname: SITE_URL,
    },
    writable: true, // possibility to override
  })

  expect(isProd()).toBe(true)

  Object.defineProperty(window, 'location', {
    value: {
      hostname: 'localhost',
    },
    writable: true, // possibility to override
  })

  expect(isProd()).toBe(false)
})
