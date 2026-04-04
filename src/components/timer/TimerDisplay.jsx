import { useTimer } from '../../context/TimerContext'
import { secondsToDisplay } from '../../utils/dateUtils'

export default function TimerDisplay() {
  const { secondsLeft, isRunning } = useTimer()
  const display = secondsToDisplay(secondsLeft)

  return (
    <div className="flex justify-center items-center py-8">
      <span
        className={`timer-digit select-none transition-colors duration-300 ${
          isRunning ? 'text-apple-accent' : 'text-apple-heading'
        }`}
        style={{
          fontSize: 'clamp(72px, 14vw, 96px)',
        }}
        aria-live="off"
        aria-label={`Timer: ${display}`}
      >
        {display}
      </span>
    </div>
  )
}
