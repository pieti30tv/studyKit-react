import { useCallback } from 'react'

/**
 * Browser Notification API hook.
 * Requests permission lazily (only when notify() is first called).
 * Falls back silently on iOS Safari (no Notification API).
 */
export function useNotification() {
  const isSupported = typeof window !== 'undefined' && 'Notification' in window

  const requestPermission = useCallback(async () => {
    if (!isSupported) return false
    if (Notification.permission === 'granted') return true
    if (Notification.permission === 'denied') return false
    const result = await Notification.requestPermission()
    return result === 'granted'
  }, [isSupported])

  const notify = useCallback(async (title, body, icon = '/favicon.svg') => {
    if (!isSupported) return
    const granted = await requestPermission()
    if (!granted) return
    try {
      new Notification(title, { body, icon })
    } catch (err) {
      console.warn('[useNotification] Failed to show notification:', err)
    }
  }, [isSupported, requestPermission])

  return { notify, requestPermission, isSupported }
}
