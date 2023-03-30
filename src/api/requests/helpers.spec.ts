import { getCmsApiPath, getChartApiPath } from './helpers'

/**
 * The process.env mocks powering these tests live inside <rootDir>/config/jest/jest.env.js
 */
test('Get the CMS API path', () => {
  expect(getCmsApiPath()).toEqual('http://backend.com/api/v2')
})

test('Get the Chart API path', () => {
  expect(getChartApiPath()).toEqual('http://backend.com/charts')
})
