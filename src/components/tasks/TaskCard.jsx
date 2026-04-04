import { useState } from 'react'
import Card from '../ui/Card'
import PriorityBadge from './PriorityBadge'
import { useTaskContext } from '../../context/TaskContext'
import { formatDeadline, isOverdue } from '../../utils/dateUtils'

export default function TaskCard({ task }) {
  const { toggleTask, deleteTask } = useTaskContext()
  const [showDelete, setShowDelete] = useState(false)

  const deadline = formatDeadline(task.deadline)
  const overdue  = !task.completed && isOverdue(task.deadline)

  return (
    <Card
      className="p-6 relative group"
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
          className="task-checkbox mt-0.5"
          aria-label={`Aufgabe "${task.name}" als erledigt markieren`}
        />

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Task name */}
          <p
            className={`font-semibold text-[15px] leading-snug break-words transition-colors duration-200
              ${task.completed
                ? 'line-through text-apple-secondary'
                : 'text-apple-heading'
              }`}
          >
            {task.name}
          </p>

          {/* Subject */}
          {task.subject && (
            <p className="text-[13px] text-apple-secondary mt-0.5">
              {task.subject}
            </p>
          )}

          {/* Deadline */}
          {deadline && (
            <p
              className={`text-[13px] mt-1.5 ${
                overdue ? 'text-[#c0392b]' : 'text-apple-secondary'
              }`}
            >
              📅 {deadline}
              {overdue && (
                <span className="ml-1.5 text-[11px] font-medium">Überfällig</span>
              )}
            </p>
          )}

          {/* Priority badge */}
          <div className="mt-2.5">
            <PriorityBadge priority={task.priority} />
          </div>
        </div>

        {/* Delete button — visible on hover (desktop) or always (mobile) */}
        <button
          onClick={() => deleteTask(task.id)}
          aria-label="Aufgabe löschen"
          className={`flex-shrink-0 w-7 h-7 flex items-center justify-center
            rounded-full text-apple-secondary hover:text-[#c0392b] hover:bg-[#fde8e8]
            transition-all duration-150 text-base
            md:opacity-0 md:group-hover:opacity-100
            ${showDelete ? 'md:opacity-100' : ''}`}
        >
          ×
        </button>
      </div>

      {/* Completed overlay dimming */}
      {task.completed && (
        <div className="absolute inset-0 rounded-apple bg-white/40 pointer-events-none" />
      )}
    </Card>
  )
}
