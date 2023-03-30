import { getCmsApiPath, getChartApiPath, getStatsApiPath, requestOptions } from './helpers'

/**
 * The process.env mocks powering these tests live inside <rootDir>/config/jest/jest.env.js
 */
test('Get the CMS API path', () => {
  expect(getCmsApiPath()).toEqual('http://backend.com/api/pages')
})

test('Get the Chart API path', () => {
  expect(getChartApiPath()).toEqual('http://backend.com/charts')
})

test('Get the Stats API path', () => {
  expect(getStatsApiPath()).toEqual('http://backend.com/stats')
})

test('Fetch request options', () => {
  expect(requestOptions).toEqual<RequestInit>({
    headers: {
      'X-Api-Key': 'fake-api-key',
    },
  })
})
