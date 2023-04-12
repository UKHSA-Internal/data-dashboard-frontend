import { getCmsApiPath, getChartsApiPath, getStatsApiPath, requestOptions } from './helpers'

/**
 * The process.env mocks powering these tests live inside <rootDir>/config/jest/jest.env.js
 */
test('Get the CMS API path', () => {
  expect(getCmsApiPath()).toEqual('http://backend.com/api/pages')
})

test('Get the Chart API path', () => {
  expect(getChartsApiPath()).toEqual('http://backend.com/charts')
})

test('Get the Stats API path', () => {
  expect(getStatsApiPath()).toEqual('http://backend.com/stats')
})

test('Fetch request options', () => {
  expect(requestOptions).toEqual<RequestInit>({
    headers: {
      Authorization: 'fake-api-key',
    },
  })
})
