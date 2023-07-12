import { getApiBaseUrl, getCmsApiPath, requestOptions } from './helpers'

/**
 * The process.env mocks powering these tests live inside <rootDir>/config/jest/jest.env.js
 */
test('Get the API url', () => {
  expect(getApiBaseUrl()).toEqual('http://fake-backend.gov.uk/api')
})

test('Get the CMS API path', () => {
  expect(getCmsApiPath()).toEqual('http://fake-backend.gov.uk/api/pages')
})

test('Fetch request options', () => {
  expect(requestOptions).toEqual<RequestInit>({
    headers: {
      Authorization: 'fake-api-key',
    },
  })
})
