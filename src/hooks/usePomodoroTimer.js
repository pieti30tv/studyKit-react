import { useEffect, useRef, useCallback } from 'react'
import { useTimer } from '../context/TimerContext'
import { useStats } from '../context/StatsContext'
import { useToast } from '../context/ToastContext'
import { useAudioBeep } from './useAudioBeep'
import { useNotification } from './useNotification'
import { secondsToDisplay } from '../utils/dateUtils'
import { MODE_LABELS } from '../utils/constants'

/**
 * Drives the Pomodoro timer with Date.now()-based drift prevention.
 * Exposes start / pause / reset actions.
 */
export function usePomodoroTimer() {
  const {
    mode, isRunning, secondsLeft,
    setIsRunning, setSecondsLeft,
    changeMode, reset: ctxReset, onSessionComplete, linkedTaskId,
  } = useTimer()

  const { recordPomodoro } = useStats()
  const { showToast }      = useToast()
  const { beep, warmUp }   = useAudioBeep()
  const { notify }         = useNotification()

  // Tracks when the current interval started and how many seconds were left at that point
  const startTimeRef    = useRef(null)
  const startSecondsRef = useRef(null)

  // Update document.title while running
  useEffect(() => {
    if (isRunning) {
      document.title = `${secondsToDisplay(secondsLeft)} — ${MODE_LABELS[mode]} | StudyKit`
    } else {
      document.title = 'StudyKit'
    }
    return () => { document.title = 'StudyKit' }
  }, [isRunning, secondsLeft, mode])

  // Main interval loop
  useEffect(() => {
    if (!isRunning) return

    startTimeRef.current    = Date.now()
    startSecondsRef.current = secondsLeft

    const id = setInterval(() => {
      const elapsed  = Math.floor((Date.now() - startTimeRef.current) / 1000)
      const newSecs  = startSecondsRef.current - elapsed

      if (newSecs <= 0) {
        clearInterval(id)
        setSecondsLeft(0)
        onSessionComplete(mode, recordPomodoro, beep, notify, showToast)
      } else {
        setSecondsLeft(newSecs)
      }
    }, 500) // tick every 500ms for responsiveness, compute via elapsed

    return () => clearInterval(id)
  }, [isRunning]) // only re-run when isRunning changes

  const start = useCallback(() => {
    warmUp()          // warm up AudioContext on first user gesture
    setIsRunning(true)
  }, [setIsRunning, warmUp])

  const pause = useCallback(() => {
    setIsRunning(false)
  }, [setIsRunning])

  const reset = useCallback(() => {
    ctxReset()
  }, [ctxReset])

  return { start, pause, reset, changeMode }
}
