import React from 'react'

import { render, screen } from '@/config/test-utils'

import { Details } from './Details'

const label = 'View data in a tabular format'

test('renders the label and child content', () => {
  const childContent = 'Child content'

  render(
    <Details label={label}>
      <p>{childContent}</p>
    </Details>
  )

  const summary = screen.getByText(label)
  const content = screen.getByText(childContent)

  expect(summary).toBeInTheDocument()
  expect(content).toBeInTheDocument()
})

test('applies additional className and attributes', () => {
  const className = 'custom-class'
  const dataTestId = 'details-component'

  render(
    <Details label={label} className={className} data-testid={dataTestId}>
      <p>Child content</p>
    </Details>
  )

  const component = screen.getByTestId(dataTestId)

  expect(component).toHaveClass(className)
})
