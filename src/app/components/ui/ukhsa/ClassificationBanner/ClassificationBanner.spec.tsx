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

  it('should apply correct paragraph CSS classes', () => {
    const { container } = render(<ClassificationBanner content="official" />)
    const paragraph = container.querySelector('p')

    expect(paragraph).toHaveClass('uppercase')
    expect(paragraph).toHaveClass('font-sans')
    expect(paragraph).toHaveClass('text-white')
    expect(paragraph).toHaveClass('font-bold')
    expect(paragraph).toHaveClass('text-[27px]')
    expect(paragraph).toHaveClass('mt-[4px]')
    expect(paragraph).toHaveClass('pl-[10px]')
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

  it('should have correct structure with div containing paragraph', () => {
    const { container } = render(<ClassificationBanner content="official" />)
    const banner = container.querySelector('div')
    const paragraph = banner?.querySelector('p')

    expect(banner).toBeInTheDocument()
    expect(paragraph).toBeInTheDocument()
    expect(paragraph?.textContent).toBe('official')
  })

  it('should preserve whitespace in content', () => {
    const contentWithSpaces = 'official   sensitive'
    render(<ClassificationBanner content={contentWithSpaces} />)
    expect(screen.getByText(contentWithSpaces)).toBeInTheDocument()
  })

  it('should handle content with numbers', () => {
    const contentWithNumbers = 'official-2024'
    render(<ClassificationBanner content={contentWithNumbers} />)
    expect(screen.getByText(contentWithNumbers)).toBeInTheDocument()
  })
})
