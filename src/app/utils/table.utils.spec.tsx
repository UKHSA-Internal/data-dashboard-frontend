import { render, screen } from '@/config/test-utils'

import { getColumnHeader } from './table.utils'

jest.mock('@/config/constants', () => ({
  ...jest.requireActual('@/config/constants'),
  authEnabled: true,
}))

const renderHeader = (
  chartLabel: string,
  axisTitle: string,
  fallback: string,
  isPublic?: boolean,
  level?: 'official' | 'official_sensitive' | 'protective_marking_not_set' | 'secret' | 'top_secret'
) => render(<>{getColumnHeader(chartLabel, axisTitle, fallback, isPublic, level)}</>)

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
      renderHeader('Label', '', 'Fallback', false)
      expect(screen.getByText(/Official-Sensitive/i)).toBeInTheDocument()
    })

    test('does not render sensitive label when isPublic is true', () => {
      renderHeader('Label', '', 'Fallback', true)
      expect(screen.queryByText(/Official-Sensitive/i)).not.toBeInTheDocument()
    })

    test('does not render sensitive label when isPublic is undefined', () => {
      renderHeader('Label', '', 'Fallback')
      expect(screen.queryByText(/Official-Sensitive/i)).not.toBeInTheDocument()
    })
  })

  describe('level content', () => {
    test('defaults to official_sensitive level', () => {
      renderHeader('Label', '', 'Fallback', false)
      expect(screen.getByText(/Official-Sensitive/i)).toBeInTheDocument()
    })

    test('renders correct text for official level', () => {
      renderHeader('Label', '', 'Fallback', false, 'official')
      expect(screen.getByText(/Official$/i)).toBeInTheDocument()
    })

    test('renders correct text for protective_marking_not_set level', () => {
      renderHeader('Label', '', 'Fallback', false, 'protective_marking_not_set')
      expect(screen.getByText(/Protective marking not set/i)).toBeInTheDocument()
    })

    test('renders correct text for secret level', () => {
      renderHeader('Label', '', 'Fallback', false, 'secret')
      expect(screen.getByText(/Secret$/i)).toBeInTheDocument()
    })

    test('renders correct text for top_secret level', () => {
      renderHeader('Label', '', 'Fallback', false, 'top_secret')
      expect(screen.getByText(/Top Secret/i)).toBeInTheDocument()
    })
  })

  describe('authEnabled', () => {
    test('renders sensitive label when authEnabled is true and isPublic is false', () => {
      // authEnabled: true is set at the top-level mock above
      renderHeader('Label', '', 'Fallback', false, 'official_sensitive')
      expect(screen.getByText(/Official-Sensitive/i)).toBeInTheDocument()
    })

    test('does not render sensitive label when authEnabled is true but isPublic is true', () => {
      renderHeader('Label', '', 'Fallback', true, 'official_sensitive')
      expect(screen.queryByText(/Official-Sensitive/i)).not.toBeInTheDocument()
    })
  })
  describe('authEnabled is false', () => {
    beforeEach(() => {
      jest.resetModules()
      jest.doMock('@/config/constants', () => ({
        ...jest.requireActual('@/config/constants'),
        authEnabled: false,
      }))
    })

    afterEach(() => {
      jest.resetModules()
    })

    test('does not render sensitive label even when isPublic is false', async () => {
      const { getColumnHeader: freshGetColumnHeader } = await import('./table.utils')
      render(<>{freshGetColumnHeader('Label', '', 'Fallback', false, 'official_sensitive')}</>)
      expect(screen.queryByText(/Official-Sensitive/i)).not.toBeInTheDocument()
    })
  })
})
