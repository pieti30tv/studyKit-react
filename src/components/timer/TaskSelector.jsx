import { useTimer } from '../../context/TimerContext'
import { useTaskContext } from '../../context/TaskContext'

export default function TaskSelector() {
  const { linkedTaskId, setLinkedTaskId } = useTimer()
  const { incompleteTasks }               = useTaskContext()

  if (incompleteTasks.length === 0) return null

  return (
    <div className="mt-4">
      <label
        htmlFor="timer-task-select"
        className="block text-xs text-apple-secondary font-medium mb-1.5 text-center"
      >
        Aktive Aufgabe
      </label>
      <select
        id="timer-task-select"
        value={linkedTaskId || ''}
        onChange={(e) => setLinkedTaskId(e.target.value || null)}
        className="w-full border border-apple-border rounded-apple-sm px-4 py-3
                   text-apple-heading bg-white text-sm outline-none apple-focus
                   focus:border-apple-accent focus:ring-2 focus:ring-apple-accent/20
                   transition-colors duration-150"
        style={{ fontSize: '16px' }}
      >
        <option value="">Keine Aufgabe ausgewählt</option>
        {incompleteTasks.map((task) => (
          <option key={task.id} value={task.id}>
            {task.name}
            {task.subject ? ` — ${task.subject}` : ''}
          </option>
        ))}
      </select>
    </div>
  )
}
