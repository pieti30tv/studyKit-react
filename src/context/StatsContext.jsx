import { createContext, useContext, useCallback } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useDailyReset } from '../hooks/useDailyReset'
import { STATS_KEY } from '../utils/storageKeys'
import { getTodayKey } from '../utils/dateUtils'

const INITIAL_STATS = {
  date:                  getTodayKey(),
  completedTasksToday:   0,
  pomodorosToday:        0,
  focusMinutesToday:     0,
}

const StatsContext = createContext(null)

export function StatsProvider({ children }) {
  const [stats, setStats] = useLocalStorage(STATS_KEY, INITIAL_STATS)

  // Daily reset: if stored date ≠ today, zero all counters
  useDailyReset(stats.date, (today) => {
    setStats({ ...INITIAL_STATS, date: today })
  })

  const recordTaskCompletion = useCallback(() => {
    setStats((prev) => ({
      ...prev,
      completedTasksToday: (prev.completedTasksToday || 0) + 1,
    }))
  }, [setStats])

  const recordPomodoro = useCallback((minutes = 25) => {
    setStats((prev) => ({
      ...prev,
      pomodorosToday:    (prev.pomodorosToday    || 0) + 1,
      focusMinutesToday: (prev.focusMinutesToday || 0) + minutes,
    }))
  }, [setStats])

  return (
    <StatsContext.Provider value={{ stats, recordTaskCompletion, recordPomodoro }}>
      {children}
    </StatsContext.Provider>
  )
}

export function useStats() {
  const ctx = useContext(StatsContext)
  if (!ctx) throw new Error('useStats must be inside StatsProvider')
  return ctx
}
