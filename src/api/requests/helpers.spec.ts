import { getCmsApiPath, getChartsApiPath, getStatsApiPath, requestOptions, getApiBaseUrl } from './helpers'

/**
 * The process.env mocks powering these tests live inside <rootDir>/config/jest/jest.env.js
 */
test('Get the API url', () => {
  expect(getApiBaseUrl()).toEqual('http://fake-backend.gov.uk/api')
})

test('Get the CMS API path', () => {
  expect(getCmsApiPath()).toEqual('http://fake-backend.gov.uk/api/pages')
})

test('Get the Chart API path', () => {
  expect(getChartsApiPath()).toEqual('http://fake-backend.gov.uk/charts')
})

test('Get the Stats API path', () => {
  expect(getStatsApiPath()).toEqual('http://fake-backend.gov.uk/stats')
})

test('Fetch request options', () => {
  expect(requestOptions).toEqual<RequestInit>({
    headers: {
      Authorization: 'fake-api-key',
    },
  })
})
