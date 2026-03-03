import React from 'react'

import { useLayout } from '@/app/context/LayoutContext'
import { render, screen } from '@/config/test-utils'

import BannerWrapper from './BannerWrapper'

jest.mock('@/app/context/LayoutContext', () => ({
  useLayout: jest.fn(),
}))

describe('BannerWrapper', () => {
  it('should render the classification banner when showBanner is true', () => {
    ;(useLayout as jest.Mock).mockReturnValue({ showBanner: true })

    render(<BannerWrapper size="large" />)

    expect(screen.getByText('Official-Sensitive')).toBeInTheDocument()
  })

  it('should not render the classification banner when showBanner is false', () => {
    ;(useLayout as jest.Mock).mockReturnValue({ showBanner: false })

    render(<BannerWrapper size="large" />)

    expect(screen.queryByText('Official-Sensitive')).not.toBeInTheDocument()
  })

  it('should not render the classification banner when showBanner is null', () => {
    ;(useLayout as jest.Mock).mockReturnValue({ showBanner: null })

    render(<BannerWrapper size="large" />)

    expect(screen.queryByText('Official-Sensitive')).not.toBeInTheDocument()
  })

  it('should pass the size prop to the classification banner', () => {
    ;(useLayout as jest.Mock).mockReturnValue({ showBanner: true })

    render(<BannerWrapper size="medium" />)

    expect(screen.getByText('Official-Sensitive')).toHaveClass('text-[18px]')
  })

  it('should pass the large size prop to the classification banner', () => {
    ;(useLayout as jest.Mock).mockReturnValue({ showBanner: true })

    render(<BannerWrapper size="large" />)

    expect(screen.getByText('Official-Sensitive')).toHaveClass('text-[27px]')
  })
})
