import { createContext, useContext, useState, useCallback } from 'react'
import { TOAST_TYPES } from '../utils/constants'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const showToast = useCallback(
    (message, type = TOAST_TYPES.INFO, duration = 3000) => {
      const id = `toast-${Date.now()}-${Math.random()}`

      setToasts((prev) => {
        const next = [...prev, { id, message, type }]
        // Max 3 toasts: trim oldest if needed
        return next.length > 3 ? next.slice(next.length - 3) : next
      })

      setTimeout(() => removeToast(id), duration)
    },
    [removeToast],
  )

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be inside ToastProvider')
  return ctx
}
