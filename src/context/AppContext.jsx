import { ToastProvider, useToast } from './ToastContext'
import { StatsProvider, useStats } from './StatsContext'
import { TaskProvider } from './TaskContext'
import { TimerProvider } from './TimerContext'

/**
 * Inner wrapper — has access to Toast & Stats contexts so we can
 * pass their actions down to TaskProvider and TimerProvider.
 */
function InnerProviders({ children }) {
  const { showToast }            = useToast()
  const { recordTaskCompletion } = useStats()

  return (
    <TaskProvider showToast={showToast} recordTaskCompletion={recordTaskCompletion}>
      <TimerProvider>
        {children}
      </TimerProvider>
    </TaskProvider>
  )
}

/**
 * Root provider — wrap your entire app with this.
 */
export function AppProviders({ children }) {
  return (
    <ToastProvider>
      <StatsProvider>
        <InnerProviders>
          {children}
        </InnerProviders>
      </StatsProvider>
    </ToastProvider>
  )
}
