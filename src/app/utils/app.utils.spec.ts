import { SITE_URL } from '../constants/app.constants'
import { isProd } from './app.utils'

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
