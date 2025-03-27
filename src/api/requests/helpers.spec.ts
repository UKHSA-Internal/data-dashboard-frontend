import { getApiBaseUrl, getAuthApiBaseUrl, getCmsApiPath, requestOptions } from './helpers'

/**
 * The process.env mocks powering these tests live inside <rootDir>/config/jest/jest.env.js
 */
test('Get the API url', () => {
  expect(getApiBaseUrl()).toEqual('http://fake-backend.gov.uk/api')
})

test('Get the CMS API path', () => {
  expect(getCmsApiPath()).toEqual('http://fake-backend.gov.uk/api/pages')
})

test('Get the Cognito OAuth API path', () => {
  expect(getAuthApiBaseUrl()).toEqual('https://fake-env-domain.auth.eu-west-2.amazoncognito.com/oauth2')
})

test('Fetch request options', () => {
  expect(requestOptions).toEqual<RequestInit>({
    headers: {
      Authorization: 'fake-api-key',
    },
  })
})
