import Card from '../ui/Card'
import Button from '../ui/Button'
import TimerDisplay from './TimerDisplay'
import ModeSelector from './ModeSelector'
import TaskSelector from './TaskSelector'
import CustomDurationEditor from './CustomDurationEditor'
import { useTimer } from '../../context/TimerContext'
import { usePomodoroTimer } from '../../hooks/usePomodoroTimer'
import { MODE_LABELS } from '../../utils/constants'

export default function PomodoroTimer() {
  const { mode, isRunning, sessionCount } = useTimer()
  const { start, pause, reset, changeMode } = usePomodoroTimer()

  return (
    <section id="timer" className="scroll-mt-20">
      <h2 className="text-3xl font-semibold text-apple-heading tracking-tight mb-6">
        Pomodoro Timer
      </h2>

      <Card className="p-6 md:p-10 max-w-xl mx-auto">
        {/* Mode segmented control */}
        <ModeSelector onModeChange={changeMode} />

        {/* Custom duration editor */}
        <CustomDurationEditor />

        {/* Task linkage */}
        <div className="mt-5">
          <TaskSelector />
        </div>

        {/* Large countdown */}
        <TimerDisplay />

        {/* Mode label + session counter */}
        <p className="text-center text-sm text-apple-secondary -mt-2 mb-8">
          {MODE_LABELS[mode]}
          {sessionCount > 0 && (
            <span className="ml-2 text-apple-accent font-medium">
              · {sessionCount} 🍅
            </span>
          )}
        </p>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3">
          {!isRunning ? (
            <Button variant="primary" size="lg" onClick={start}>
              ▶ Start
            </Button>
          ) : (
            <Button variant="secondary" size="lg" onClick={pause}>
              ⏸ Pause
            </Button>
          )}
          <Button variant="ghost" size="lg" onClick={reset}>
            ↺ Reset
          </Button>
        </div>
      </Card>
    </section>
  )
}
