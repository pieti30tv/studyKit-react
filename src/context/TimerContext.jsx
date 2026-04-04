import { createContext, useContext, useState, useCallback } from 'react'
import { MODE_DURATIONS, POMODOROS_BEFORE_LONG_BREAK } from '../utils/constants'

const TimerContext = createContext(null)

export function TimerProvider({ children }) {
  const [mode, setMode]               = useState('focus')
  const [isRunning, setIsRunning]     = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(MODE_DURATIONS.focus * 60)
  const [sessionCount, setSessionCount] = useState(0)
  const [linkedTaskId, setLinkedTaskId] = useState(null)

  // Called by usePomodoroTimer when a session ends
  const onSessionComplete = useCallback((completedMode, onRecordPomodoro, onBeep, onNotify, onToast) => {
    setIsRunning(false)

    if (completedMode === 'focus') {
      const newCount = sessionCount + 1
      setSessionCount(newCount)
      onRecordPomodoro?.(MODE_DURATIONS.focus)
      onBeep?.()
      onNotify?.('StudyKit — Fokus beendet! 🎉', 'Zeit für eine Pause.')
      onToast?.('Fokus-Session abgeschlossen! Gut gemacht 🎉', 'success')

      // Auto-switch to next break
      const nextMode = newCount % POMODOROS_BEFORE_LONG_BREAK === 0 ? 'long' : 'short'
      setMode(nextMode)
      setSecondsLeft(MODE_DURATIONS[nextMode] * 60)
    } else {
      onBeep?.()
      onNotify?.('StudyKit — Pause beendet!', 'Weiter geht\'s!')
      onToast?.('Pause beendet — bereit für den nächsten Fokus-Block!', 'info')
      setMode('focus')
      setSecondsLeft(MODE_DURATIONS.focus * 60)
    }
  }, [sessionCount])

  const changeMode = useCallback((newMode) => {
    setMode(newMode)
    setIsRunning(false)
    setSecondsLeft(MODE_DURATIONS[newMode] * 60)
  }, [])

  const reset = useCallback(() => {
    setIsRunning(false)
    setSecondsLeft(MODE_DURATIONS[mode] * 60)
  }, [mode])

  return (
    <TimerContext.Provider
      value={{
        mode, isRunning, secondsLeft, sessionCount, linkedTaskId,
        setIsRunning, setSecondsLeft,
        changeMode, reset, onSessionComplete, setLinkedTaskId,
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
