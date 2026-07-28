import { render } from '@/config/test-utils'

import { ClearAcknowledgementOnMount } from './ClearAcknowledgementOnMount'

const mockClearAcknowledgementMarker = jest.fn()

jest.mock('@/app/utils/acknowledgement.utils', () => ({
  clearAcknowledgementMarker: () => mockClearAcknowledgementMarker(),
}))

describe('ClearAcknowledgementOnMount', () => {
  beforeEach(() => {
    mockClearAcknowledgementMarker.mockClear()
  })

  it('clear acknowledgement marker on mount', () => {
    render(<ClearAcknowledgementOnMount />)

    expect(mockClearAcknowledgementMarker).toHaveBeenCalledTimes(1)
  })
})
