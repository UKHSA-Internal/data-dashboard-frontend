import React from 'react'

import { render, screen } from '@/config/test-utils'

import ClassificationBanner from './ClassificationBanner'

describe('ClassificationBanner', () => {
  it('should render the correct text for official level', () => {
    render(<ClassificationBanner size="large" level="official" />)

    expect(screen.getByText('Official')).toBeInTheDocument()
  })

  it('should render the correct text for official_sensitive level', () => {
    render(<ClassificationBanner size="large" level="official_sensitive" />)

    expect(screen.getByText('Official-Sensitive')).toBeInTheDocument()
  })

  it('should render the correct text for protective_marking_not_set level', () => {
    render(<ClassificationBanner size="large" level="protective_marking_not_set" />)

    expect(screen.getByText('Protective marking not set')).toBeInTheDocument()
  })

  it('should render the correct text for secret level', () => {
    render(<ClassificationBanner size="large" level="secret" />)

    expect(screen.getByText('Secret')).toBeInTheDocument()
  })

  it('should render the correct text for top_secret level', () => {
    render(<ClassificationBanner size="large" level="top_secret" />)

    expect(screen.getByText('Top Secret')).toBeInTheDocument()
  })

  it('should have blue background for official level', () => {
    const { container } = render(<ClassificationBanner size="large" level="official" />)

    expect(container.firstChild).toHaveClass('bg-[#2B71C7]')
  })

  it('should have blue background for official_sensitive level', () => {
    const { container } = render(<ClassificationBanner size="large" level="official_sensitive" />)

    expect(container.firstChild).toHaveClass('bg-[#2B71C7]')
  })

  it('should have gray background for protective_marking_not_set level', () => {
    const { container } = render(<ClassificationBanner size="large" level="protective_marking_not_set" />)

    expect(container.firstChild).toHaveClass('bg-[#616161]')
  })

  it('should have amber background for secret level', () => {
    const { container } = render(<ClassificationBanner size="large" level="secret" />)

    expect(container.firstChild).toHaveClass('bg-[#F39C2C]')
  })

  it('should have red background for top_secret level', () => {
    const { container } = render(<ClassificationBanner size="large" level="top_secret" />)

    expect(container.firstChild).toHaveClass('bg-[#AA0000]')
  })

  it('should apply large font size when size is large', () => {
    render(<ClassificationBanner size="large" level="official_sensitive" />)

    expect(screen.getByText('Official-Sensitive')).toHaveClass('text-[27px]')
  })

  it('should apply medium font size when size is medium', () => {
    render(<ClassificationBanner size="medium" level="official_sensitive" />)

    expect(screen.getByText('Official-Sensitive')).toHaveClass('text-[18px]')
  })

  it('should not apply any conditional font size for other size values', () => {
    render(<ClassificationBanner size="small" level="official_sensitive" />)
    const paragraph = screen.getByText('Official-Sensitive')

    expect(paragraph).not.toHaveClass('text-[27px]')
    expect(paragraph).not.toHaveClass('text-[18px]')
  })

  it('should always apply base classes regardless of size', () => {
    render(<ClassificationBanner size="unknown" level="official_sensitive" />)
    const paragraph = screen.getByText('Official-Sensitive')

    expect(paragraph).toHaveClass('font-open-sans')
    expect(paragraph).toHaveClass('font-bold')
    expect(paragraph).toHaveClass('uppercase')
    expect(paragraph).toHaveClass('text-white')
  })

  it('should render with empty size', () => {
    render(<ClassificationBanner size="" level="official_sensitive" />)

    expect(screen.getByText('Official-Sensitive')).toBeInTheDocument()
  })
})
