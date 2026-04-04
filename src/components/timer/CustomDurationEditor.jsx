import { useState } from 'react'
import { useTimer } from '../../context/TimerContext'
import { MODE_LABELS } from '../../utils/constants'

const MODES = ['focus', 'short', 'long']

export default function CustomDurationEditor() {
  const { customDurations, setCustomDuration, isRunning } = useTimer()
  const [isOpen, setIsOpen] = useState(false)
  // Local draft values — only committed on blur / enter
  const [drafts, setDrafts] = useState({ ...customDurations })

  const handleChange = (mode, raw) => {
    setDrafts((prev) => ({ ...prev, [mode]: raw }))
  }

  const handleCommit = (mode) => {
    const val = parseInt(drafts[mode], 10)
    if (!isNaN(val) && val >= 1) {
      setCustomDuration(mode, val)
    } else {
      // revert draft to saved value
      setDrafts((prev) => ({ ...prev, [mode]: customDurations[mode] }))
    }
  }

  const handleKeyDown = (e, mode) => {
    if (e.key === 'Enter') {
      e.target.blur()
      handleCommit(mode)
    }
    if (e.key === 'Escape') {
      setDrafts((prev) => ({ ...prev, [mode]: customDurations[mode] }))
      e.target.blur()
    }
  }

  return (
    <div className="mt-4">
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        disabled={isRunning}
        className={`
          flex items-center gap-1.5 mx-auto text-xs font-medium
          transition-colors duration-150 px-3 py-1.5 rounded-apple-pill
          ${isRunning
            ? 'text-apple-border pointer-events-none'
            : 'text-apple-secondary hover:text-apple-accent hover:bg-apple-bg'
          }
        `}
        aria-expanded={isOpen}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
        </svg>
        {isOpen ? 'Zeiten schließen' : 'Zeiten anpassen'}
      </button>

      {/* Editor panel */}
      {isOpen && (
        <div className="mt-3 p-4 bg-apple-bg rounded-apple-sm grid grid-cols-3 gap-3">
          {MODES.map((m) => (
            <div key={m} className="flex flex-col items-center gap-1.5">
              <label
                htmlFor={`duration-${m}`}
                className="text-[11px] font-medium text-apple-secondary text-center leading-tight"
              >
                {MODE_LABELS[m]}
              </label>
              <div className="flex items-center gap-1">
                <input
                  id={`duration-${m}`}
                  type="number"
                  min="1"
                  max="180"
                  value={drafts[m]}
                  onChange={(e) => handleChange(m, e.target.value)}
                  onBlur={() => handleCommit(m)}
                  onKeyDown={(e) => handleKeyDown(e, m)}
                  className="w-14 text-center border border-apple-border rounded-[8px]
                             px-2 py-1.5 text-sm text-apple-heading bg-white
                             outline-none focus:border-apple-accent focus:ring-2
                             focus:ring-apple-accent/20 transition-colors duration-150"
                  style={{ fontSize: '16px' }}
                  aria-label={`${MODE_LABELS[m]} Dauer in Minuten`}
                />
                <span className="text-[11px] text-apple-secondary">min</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
