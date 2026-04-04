import { createContext, useContext, useState, useCallback } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { MODE_DURATIONS, POMODOROS_BEFORE_LONG_BREAK } from '../utils/constants'
import { TIMER_STATE_KEY } from '../utils/storageKeys'

const TimerContext = createContext(null)

const CUSTOM_DURATIONS_KEY = 'studykit_custom_durations'

export function TimerProvider({ children }) {
  // Custom durations per mode — persisted to localStorage
  const [customDurations, setCustomDurations] = useLocalStorage(
    CUSTOM_DURATIONS_KEY,
    { focus: MODE_DURATIONS.focus, short: MODE_DURATIONS.short, long: MODE_DURATIONS.long },
  )

  const [mode, setMode]                 = useState('focus')
  const [isRunning, setIsRunning]       = useState(false)
  const [secondsLeft, setSecondsLeft]   = useState(customDurations.focus * 60)
  const [sessionCount, setSessionCount] = useState(0)
  const [linkedTaskId, setLinkedTaskId] = useState(null)

  /** Update a single mode's duration (in minutes). Resets timer if it's the active mode. */
  const setCustomDuration = useCallback((targetMode, minutes) => {
    const mins = Math.max(1, Math.min(180, Number(minutes)))
    setCustomDurations((prev) => ({ ...prev, [targetMode]: mins }))
    // If this is the currently active (non-running) mode, update secondsLeft too
    if (targetMode === mode && !isRunning) {
      setSecondsLeft(mins * 60)
    }
  }, [mode, isRunning, setCustomDurations])

  const onSessionComplete = useCallback((completedMode, onRecordPomodoro, onBeep, onNotify, onToast) => {
    setIsRunning(false)

    if (completedMode === 'focus') {
      const newCount = sessionCount + 1
      setSessionCount(newCount)
      onRecordPomodoro?.(customDurations.focus)
      onBeep?.()
      onNotify?.('StudyKit — Fokus beendet! 🎉', 'Zeit für eine Pause.')
      onToast?.('Fokus-Session abgeschlossen! Gut gemacht 🎉', 'success')

      const nextMode = newCount % POMODOROS_BEFORE_LONG_BREAK === 0 ? 'long' : 'short'
      setMode(nextMode)
      setSecondsLeft(customDurations[nextMode] * 60)
    } else {
      onBeep?.()
      onNotify?.('StudyKit — Pause beendet!', 'Weiter geht\'s!')
      onToast?.('Pause beendet — bereit für den nächsten Fokus-Block!', 'info')
      setMode('focus')
      setSecondsLeft(customDurations.focus * 60)
    }
  }, [sessionCount, customDurations])

  const changeMode = useCallback((newMode) => {
    setMode(newMode)
    setIsRunning(false)
    setSecondsLeft(customDurations[newMode] * 60)
  }, [customDurations])

  const reset = useCallback(() => {
    setIsRunning(false)
    setSecondsLeft(customDurations[mode] * 60)
  }, [mode, customDurations])

  return (
    <TimerContext.Provider
      value={{
        mode, isRunning, secondsLeft, sessionCount, linkedTaskId,
        customDurations,
        setIsRunning, setSecondsLeft,
        changeMode, reset, onSessionComplete,
        setLinkedTaskId, setCustomDuration,
      }}
    >
      {children}
    </TimerContext.Provider>
  )
}

export function useTimer() {
  const ctx = useContext(TimerContext)
  if (!ctx) throw new Error('useTimer must be inside TimerProvider')
  return ctx
}
