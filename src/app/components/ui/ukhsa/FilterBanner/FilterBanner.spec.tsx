import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom'

import { FilterBanner } from './FilterBanner'
 
// Mock translation hook

jest.mock('@/app/i18n/client', () => ({

  useTranslation: () => ({

    t: (key: string) => key, // basic mock

  }),

}))
 
describe('FilterBanner', () => {

  it('renders the banner with the provided message', () => {

    const testMessage = '<strong>Test banner message</strong>'

    render(<FilterBanner message={testMessage} />)
 
    // Check if the HTML content is rendered

    expect(screen.getByText('Test banner message')).toBeInTheDocument()

    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument() // matches SVG

  })
 
  it('renders the icon and correct classes', () => {

    const testMessage = 'Simple message'

    const { container } = render(<FilterBanner message={testMessage} />)
 
    // Check for the SVG element

    const svg = container.querySelector('svg')

    expect(svg).toBeInTheDocument()
 
    // Check for banner styling

    expect(container.firstChild).toHaveClass('flex', 'bg-blue', 'text-white')

  })

})

 