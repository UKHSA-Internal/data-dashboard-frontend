'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { logoutThresholdMinutes, logoutWarningThresholdMinutes } from '@/config/constants'
interface LogoutWarningProps {
  timeoutMinutes?: number
  warningMinutes?: number
  onStaySignedIn?: () => void
  onSignOut?: () => void
}

export default function LogoutWarning({
  timeoutMinutes = logoutThresholdMinutes,
  warningMinutes = logoutWarningThresholdMinutes,
  onStaySignedIn,
  onSignOut,
}: LogoutWarningProps) {
  const [secondsLeft, setSecondsLeft] = useState(warningMinutes * 60)
  const [visible, setVisible] = useState(false)

  const inactivityTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const countdownInterval = useRef<ReturnType<typeof setInterval> | null>(null)
  const visibleRef = useRef(false)

  const clearTimers = () => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current)
    if (countdownInterval.current) clearInterval(countdownInterval.current)
    inactivityTimer.current = null
    countdownInterval.current = null
  }

  const startCountdown = useCallback(() => {
    setSecondsLeft(warningMinutes * 60)
    setVisible(true)
    visibleRef.current = true

    countdownInterval.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(countdownInterval.current!)
          countdownInterval.current = null
          onSignOut?.()
          return 0
        }
        return s - 1
      })
    }, 1000)
  }, [warningMinutes, onSignOut])

  const scheduleWarning = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current)
    const idleBeforeWarning = (timeoutMinutes - warningMinutes) * 60 * 1000
    inactivityTimer.current = setTimeout(startCountdown, idleBeforeWarning)
  }, [timeoutMinutes, warningMinutes, startCountdown])

  const resetInactivityTimer = useCallback(() => {
    if (visibleRef.current) return // ← use ref, not state
    scheduleWarning()
  }, [scheduleWarning])

  useEffect(() => {
    const events = ['mousemove', 'keydown', 'mousedown', 'touchstart', 'scroll']
    events.forEach((e) => window.addEventListener(e, resetInactivityTimer))
    scheduleWarning()

    return () => {
      events.forEach((e) => window.removeEventListener(e, resetInactivityTimer))
      clearTimers()
    }
  }, [])

  const handleStaySignedIn = useCallback(() => {
    clearTimers()
    setVisible(false)
    visibleRef.current = false
    onStaySignedIn?.()
    scheduleWarning()
  }, [onStaySignedIn, scheduleWarning])

  const mins = String(Math.floor(secondsLeft / 60)).padStart(2, '0')
  const secs = String(secondsLeft % 60).padStart(2, '0')

  if (!visible) return null

  return (
    <div className="logoutWarningContainer fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="overflow-hidden rounded-sm bg-white shadow-2xl">
        <div className="govuk-!-padding-6">
          <h2 className="govuk-heading-l govuk-!-margin-bottom-2">You will be signed out</h2>
          <p className="text-sm text-gray-500 mb-6 leading-relaxed">
            You have been inactive for some time and will be signed out in:{' '}
            <strong>
              {mins}:{secs} Minutes
            </strong>
          </p>
          <div className="flex items-center gap-6">
            <button type="submit" className="govuk-button govuk-!-margin-0" onClick={handleStaySignedIn}>
              Stay signed in
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
