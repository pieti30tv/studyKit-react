import { useToast } from '../../context/ToastContext'

const TYPE_STYLES = {
  success: { bar: 'bg-[#276749]', icon: '✓' },
  error:   { bar: 'bg-[#c0392b]', icon: '✕' },
  info:    { bar: 'bg-apple-accent', icon: 'ℹ' },
}

function ToastItem({ toast }) {
  const { removeToast } = useToast()
  const style = TYPE_STYLES[toast.type] || TYPE_STYLES.info

  return (
    <div
      role="alert"
      className="toast-enter flex items-center gap-3 bg-white rounded-[14px] shadow-apple-toast
                 pl-0 pr-4 py-3.5 min-w-[280px] max-w-[360px] overflow-hidden"
    >
      {/* Colored left bar */}
      <div className={`w-1 self-stretch rounded-l-[14px] flex-shrink-0 ${style.bar}`} />

      {/* Message */}
      <span className="flex-1 text-sm text-apple-heading leading-snug">
        {toast.message}
      </span>

      {/* Dismiss button */}
      <button
        onClick={() => removeToast(toast.id)}
        className="text-apple-secondary hover:text-apple-heading transition-colors
                   duration-150 text-lg leading-none flex-shrink-0 w-6 h-6
                   flex items-center justify-center"
        aria-label="Schließen"
      >
        ×
      </button>
    </div>
  )
}

export default function ToastContainer() {
  const { toasts } = useToast()

  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100]
                 flex flex-col gap-2 items-center pointer-events-none"
    >
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <ToastItem toast={toast} />
        </div>
      ))}
    </div>
  )
}
