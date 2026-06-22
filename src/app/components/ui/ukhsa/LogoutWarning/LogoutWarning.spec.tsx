import { act, fireEvent, render, screen } from '@/config/test-utils'

import LogoutWarning from './LogoutWarning'

// Minute timeouts to use in the tests
jest.mock('@/config/constants', () => ({
  logoutThresholdMinutes: 2,
  logoutWarningThresholdMinutes: 1,
}))

const { logoutThresholdMinutes, logoutWarningThresholdMinutes } = jest.requireMock('@/config/constants')

//  Same as above, but in micro seconds
const WARNING_COUNTDOWN = logoutWarningThresholdMinutes * 60 * 1000
const IDLE_BEFORE_WARNING = (logoutThresholdMinutes - logoutWarningThresholdMinutes) * 60 * 1000
const HALF_IDLE_BEFORE_WARNING = IDLE_BEFORE_WARNING / 2

const mockServerSignOut = jest.fn()
jest.mock('@/app/api/auth/auth.actions', () => ({
  serverSignOut: () => mockServerSignOut(),
}))

describe('LogoutWarning', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    mockServerSignOut.mockClear()
  })

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
        jest.advanceTimersByTime(IDLE_BEFORE_WARNING)
      })
      expect(screen.getByText('You will be signed out')).toBeInTheDocument()
    })

    test('hides modal when Stay signed in is clicked', () => {
      render(<LogoutWarning />)
      act(() => {
        jest.advanceTimersByTime(IDLE_BEFORE_WARNING)
      })
      fireEvent.click(screen.getByRole('button', { name: /stay signed in/i }))
      expect(screen.queryByText('You will be signed out')).not.toBeInTheDocument()
    })
  })

  describe('countdown', () => {
    test('displays correct initial countdown time', () => {
      render(<LogoutWarning timeoutMinutes={logoutThresholdMinutes} warningMinutes={logoutWarningThresholdMinutes} />)

      act(() => {
        jest.advanceTimersByTime(IDLE_BEFORE_WARNING)
      })

      expect(screen.getByText(/01:00 Minutes/)).toBeInTheDocument()
    })

    test('countdown ticks down every second', () => {
      render(<LogoutWarning timeoutMinutes={logoutThresholdMinutes} warningMinutes={logoutWarningThresholdMinutes} />)

      act(() => {
        jest.advanceTimersByTime(IDLE_BEFORE_WARNING)
      })

      act(() => {
        jest.advanceTimersByTime(5 * 1000)
      })

      expect(screen.getByText(/00:55 Minutes/)).toBeInTheDocument()
    })

    test('resets countdown after Stay signed in is clicked', () => {
      render(<LogoutWarning timeoutMinutes={logoutThresholdMinutes} warningMinutes={logoutWarningThresholdMinutes} />)

      act(() => {
        jest.advanceTimersByTime(IDLE_BEFORE_WARNING)
      })

      act(() => {
        jest.advanceTimersByTime(10 * 1000)
      })

      fireEvent.click(screen.getByRole('button', { name: /stay signed in/i }))

      act(() => {
        jest.advanceTimersByTime(IDLE_BEFORE_WARNING)
      })

      expect(screen.getByText(/01:00 Minutes/)).toBeInTheDocument()
    })

    test('calls serverSignOut when countdown reaches zero', () => {
      render(<LogoutWarning timeoutMinutes={logoutThresholdMinutes} warningMinutes={logoutWarningThresholdMinutes} />)

      act(() => {
        jest.advanceTimersByTime(IDLE_BEFORE_WARNING)
      })

      act(() => {
        jest.advanceTimersByTime(WARNING_COUNTDOWN)
      })

      expect(mockServerSignOut).toHaveBeenCalledTimes(1)
    })

    test('does not call serverSignOut when Stay signed in is clicked', () => {
      render(<LogoutWarning timeoutMinutes={logoutThresholdMinutes} warningMinutes={logoutWarningThresholdMinutes} />)

      act(() => {
        jest.advanceTimersByTime(IDLE_BEFORE_WARNING)
      })

      fireEvent.click(screen.getByRole('button', { name: /stay signed in/i }))

      act(() => {
        jest.advanceTimersByTime(WARNING_COUNTDOWN)
      })

      expect(mockServerSignOut).not.toHaveBeenCalled()
    })
  })

  describe('inactivity reset', () => {
    test('resets inactivity timer on mousemove', () => {
      render(<LogoutWarning timeoutMinutes={logoutThresholdMinutes} warningMinutes={logoutWarningThresholdMinutes} />)

      act(() => {
        jest.advanceTimersByTime(HALF_IDLE_BEFORE_WARNING)
      })

      fireEvent.mouseMove(window)

      act(() => {
        jest.advanceTimersByTime(HALF_IDLE_BEFORE_WARNING)
      })

      expect(screen.queryByText('You will be signed out')).not.toBeInTheDocument()
    })

    test('resets inactivity timer on keydown', () => {
      render(<LogoutWarning timeoutMinutes={logoutThresholdMinutes} warningMinutes={logoutWarningThresholdMinutes} />)

      act(() => {
        jest.advanceTimersByTime(HALF_IDLE_BEFORE_WARNING)
      })

      fireEvent.keyDown(window)

      act(() => {
        jest.advanceTimersByTime(HALF_IDLE_BEFORE_WARNING)
      })

      expect(screen.queryByText('You will be signed out')).not.toBeInTheDocument()
    })

    test('does not reset inactivity timer when modal is visible', () => {
      render(<LogoutWarning timeoutMinutes={logoutThresholdMinutes} warningMinutes={logoutWarningThresholdMinutes} />)

      act(() => {
        jest.advanceTimersByTime(IDLE_BEFORE_WARNING)
      })

      fireEvent.mouseMove(window)

      expect(screen.getByText('You will be signed out')).toBeInTheDocument()
    })
  })

  describe('tab sync', () => {
    test('hides modal when activity is detected in another tab', () => {
      render(<LogoutWarning timeoutMinutes={logoutThresholdMinutes} warningMinutes={logoutWarningThresholdMinutes} />)

      act(() => {
        jest.advanceTimersByTime(IDLE_BEFORE_WARNING)
      })

      expect(screen.getByText('You will be signed out')).toBeInTheDocument()

      act(() => {
        window.dispatchEvent(
          new StorageEvent('storage', {
            key: 'lastActivity',
            newValue: Date.now().toString(),
          })
        )
      })

      expect(screen.queryByText('You will be signed out')).not.toBeInTheDocument()
    })

    test('does not react to unrelated storage events', () => {
      render(<LogoutWarning timeoutMinutes={logoutThresholdMinutes} warningMinutes={logoutWarningThresholdMinutes} />)

      act(() => {
        jest.advanceTimersByTime(IDLE_BEFORE_WARNING)
      })

      act(() => {
        window.dispatchEvent(new StorageEvent('storage', { key: 'someOtherKey', newValue: 'value' }))
      })

      expect(screen.getByText('You will be signed out')).toBeInTheDocument()
    })
  })

  describe('logout countdown recovery when tab is asleep', () => {
    // Simulates the user switching away from the tab, then coming back:
    // jest.setSystemTime moves Date.now() forward WITHOUT firing any timers,
    // just like a real browser suspending JavaScript in a hidden tab.
    // The visibilitychange then simulates the user returning.
    const switchAwayFromTabThenReturn = (awayInMicroSeconds: number) => {
      Object.defineProperty(document, 'hidden', { value: true, configurable: true })
      jest.setSystemTime(Date.now() + awayInMicroSeconds)
      Object.defineProperty(document, 'hidden', { value: false, configurable: true })
      window.dispatchEvent(new Event('visibilitychange'))
    }

    test('snaps countdown back to real remaining time in the warning modal when returning to the tab', () => {
      render(<LogoutWarning timeoutMinutes={logoutThresholdMinutes} warningMinutes={logoutWarningThresholdMinutes} />)

      act(() => {
        jest.advanceTimersByTime(IDLE_BEFORE_WARNING)
      })

      expect(screen.getByText(/01:00 Minutes/)).toBeInTheDocument()

      act(() => {
        switchAwayFromTabThenReturn(50 * 1000)
      })

      // 60s countdown minus 50s away = 10s remaining
      expect(screen.getByText(/00:10 Minutes/)).toBeInTheDocument()
    })

    test('shows warning immediately if idle threshold passed whilst the tab was hidden but logout threshold is not reached yet', () => {
      render(<LogoutWarning timeoutMinutes={logoutThresholdMinutes} warningMinutes={logoutWarningThresholdMinutes} />)

      // User switches away before the idle-before-warning period has
      // elapsed, but stays away long enough for it to have passed.
      act(() => {
        switchAwayFromTabThenReturn(IDLE_BEFORE_WARNING + WARNING_COUNTDOWN / 2)
      })

      expect(screen.getByText('You will be signed out')).toBeInTheDocument()
    })

    test('triggers logout immediately if logout threshold has been reached whilst the tab was hidden', () => {
      render(<LogoutWarning timeoutMinutes={logoutThresholdMinutes} warningMinutes={logoutWarningThresholdMinutes} />)

      // Only stay on the page for an initial 5s
      act(() => {
        jest.advanceTimersByTime(5 * 1000)
      })

      act(() => {
        switchAwayFromTabThenReturn(IDLE_BEFORE_WARNING + WARNING_COUNTDOWN)
      })

      expect(mockServerSignOut).toHaveBeenCalledTimes(1)
    })
  })
})
