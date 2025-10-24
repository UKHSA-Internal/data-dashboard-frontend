import { render, screen } from '@/config/test-utils'

import { TextCard } from './TextCard'

jest.mock('react-plotly.js', () => ({
  default: () => <div data-testid="mock-plotly-chart">Mocked Plotly Chart</div>,
}))

Object.defineProperty(window, 'URL', {
  value: {
    createObjectURL: jest.fn(() => 'mock-object-url'),
    revokeObjectURL: jest.fn(),
  },
  writable: true,
})

// Mock RichText component
jest.mock('@/app/components/cms', () => ({
  ...jest.requireActual('@/app/components/cms'),
  RichText: ({ children }: { children: string }) => <div dangerouslySetInnerHTML={{ __html: children }} />,
}))

describe('TextCard', () => {
  test('renders text card content correctly', () => {
    const mockValue = {
      body: '<div><h3>Text card heading</h3><p>Text card body</p></div>',
    }

    render(<TextCard value={mockValue} />)

    expect(screen.getByText('Text card heading')).toBeInTheDocument()
    expect(screen.getByText('Text card body')).toBeInTheDocument()
  })

  test('renders unordered list correctly', () => {
    const mockValue = {
      body: '<div><ul><li>bullet point one</li><li>bullet point two</li></ul></div>',
    }

    render(<TextCard value={mockValue} />)

    expect(screen.getByText('bullet point one')).toBeInTheDocument()
    expect(screen.getByText('bullet point two')).toBeInTheDocument()
  })
})
