/**
 * Returns today's date as "YYYY-MM-DD" (ISO local date key).
 */
export const getTodayKey = () =>
  new Date().toISOString().slice(0, 10)

/**
 * Formats an ISO date string ("2026-04-10") to a human-readable German format.
 * e.g. "10. Apr. 2026"
 */
export const formatDeadline = (isoString) => {
  if (!isoString) return null
  const date = new Date(isoString + 'T00:00:00')
  return date.toLocaleDateString('de-DE', {
    day:   'numeric',
    month: 'short',
    year:  'numeric',
  })
}

/**
 * Returns true if the given ISO date string is today or in the past.
 */
export const isOverdue = (isoString) => {
  if (!isoString) return false
  const today = getTodayKey()
  return isoString < today
}

/**
 * Returns true if the given ISO date string is today.
 */
export const isToday = (isoString) => {
  if (!isoString) return false
  return isoString === getTodayKey()
}

/**
 * Pads a number to 2 digits (e.g. 5 → "05").
 */
export const pad2 = (n) => String(n).padStart(2, '0')

/**
 * Converts total seconds to "MM:SS" display string.
 */
export const secondsToDisplay = (totalSeconds) => {
  const m = Math.floor(totalSeconds / 60)
  const s = totalSeconds % 60
  return `${pad2(m)}:${pad2(s)}`
}
