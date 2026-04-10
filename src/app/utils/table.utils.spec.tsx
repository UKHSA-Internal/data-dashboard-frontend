import { render, screen } from '@/config/test-utils'

import { getColumnHeader, getDataClassification } from './table.utils'

const renderHeader = (
  chartLabel: string,
  axisTitle: string,
  fallback: string,
  isPublic?: boolean,
  level?: 'official' | 'official_sensitive' | 'protective_marking_not_set' | 'secret' | 'top_secret',
  authEnabled?: boolean
) => render(<>{getColumnHeader(chartLabel, axisTitle, fallback, isPublic, level, authEnabled)}</>)

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
    test('renders sensitive label when isPublic is false', () => {
      renderHeader('Label', '', 'Fallback', false, 'official_sensitive', true)
      expect(screen.getByText(/Official-Sensitive/i)).toBeInTheDocument()
    })

    test('does not render sensitive label when isPublic is true', () => {
      renderHeader('Label', '', 'Fallback', true, 'official_sensitive', true)
      expect(screen.queryByText(/Official-Sensitive/i)).not.toBeInTheDocument()
    })

    test('does not render sensitive label when isPublic is undefined', () => {
      renderHeader('Label', '', 'Fallback', undefined, 'official_sensitive', true)
      expect(screen.queryByText(/Official-Sensitive/i)).not.toBeInTheDocument()
    })
  })

  describe('level content', () => {
    test('defaults to official_sensitive level', () => {
      renderHeader('Label', '', 'Fallback', false, undefined, true)
      expect(screen.getByText(/Official-Sensitive/i)).toBeInTheDocument()
    })

    test('renders correct text for official level', () => {
      renderHeader('Label', '', 'Fallback', false, 'official', true)
      expect(screen.getByText(/Official$/i)).toBeInTheDocument()
    })

    test('renders correct text for protective_marking_not_set level', () => {
      renderHeader('Label', '', 'Fallback', false, 'protective_marking_not_set', true)
      expect(screen.getByText(/Protective marking not set/i)).toBeInTheDocument()
    })

    test('renders correct text for secret level', () => {
      renderHeader('Label', '', 'Fallback', false, 'secret', true)
      expect(screen.getByText(/Secret$/i)).toBeInTheDocument()
    })

    test('renders correct text for top_secret level', () => {
      renderHeader('Label', '', 'Fallback', false, 'top_secret', true)
      expect(screen.getByText(/Top Secret/i)).toBeInTheDocument()
    })
  })

  describe('authEnabled', () => {
    test('does not render sensitive label when authEnabled is false, even if isPublic is false', () => {
      renderHeader('Label', '', 'Fallback', false, 'official_sensitive', false)
      expect(screen.queryByText(/Official-Sensitive/i)).not.toBeInTheDocument()
    })

    test('renders sensitive label when authEnabled is true and isPublic is false', () => {
      renderHeader('Label', '', 'Fallback', false, 'official_sensitive', true)
      expect(screen.getByText(/Official-Sensitive/i)).toBeInTheDocument()
    })

    test('does not render sensitive label when authEnabled is true but isPublic is true', () => {
      renderHeader('Label', '', 'Fallback', true, 'official_sensitive', true)
      expect(screen.queryByText(/Official-Sensitive/i)).not.toBeInTheDocument()
    })
  })
})

describe('getDataClassification', () => {
  test('returns empty string when authEnabled is false', () => {
    expect(getDataClassification(false, 'official_sensitive', false)).toBe('')
  })

  test('returns classification when authEnabled is true', () => {
    expect(getDataClassification(false, 'official_sensitive', true)).toBe('(OFFICIAL SENSITIVE)')
  })

  test('returns empty string when isPublic is true', () => {
    expect(getDataClassification(true, 'official_sensitive', true)).toBe('')
  })

  test('returns empty string when isPublic is undefined', () => {
    expect(getDataClassification(undefined, 'official_sensitive', true)).toBe('')
  })

  test('returns uppercase classification wrapped in parentheses for official_sensitive', () => {
    expect(getDataClassification(false, 'official_sensitive', true)).toBe('(OFFICIAL SENSITIVE)')
  })

  test('returns uppercase classification wrapped in parentheses for official', () => {
    expect(getDataClassification(false, 'official', true)).toBe('(OFFICIAL)')
  })

  test('returns uppercase classification wrapped in parentheses for secret', () => {
    expect(getDataClassification(false, 'secret', true)).toBe('(SECRET)')
  })

  test('returns uppercase classification wrapped in parentheses for top_secret', () => {
    expect(getDataClassification(false, 'top_secret', true)).toBe('(TOP SECRET)')
  })

  test('returns uppercase classification wrapped in parentheses for protective_marking_not_set', () => {
    expect(getDataClassification(false, 'protective_marking_not_set', true)).toBe('(PROTECTIVE MARKING NOT SET)')
  })
})
