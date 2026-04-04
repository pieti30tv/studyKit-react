import { useEffect } from 'react'
import { getTodayKey } from '../utils/dateUtils'

/**
 * Checks on mount if the stored date matches today.
 * If not (new day), calls onReset() so the parent can zero out counters.
 */
export function useDailyReset(storedDate, onReset) {
  useEffect(() => {
    const today = getTodayKey()
    if (storedDate && storedDate !== today) {
      onReset(today)
    }
  }, []) // intentionally run only once on mount
}
