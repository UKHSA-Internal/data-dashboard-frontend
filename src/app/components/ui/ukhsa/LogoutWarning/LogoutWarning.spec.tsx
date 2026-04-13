import { act, fireEvent, render, screen } from '@/config/test-utils'

import LogoutWarning from './LogoutWarning'

jest.mock('@/config/constants', () => ({
  logoutThresholdMinutes: 2,
  logoutWarningThresholdMinutes: 1,
}))

describe('LogoutWarning', () => {
  beforeEach(() => jest.useFakeTimers())
  afterEach(() => {
    jest.useRealTimers()
    jest.clearAllMocks()
  })

  describe('visibility', () => {
    test('does not show modal on initial render', () => {
      render(<LogoutWarning />)
      expect(screen.queryByText('You will be signed out')).not.toBeInTheDocument()
    })

    test('shows modal after inactivity timeout', () => {
      render(<LogoutWarning />)
      act(() => {
        jest.advanceTimersByTime(1 * 60 * 1000)
      })
      expect(screen.getByText('You will be signed out')).toBeInTheDocument()
    })

    test('hides modal when Stay signed in is clicked', () => {
      render(<LogoutWarning />)
      act(() => {
        jest.advanceTimersByTime(1 * 60 * 1000)
      })
      fireEvent.click(screen.getByRole('button', { name: /stay signed in/i }))
      expect(screen.queryByText('You will be signed out')).not.toBeInTheDocument()
    })
  })

  describe('countdown', () => {
    test('displays correct initial countdown time', () => {
      render(<LogoutWarning timeoutMinutes={2} warningMinutes={1} />)

      act(() => {
        jest.advanceTimersByTime(1 * 60 * 1000)
      })

      expect(screen.getByText(/01:00 Minutes/)).toBeInTheDocument()
    })

    test('countdown ticks down every second', () => {
      render(<LogoutWarning timeoutMinutes={2} warningMinutes={1} />)

      act(() => {
        jest.advanceTimersByTime(1 * 60 * 1000)
      })

      act(() => {
        jest.advanceTimersByTime(5000)
      })

      expect(screen.getByText(/00:55 Minutes/)).toBeInTheDocument()
    })

    test('resets countdown after Stay signed in is clicked', () => {
      render(<LogoutWarning timeoutMinutes={2} warningMinutes={1} />)

      act(() => {
        jest.advanceTimersByTime(1 * 60 * 1000)
      })

      act(() => {
        jest.advanceTimersByTime(10000)
      })

      fireEvent.click(screen.getByRole('button', { name: /stay signed in/i }))

      act(() => {
        jest.advanceTimersByTime(1 * 60 * 1000)
      })

      expect(screen.getByText(/01:00 Minutes/)).toBeInTheDocument()
    })
  })

  describe('inactivity reset', () => {
    test('resets inactivity timer on mousemove', () => {
      render(<LogoutWarning timeoutMinutes={2} warningMinutes={1} />)

      act(() => {
        jest.advanceTimersByTime(30000)
      })

      fireEvent.mouseMove(window)

      act(() => {
        jest.advanceTimersByTime(30000)
      })

      expect(screen.queryByText('You will be signed out')).not.toBeInTheDocument()
    })

    test('resets inactivity timer on keydown', () => {
      render(<LogoutWarning timeoutMinutes={2} warningMinutes={1} />)

      act(() => {
        jest.advanceTimersByTime(30000)
      })

      fireEvent.keyDown(window)

      act(() => {
        jest.advanceTimersByTime(30000)
      })

      expect(screen.queryByText('You will be signed out')).not.toBeInTheDocument()
    })

    test('does not reset inactivity timer when modal is visible', () => {
      render(<LogoutWarning timeoutMinutes={2} warningMinutes={1} />)

      act(() => {
        jest.advanceTimersByTime(1 * 60 * 1000)
      })

      fireEvent.mouseMove(window)

      expect(screen.getByText('You will be signed out')).toBeInTheDocument()
    })
  })
})
