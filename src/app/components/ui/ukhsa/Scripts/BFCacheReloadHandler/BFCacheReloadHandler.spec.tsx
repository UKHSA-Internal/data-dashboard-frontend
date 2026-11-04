import { render } from '@/config/test-utils'

import { BFCacheReloadHandler } from './BFCacheReloadHandler'

describe('BFCacheReloadHandler', () => {
  let addEventListenerSpy: jest.SpyInstance
  let removeEventListenerSpy: jest.SpyInstance
  let reloadMock: jest.Mock

  beforeEach(() => {
    addEventListenerSpy = jest.spyOn(window, 'addEventListener')
    removeEventListenerSpy = jest.spyOn(window, 'removeEventListener')
    reloadMock = jest.fn()
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { ...window.location, reload: reloadMock },
    })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('renders nothing', () => {
    const { container } = render(<BFCacheReloadHandler />)
    expect(container).toBeEmptyDOMElement()
  })

  it('registers a pageshow listener on mount', () => {
    render(<BFCacheReloadHandler />)

    expect(addEventListenerSpy).toHaveBeenCalledWith('pageshow', expect.any(Function))
  })

  it('removes the pageshow listener on unmount', () => {
    const { unmount } = render(<BFCacheReloadHandler />)

    const registeredHandler = addEventListenerSpy.mock.calls.find(([eventName]) => eventName === 'pageshow')?.[1]

    unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith('pageshow', registeredHandler)
  })

  it('reloads the page when pageshow fires with persisted=true (BFCache restore)', () => {
    render(<BFCacheReloadHandler />)

    const event = new Event('pageshow') as PageTransitionEvent
    Object.defineProperty(event, 'persisted', { value: true })

    window.dispatchEvent(event)

    expect(reloadMock).toHaveBeenCalledTimes(1)
  })

  it('does not reload the page when pageshow fires with persisted=false (normal navigation)', () => {
    render(<BFCacheReloadHandler />)

    const event = new Event('pageshow') as PageTransitionEvent
    Object.defineProperty(event, 'persisted', { value: false })

    window.dispatchEvent(event)

    expect(reloadMock).not.toHaveBeenCalled()
  })
})
