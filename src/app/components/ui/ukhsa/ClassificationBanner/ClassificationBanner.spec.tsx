import React from 'react'

import { render, screen } from '@/config/test-utils'

import ClassificationBanner from './ClassificationBanner'

describe('ClassificationBanner', () => {
  it('should render without crashing', () => {
    render(<ClassificationBanner content="official" />)
    expect(screen.getByText('official')).toBeInTheDocument()
  })

  it('should display the provided content', () => {
    const testContent = 'official-sensitive'
    render(<ClassificationBanner content={testContent} />)
    expect(screen.getByText(testContent)).toBeInTheDocument()
  })

  it('should apply correct container CSS classes', () => {
    const { container } = render(<ClassificationBanner content="official" />)
    const banner = container.querySelector('div')

    expect(banner).toHaveClass('bg-[#1D70B8]')
  })

  it('should have blue background color', () => {
    const { container } = render(<ClassificationBanner content="official" />)
    const banner = container.querySelector('div')

    expect(banner).toHaveClass('bg-[#1D70B8]')
  })

  it('should render text in uppercase', () => {
    const { container } = render(<ClassificationBanner content="official" />)
    const paragraph = container.querySelector('p')

    expect(paragraph).toHaveClass('uppercase')
  })

  it('should render text in white color', () => {
    const { container } = render(<ClassificationBanner content="official" />)
    const paragraph = container.querySelector('p')

    expect(paragraph).toHaveClass('text-white')
  })

  it('should render text in bold', () => {
    const { container } = render(<ClassificationBanner content="official" />)
    const paragraph = container.querySelector('p')

    expect(paragraph).toHaveClass('font-bold')
  })

  it('should render multiple instances independently', () => {
    const { rerender } = render(<ClassificationBanner content="official" />)
    expect(screen.getByText('official')).toBeInTheDocument()

    rerender(<ClassificationBanner content="secret" />)
    expect(screen.getByText('secret')).toBeInTheDocument()
    expect(screen.queryByText('official')).not.toBeInTheDocument()
  })

  it('should update when content prop changes', () => {
    const { rerender } = render(<ClassificationBanner content="Initial" />)
    expect(screen.getByText('Initial')).toBeInTheDocument()

    rerender(<ClassificationBanner content="Updated" />)
    expect(screen.getByText('Updated')).toBeInTheDocument()
    expect(screen.queryByText('Initial')).not.toBeInTheDocument()
  })
})
