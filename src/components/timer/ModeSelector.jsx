import { useTimer } from '../../context/TimerContext'
import { MODE_LABELS, MODE_DURATIONS } from '../../utils/constants'

const MODES = [
  { key: 'focus', label: MODE_LABELS.focus,  minutes: MODE_DURATIONS.focus },
  { key: 'short', label: MODE_LABELS.short,  minutes: MODE_DURATIONS.short },
  { key: 'long',  label: MODE_LABELS.long,   minutes: MODE_DURATIONS.long  },
]

export default function ModeSelector({ onModeChange }) {
  const { mode, isRunning } = useTimer()

  return (
    <div
      className={`flex items-center justify-center gap-1 bg-apple-bg rounded-apple-pill p-1 ${
        isRunning ? 'opacity-50 pointer-events-none' : ''
      }`}
      role="group"
      aria-label="Timer-Modus wählen"
    >
      {MODES.map((m) => (
        <button
          key={m.key}
          onClick={() => onModeChange(m.key)}
          disabled={isRunning}
          className={`
            flex-1 px-3 py-2 rounded-apple-pill text-sm font-medium
            transition-all duration-200 min-h-[36px]
            ${mode === m.key
              ? 'bg-apple-accent text-white shadow-sm'
              : 'text-apple-secondary hover:text-apple-heading'
            }
          `}
          aria-pressed={mode === m.key}
        >
          {m.label}
        </button>
      ))}
    </div>
  )
}
