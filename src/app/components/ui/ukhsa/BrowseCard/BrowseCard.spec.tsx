import { render, screen } from '@testing-library/react'
import React from 'react'

import { BrowseCard, BrowseCardProps } from './BrowseCard'

describe('BrowseCard Component', () => {
  const defaultProps: BrowseCardProps = {
    href: '/sample-link',
    name: 'Sample Card',
    description: 'Sample description for testing',
  }

  test('renders correctly', () => {
    render(<BrowseCard {...defaultProps} />)

    expect(screen.getByRole('link', { name: defaultProps.name })).toHaveAttribute('href', defaultProps.href)
    expect(screen.getByText(defaultProps.description)).toBeInTheDocument()
  })
})
