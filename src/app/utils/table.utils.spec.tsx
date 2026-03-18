import { render, screen } from '@/config/test-utils'

import { getColumnHeader } from './table.utils'

const renderHeader = (chartLabel: string, axisTitle: string, fallback: string, isPublic?: boolean) =>
  render(<>{getColumnHeader(chartLabel, axisTitle, fallback, isPublic)}</>)

describe('getColumnHeader', () => {
  describe('label priority', () => {
    test('uses chartLabel when provided', () => {
      renderHeader('Chart Label', 'Axis Title', 'Fallback')
      expect(screen.getByText(/Chart Label/)).toBeInTheDocument()
    })

    test('falls back to axisTitle when chartLabel is empty', () => {
      renderHeader('', 'Axis Title', 'Fallback')
      expect(screen.getByText(/Axis Title/)).toBeInTheDocument()
    })

    test('falls back to fallback when both chartLabel and axisTitle are empty', () => {
      renderHeader('', '', 'Fallback')
      expect(screen.getByText(/Fallback/)).toBeInTheDocument()
    })
  })

  describe('OFFICIAL-SENSITIVE label', () => {
    test('renders when isPublic is false', () => {
      renderHeader('Label', '', 'Fallback', false)
      expect(screen.getByText(/OFFICIAL-SENSITIVE/)).toBeInTheDocument()
    })

    test('does not render when isPublic is true', () => {
      renderHeader('Label', '', 'Fallback', true)
      expect(screen.queryByText(/OFFICIAL-SENSITIVE/)).not.toBeInTheDocument()
    })

    test('does not render when isPublic is undefined', () => {
      renderHeader('Label', '', 'Fallback')
      expect(screen.queryByText(/OFFICIAL-SENSITIVE/)).not.toBeInTheDocument()
    })
  })
})
