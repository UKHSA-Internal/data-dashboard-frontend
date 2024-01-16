import { gtag, pageView } from './gtag' // Import the function to test

// Mock the global window object
declare global {
  interface Window {
    dataLayer: Array<unknown>
  }
}

// Create a mock for the dataLayer
const mockDataLayer: Array<unknown> = []

// Mock the window object
window.dataLayer = mockDataLayer

describe('gtag', () => {
  afterEach(() => {
    // Clear the dataLayer after each test
    mockDataLayer.length = 0
  })

  it('should push an event and data to the dataLayer', () => {
    gtag('customEvent', { key: 'value' })

    // Check if the event and data were pushed correctly
    expect(mockDataLayer).toEqual([
      {
        event: 'customEvent',
        key: 'value',
      },
    ])
  })

  it('should not push to dataLayer if window or dataLayer is undefined', () => {
    // Temporarily remove the window.dataLayer object if it exists
    const originalDataLayer = window.dataLayer
    Object.defineProperty(window, 'dataLayer', { value: undefined })

    gtag('customEvent', { key: 'value' })

    // Check that nothing was pushed to dataLayer
    expect(mockDataLayer).toEqual([])

    // Restore the original dataLayer
    Object.defineProperty(window, 'dataLayer', { value: originalDataLayer })
  })
})

describe('pageView event', () => {
  it('should call gtag with the "page_view" event and the provided URL', () => {
    const url = '/example-page'
    pageView(url)

    // Check if the event and data were pushed correctly
    expect(mockDataLayer).toEqual([
      {
        event: 'page_view',
        page: url,
      },
    ])
  })
})
