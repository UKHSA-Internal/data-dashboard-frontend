import React from 'react'

import { render, screen } from '@/config/test-utils'

import ClassificationBanner from './ClassificationBanner'

describe('ClassificationBanner', () => {
  it('should render the classification text for Blue level', () => {
    render(<ClassificationBanner size="large" level="Blue" />)

    expect(screen.getByText('Official-Sensitive')).toBeInTheDocument()
  })

  it('should render the classification text for Gray level', () => {
    render(<ClassificationBanner size="large" level="Gray" />)

    expect(screen.getByText('Protective marking not set')).toBeInTheDocument()
  })

  it('should render the classification text for Amber level', () => {
    render(<ClassificationBanner size="large" level="Amber" />)

    expect(screen.getByText('Secret')).toBeInTheDocument()
  })

  it('should render the classification text for Red level', () => {
    render(<ClassificationBanner size="large" level="Red" />)

    expect(screen.getByText('Top Secret')).toBeInTheDocument()
  })

  it('should have blue background for Blue level', () => {
    const { container } = render(<ClassificationBanner size="large" level="Blue" />)
    const bannerDiv = container.firstChild

    expect(bannerDiv).toHaveClass('bg-[#2B71C7]')
  })

  it('should have red background for Red level', () => {
    const { container } = render(<ClassificationBanner size="large" level="Red" />)
    const bannerDiv = container.firstChild

    expect(bannerDiv).toHaveClass('bg-[#AA0000]')
  })

  it('should have gray background for Gray level', () => {
    const { container } = render(<ClassificationBanner size="large" level="Gray" />)
    const bannerDiv = container.firstChild

    expect(bannerDiv).toHaveClass('bg-[#616161]')
  })

  it('should have amber background for Amber level', () => {
    const { container } = render(<ClassificationBanner size="large" level="Amber" />)
    const bannerDiv = container.firstChild

    expect(bannerDiv).toHaveClass('bg-[#F39C2C]')
  })

  it('should apply large font size when size is large', () => {
    render(<ClassificationBanner size="large" level="Blue" />)
    const paragraph = screen.getByText('Official-Sensitive')

    expect(paragraph).toHaveClass('text-[27px]')
  })

  it('should apply medium font size when size is medium', () => {
    render(<ClassificationBanner size="medium" level="Blue" />)
    const paragraph = screen.getByText('Official-Sensitive')

    expect(paragraph).toHaveClass('text-[18px]')
  })

  it('should not apply any conditional font size for other size values', () => {
    render(<ClassificationBanner size="small" level="Blue" />)
    const paragraph = screen.getByText('Official-Sensitive')

    expect(paragraph).not.toHaveClass('text-[27px]')
    expect(paragraph).not.toHaveClass('text-[18px]')
  })

  it('should always apply base classes regardless of size', () => {
    render(<ClassificationBanner size="unknown" level="Blue" />)
    const paragraph = screen.getByText('Official-Sensitive')

    expect(paragraph).toHaveClass('font-sans')
    expect(paragraph).toHaveClass('font-bold')
    expect(paragraph).toHaveClass('uppercase')
    expect(paragraph).toHaveClass('text-white')
  })

  it('should render with empty size', () => {
    render(<ClassificationBanner size="" level="Blue" />)

    expect(screen.getByText('Official-Sensitive')).toBeInTheDocument()
  })
})
