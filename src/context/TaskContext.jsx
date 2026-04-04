import { createContext, useContext, useCallback } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { TASKS_KEY } from '../utils/storageKeys'
import { TOAST_TYPES } from '../utils/constants'

const TaskContext = createContext(null)

let _showToast = null
let _recordTaskCompletion = null

export function TaskProvider({ children, showToast, recordTaskCompletion }) {
  // Store references for use in callbacks
  _showToast = showToast
  _recordTaskCompletion = recordTaskCompletion

  const [tasks, setTasks] = useLocalStorage(TASKS_KEY, [])

  const addTask = useCallback((taskData) => {
    const newTask = {
      id:        `task-${Date.now()}-${Math.random()}`,
      name:      taskData.name.trim(),
      subject:   taskData.subject?.trim() || '',
      deadline:  taskData.deadline || null,
      priority:  taskData.priority || 'Mittel',
      completed: false,
      createdAt: Date.now(),
    }
    setTasks((prev) => [...prev, newTask])
    showToast?.('Aufgabe wurde hinzugefügt', TOAST_TYPES.SUCCESS)
  }, [setTasks, showToast])

  const toggleTask = useCallback((id) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t
        const nowCompleted = !t.completed
        if (nowCompleted) {
          recordTaskCompletion?.()
          showToast?.('Gut gemacht! Aufgabe erledigt ✓', TOAST_TYPES.SUCCESS)
        }
        return { ...t, completed: nowCompleted }
      }),
    )
  }, [setTasks, showToast, recordTaskCompletion])

  const deleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
    showToast?.('Aufgabe gelöscht', TOAST_TYPES.INFO)
  }, [setTasks, showToast])

  // Sort: open tasks first (by createdAt desc), completed tasks at bottom
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1
    return b.createdAt - a.createdAt
  })

  const incompleteTasks = tasks.filter((t) => !t.completed)

  return (
    <TaskContext.Provider value={{ tasks: sortedTasks, incompleteTasks, addTask, toggleTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  )
}

export function useTaskContext() {
  const ctx = useContext(TaskContext)
  if (!ctx) throw new Error('useTaskContext must be inside TaskProvider')
  return ctx
}
