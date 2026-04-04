import { useState, useCallback } from 'react'

/**
 * Generic localStorage hook.
 * Reads initial value from localStorage on mount, syncs writes back.
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (err) {
      console.warn(`[useLocalStorage] Failed to read "${key}":`, err)
      return initialValue
    }
  })

  const setValue = useCallback(
    (value) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value
        setStoredValue(valueToStore)
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      } catch (err) {
        console.error(`[useLocalStorage] Failed to write "${key}":`, err)
      }
    },
    [key, storedValue],
  )

  return [storedValue, setValue]
}
