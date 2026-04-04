import { useState } from 'react'
import TaskCard from './TaskCard'
import TaskModal from './TaskModal'
import Button from '../ui/Button'
import { useTaskContext } from '../../context/TaskContext'

export default function TaskTracker() {
  const { tasks, addTask } = useTaskContext()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const completedCount = tasks.filter((t) => t.completed).length

  return (
    <section id="aufgaben" className="scroll-mt-20">
      {/* Section header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-semibold text-apple-heading tracking-tight">
            Aufgaben
          </h1>
          {tasks.length > 0 && (
            <p className="text-sm text-apple-secondary mt-0.5">
              {completedCount} von {tasks.length} erledigt
            </p>
          )}
        </div>
        <Button
          variant="primary"
          size="md"
          onClick={() => setIsModalOpen(true)}
        >
          + Hinzufügen
        </Button>
      </div>

      {/* Task grid */}
      {tasks.length === 0 ? (
        <EmptyState onAdd={() => setIsModalOpen(true)} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}

      {/* Add Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={addTask}
      />
    </section>
  )
}

function EmptyState({ onAdd }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="text-5xl mb-4">📚</div>
      <h3 className="text-xl font-semibold text-apple-heading mb-2">
        Keine Aufgaben
      </h3>
      <p className="text-apple-secondary text-sm mb-6 max-w-xs">
        Füge deine erste Aufgabe hinzu und behalte den Überblick über dein Studium.
      </p>
      <Button variant="primary" onClick={onAdd}>
        Erste Aufgabe hinzufügen
      </Button>
    </div>
  )
}
