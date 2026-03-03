import React from 'react'

import { useLayout } from '@/app/context/LayoutContext'
import { render } from '@/config/test-utils'

import PublicFlagSetter from './PublicFlagSetter'

jest.mock('@/app/context/LayoutContext', () => ({
  useLayout: jest.fn(),
}))

describe('PublicFlagSetter', () => {
  const mockSetShowBanner = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useLayout as jest.Mock).mockReturnValue({ setShowBanner: mockSetShowBanner })
  })

  it('should call setShowBanner with true when isPublic is true', () => {
    render(<PublicFlagSetter isPublic={true} />)

    expect(mockSetShowBanner).toHaveBeenCalledWith(true)
  })

  it('should call setShowBanner with false when isPublic is false', () => {
    render(<PublicFlagSetter isPublic={false} />)

    expect(mockSetShowBanner).toHaveBeenCalledWith(false)
  })

  it('should call setShowBanner when isPublic changes', () => {
    const { rerender } = render(<PublicFlagSetter isPublic={false} />)

    expect(mockSetShowBanner).toHaveBeenCalledWith(false)

    rerender(<PublicFlagSetter isPublic={true} />)

    expect(mockSetShowBanner).toHaveBeenCalledWith(true)
  })

  it('should render nothing', () => {
    const { container } = render(<PublicFlagSetter isPublic={true} />)

    expect(container).toBeEmptyDOMElement()
  })
})
