import { act, fireEvent, render, screen } from '@/config/test-utils'

import LogoutWarning from './LogoutWarning'

describe('LogoutWarning', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
    jest.clearAllMocks()
  })

  describe('visibility', () => {
    test('does not show modal on initial render', () => {
      render(<LogoutWarning timeoutMinutes={2} warningMinutes={1} />)
      expect(screen.queryByText('You will be signed out')).not.toBeInTheDocument()
    })

    test('shows modal after inactivity timeout', () => {
      render(<LogoutWarning timeoutMinutes={2} warningMinutes={1} />)

      act(() => {
        jest.advanceTimersByTime(1 * 60 * 1000) // timeoutMinutes - warningMinutes
      })

      expect(screen.getByText('You will be signed out')).toBeInTheDocument()
    })

    test('hides modal when Stay signed in is clicked', () => {
      render(<LogoutWarning timeoutMinutes={2} warningMinutes={1} />)

      act(() => {
        jest.advanceTimersByTime(1 * 60 * 1000)
      })

      expect(screen.getByText('You will be signed out')).toBeInTheDocument()

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
        jest.advanceTimersByTime(1 * 60 * 1000) // trigger modal
      })

      act(() => {
        jest.advanceTimersByTime(5000) // 5 seconds
      })

      expect(screen.getByText(/00:55 Minutes/)).toBeInTheDocument()
    })

    test('resets countdown after Stay signed in is clicked', () => {
      render(<LogoutWarning timeoutMinutes={2} warningMinutes={1} />)

      act(() => {
        jest.advanceTimersByTime(1 * 60 * 1000)
      })

      act(() => {
        jest.advanceTimersByTime(10000) // tick down 10 seconds
      })

      fireEvent.click(screen.getByRole('button', { name: /stay signed in/i }))

      act(() => {
        jest.advanceTimersByTime(1 * 60 * 1000) // trigger modal again
      })

      expect(screen.getByText(/01:00 Minutes/)).toBeInTheDocument()
    })
  })

  describe('callbacks', () => {
    test('calls onSignOut when countdown reaches zero', () => {
      const onSignOut = jest.fn()
      render(<LogoutWarning timeoutMinutes={2} warningMinutes={1} onSignOut={onSignOut} />)

      act(() => {
        jest.advanceTimersByTime(1 * 60 * 1000) // trigger modal
      })

      act(() => {
        jest.advanceTimersByTime(1 * 60 * 1000) // complete countdown
      })

      expect(onSignOut).toHaveBeenCalledTimes(1)
    })

    test('calls onStaySignedIn when Stay signed in is clicked', () => {
      const onStaySignedIn = jest.fn()
      render(<LogoutWarning timeoutMinutes={2} warningMinutes={1} onStaySignedIn={onStaySignedIn} />)

      act(() => {
        jest.advanceTimersByTime(1 * 60 * 1000)
      })

      fireEvent.click(screen.getByRole('button', { name: /stay signed in/i }))

      expect(onStaySignedIn).toHaveBeenCalledTimes(1)
    })

    test('does not call onSignOut when Stay signed in is clicked before timeout', () => {
      const onSignOut = jest.fn()
      render(<LogoutWarning timeoutMinutes={2} warningMinutes={1} onSignOut={onSignOut} />)

      act(() => {
        jest.advanceTimersByTime(1 * 60 * 1000)
      })

      fireEvent.click(screen.getByRole('button', { name: /stay signed in/i }))

      expect(onSignOut).not.toHaveBeenCalled()
    })
  })

  describe('inactivity reset', () => {
    test('resets inactivity timer on mousemove', () => {
      render(<LogoutWarning timeoutMinutes={2} warningMinutes={1} />)

      act(() => {
        jest.advanceTimersByTime(30000) // 30 seconds in
      })

      fireEvent.mouseMove(window) // user activity

      act(() => {
        jest.advanceTimersByTime(30000) // 30 more seconds — would have triggered without reset
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
        jest.advanceTimersByTime(1 * 60 * 1000) // trigger modal
      })

      fireEvent.mouseMove(window) // activity while modal is open

      expect(screen.getByText('You will be signed out')).toBeInTheDocument() // modal stays
    })
  })
})
