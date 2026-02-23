import React from 'react'

import { render, screen } from '@/config/test-utils'

import ClassificationBanner from './ClassificationBanner'

describe('ClassificationBanner', () => {
  it('should render the classification text', () => {
    render(<ClassificationBanner size="large" level="Blue" />)

    expect(screen.getByText('Official-Sensitive')).toBeInTheDocument()
  })

  it('should have blue background', () => {
    const { container } = render(<ClassificationBanner size="large" level="Blue" />)
    const bannerDiv = container.firstChild

    expect(bannerDiv).toHaveClass('bg-[#2B71C7]')
  })

  it('should apply large font size when size is large', () => {
    render(<ClassificationBanner size="large" level="Amber" />)
    const paragraph = screen.getByText('Official-Sensitive')

    expect(paragraph).toHaveClass('text-[27px]')
  })

  it('should apply medium font size when size is medium', () => {
    render(<ClassificationBanner size="medium" level="Gray" />)
    const paragraph = screen.getByText('Official-Sensitive')

    expect(paragraph).toHaveClass('text-[18px]')
  })

  it('should not apply any conditional font size for other size values', () => {
    render(<ClassificationBanner size="small" level="Gray" />)
    const paragraph = screen.getByText('Official-Sensitive')

    expect(paragraph).not.toHaveClass('text-[27px]')
    expect(paragraph).not.toHaveClass('text-[18px]')
  })

  it('should always apply base classes regardless of size', () => {
    render(<ClassificationBanner size="unknown" level="Gray" />)
    const paragraph = screen.getByText('Official-Sensitive')

    expect(paragraph).toHaveClass('font-sans')
    expect(paragraph).toHaveClass('font-bold')
    expect(paragraph).toHaveClass('uppercase')
    expect(paragraph).toHaveClass('text-white')
  })

  it('should render with empty size', () => {
    render(<ClassificationBanner size="" level="Gray" />)

    expect(screen.getByText('Official-Sensitive')).toBeInTheDocument()
  })
})
