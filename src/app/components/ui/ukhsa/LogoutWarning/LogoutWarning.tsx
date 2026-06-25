'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { serverSignOut } from '@/app/api/auth/auth.actions'
import { logoutThresholdMinutes, logoutWarningThresholdMinutes } from '@/config/constants'
interface LogoutWarningProps {
  timeoutMinutes?: number
  warningMinutes?: number
}

export default function LogoutWarning({
  timeoutMinutes = logoutThresholdMinutes,
  warningMinutes = logoutWarningThresholdMinutes,
}: LogoutWarningProps) {
  const [secondsLeft, setSecondsLeft] = useState(warningMinutes * 60)
  const [visible, setVisible] = useState(false)

  // The logoutAtRef contains real clock time (ms) when sign-out will happen.
  // Reading Date.now() against this keeps the countdown correct, even
  // when the browser pauses timers in a background tab when going to sleep.
  const logoutAtRef = useRef<number>(0)
  const inactivityTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const countdownInterval = useRef<ReturnType<typeof setInterval> | null>(null)
  const visibleRef = useRef(false)

  const clearTimers = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current)
    if (countdownInterval.current) clearInterval(countdownInterval.current)
    inactivityTimer.current = null
    countdownInterval.current = null
  }, [])

  const triggerLogout = useCallback(async () => {
    clearTimers()
    serverSignOut('/logged-out')
  }, [clearTimers])

  /**
   * Show logout warning modal with countdown minutes.
   *
   * @param logoutAt (optional): Allows to pass a backdated
   * deadline, so the countdown reflects real remaining time.
   */
  const startCountdown = useCallback(
    (logoutAt = Date.now() + warningMinutes * 60 * 1000) => {
      if (countdownInterval.current) clearInterval(countdownInterval.current)

      logoutAtRef.current = logoutAt
      setSecondsLeft(Math.ceil((logoutAt - Date.now()) / 1000))
      setVisible(true)
      visibleRef.current = true

      countdownInterval.current = setInterval(() => {
        const remaining = Math.max(0, Math.ceil((logoutAtRef.current - Date.now()) / 1000))
        remaining === 0 ? triggerLogout() : setSecondsLeft(remaining)
      }, 1000)
    },
    [warningMinutes, triggerLogout]
  )

  const scheduleWarning = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current)
    const idleBeforeWarning = (timeoutMinutes - warningMinutes) * 60 * 1000
    inactivityTimer.current = setTimeout(startCountdown, idleBeforeWarning)
  }, [timeoutMinutes, warningMinutes, startCountdown])

  const resetInactivityTimer = useCallback(() => {
    if (visibleRef.current) return
    localStorage.setItem('lastActivity', Date.now().toString())
    scheduleWarning()
  }, [scheduleWarning])

  useEffect(() => {
    const events = ['mousemove', 'keydown', 'mousedown', 'touchstart', 'scroll']
    events.forEach((e) => window.addEventListener(e, resetInactivityTimer))
    localStorage.setItem('lastActivity', Date.now().toString())
    scheduleWarning()

    // Fires the instant the user switches back to this tab.
    // Corrects for time that passed while the browser slept and paused our timers.
    const onVisibilityChange = () => {
      if (document.hidden) return

      if (visibleRef.current) {
        // Modal is already showing, so snap the countdown to real remaining time.
        // Example: User left with 1:45 min showing and was away 90 seconds, then now show 0:15.
        const remaining = Math.max(0, Math.ceil((logoutAtRef.current - Date.now()) / 1000))
        remaining === 0 ? triggerLogout() : setSecondsLeft(remaining)
      } else {
        const lastActivity = Number(localStorage.getItem('lastActivity')) || Date.now()
        const idleSeconds = (Date.now() - lastActivity) / 1000

        // Modal is not yet showing, so check how long the user has been idle
        if (idleSeconds >= timeoutMinutes * 60) {
          // Idle for longer than the full logout threshold, then log out now
          triggerLogout()
        } else if (idleSeconds >= (timeoutMinutes - warningMinutes) * 60) {
          // Idle past the warning threshold but not the full logout threshold, then show modal.
          // Pass the backdated deadline so the countdown reflects the real remaining time.
          startCountdown(lastActivity + timeoutMinutes * 60 * 1000)
        }
      }
    }

    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      events.forEach((e) => window.removeEventListener(e, resetInactivityTimer))
      document.removeEventListener('visibilitychange', onVisibilityChange)
      clearTimers()
    }
  }, [
    scheduleWarning,
    resetInactivityTimer,
    clearTimers,
    triggerLogout,
    startCountdown,
    timeoutMinutes,
    warningMinutes,
  ])

  const handleStaySignedIn = useCallback(() => {
    clearTimers()
    setVisible(false)
    visibleRef.current = false
    localStorage.setItem('lastActivity', Date.now().toString())
    scheduleWarning()
  }, [clearTimers, scheduleWarning])

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== 'lastActivity') return
      if (visibleRef.current) {
        clearTimers()
        setVisible(false)
        visibleRef.current = false
      }
      scheduleWarning()
    }

    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [scheduleWarning, clearTimers])

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
            <button type="button" className="govuk-button govuk-button--start" onClick={handleStaySignedIn}>
              Stay signed in
              <svg
                className="govuk-button__start-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="17.5"
                height="19"
                viewBox="0 0 33 40"
              >
                <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
