import type { DataClassification } from '@/api/models/DataClassification'
import { render, screen } from '@/config/test-utils'

import { getColumnHeader } from './table.utils'

const renderHeader = (
  chartLabel: string,
  axisTitle: string,
  fallback: string,
  isNonPublic?: boolean,
  level?: DataClassification
) => render(<>{getColumnHeader(chartLabel, axisTitle, fallback, isNonPublic, level)}</>)

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

  describe('sensitive label visibility', () => {
    test('renders sensitive label when isNonPublic is true', () => {
      renderHeader('Label', '', 'Fallback', true, 'official_sensitive')
      expect(screen.getByText(/Official-Sensitive/i)).toBeInTheDocument()
    })

    test('does not render sensitive label when isNonPublic is false', () => {
      renderHeader('Label', '', 'Fallback', false, 'official_sensitive')
      expect(screen.queryByText(/Official-Sensitive/i)).not.toBeInTheDocument()
    })

    test('does not render sensitive label when isNonPublic is undefined', () => {
      renderHeader('Label', '', 'Fallback', undefined, 'official_sensitive')
      expect(screen.queryByText(/Official-Sensitive/i)).not.toBeInTheDocument()
    })
  })

  describe('level content', () => {
    test('defaults to official_sensitive level', () => {
      renderHeader('Label', '', 'Fallback', true, undefined)
      expect(screen.getByText(/Official-Sensitive/i)).toBeInTheDocument()
    })

    test('renders correct text for official level', () => {
      renderHeader('Label', '', 'Fallback', true, 'official')
      expect(screen.getByText(/Official$/i)).toBeInTheDocument()
    })

    test('renders correct text for protective_marking_not_set level', () => {
      renderHeader('Label', '', 'Fallback', true, 'protective_marking_not_set')
      expect(screen.getByText(/Protective marking not set/i)).toBeInTheDocument()
    })

    test('renders correct text for secret level', () => {
      renderHeader('Label', '', 'Fallback', true, 'secret')
      expect(screen.getByText(/Secret$/i)).toBeInTheDocument()
    })

    test('renders correct text for top_secret level', () => {
      renderHeader('Label', '', 'Fallback', true, 'top_secret')
      expect(screen.getByText(/Top Secret/i)).toBeInTheDocument()
    })
  })

  describe('isNonPublic', () => {
    test('does not render sensitive label when isNonPublic is false', () => {
      renderHeader('Label', '', 'Fallback', false, 'official_sensitive')
      expect(screen.queryByText(/Official-Sensitive/i)).not.toBeInTheDocument()
    })

    test('renders sensitive label when isNonPublic is true', () => {
      renderHeader('Label', '', 'Fallback', true, 'official_sensitive')
      expect(screen.getByText(/Official-Sensitive/i)).toBeInTheDocument()
    })

    test('does not render sensitive label when isNonPublic is undefined', () => {
      renderHeader('Label', '', 'Fallback', undefined, 'official_sensitive')
      expect(screen.queryByText(/Official-Sensitive/i)).not.toBeInTheDocument()
    })
  })
})
