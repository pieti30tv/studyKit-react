import Card from '../ui/Card'
import Button from '../ui/Button'
import TimerDisplay from './TimerDisplay'
import ModeSelector from './ModeSelector'
import TaskSelector from './TaskSelector'
import { useTimer } from '../../context/TimerContext'
import { usePomodoroTimer } from '../../hooks/usePomodoroTimer'
import { MODE_LABELS } from '../../utils/constants'

export default function PomodoroTimer() {
  const { mode, isRunning, sessionCount } = useTimer()
  const { start, pause, reset, changeMode } = usePomodoroTimer()

  return (
    <section id="timer" className="scroll-mt-20">
      <h2 className="text-2xl font-semibold text-apple-heading tracking-tight mb-6">
        Pomodoro Timer
      </h2>

      <Card className="p-6 md:p-8">
        {/* Mode selector */}
        <ModeSelector onModeChange={changeMode} />

        {/* Timer task linkage */}
        <TaskSelector />

        {/* Large time display */}
        <TimerDisplay />

        {/* Mode label */}
        <p className="text-center text-sm text-apple-secondary mb-6">
          {MODE_LABELS[mode]}
          {sessionCount > 0 && (
            <span className="ml-2 text-apple-accent font-medium">
              · {sessionCount} 🍅
            </span>
          )}
        </p>

        {/* Control buttons */}
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {!isRunning ? (
            <Button variant="primary" size="lg" onClick={start}>
              ▶ Start
            </Button>
          ) : (
            <Button variant="secondary" size="lg" onClick={pause}>
              ⏸ Pause
            </Button>
          )}
          <Button
            variant="ghost"
            size="lg"
            onClick={reset}
          >
            ↺ Reset
          </Button>
        </div>
      </Card>
    </section>
  )
}
