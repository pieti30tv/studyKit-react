import Navbar from './components/layout/Navbar'
import TaskTracker from './components/tasks/TaskTracker'
import PomodoroTimer from './components/timer/PomodoroTimer'
import InspirationCard from './components/timer/InspirationCard'
import Statistics from './components/stats/Statistics'
import ToastContainer from './components/ui/Toast'

export default function App() {
  return (
    <div className="min-h-screen bg-apple-bg">
      {/* Fixed navigation */}
      <Navbar />

      {/* Main content — padded below fixed navbar (64px = pt-16) */}
      <main className="pt-16 max-w-page mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Task Tracker ─────────────────────────────────────────── */}
        <section className="py-10 md:py-14">
          <TaskTracker />
        </section>

        {/* ── Divider ──────────────────────────────────────────────── */}
        <hr className="border-apple-border/50" />

        {/* ── Timer + Sidebar (Inspiration + Stats) ────────────────── */}
        <section className="py-10 md:py-14">
          <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-start">

            {/* Timer — takes most space */}
            <div className="w-full md:flex-1">
              <PomodoroTimer />
            </div>

            {/* Right sidebar: Inspiration + Statistics */}
            <div className="w-full md:w-72 lg:w-80 flex flex-col gap-6">
              {/* Inspirierende Karte */}
              <InspirationCard />

              {/* Statistics */}
              <Statistics />
            </div>
          </div>
        </section>

        {/* Bottom spacer */}
        <div className="h-16" />
      </main>

      {/* Toast notifications */}
      <ToastContainer />
    </div>
  )
}
