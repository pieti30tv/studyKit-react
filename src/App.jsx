import Navbar from './components/layout/Navbar'
import TaskTracker from './components/tasks/TaskTracker'
import PomodoroTimer from './components/timer/PomodoroTimer'
import InspirationCard from './components/timer/InspirationCard'
import Statistics from './components/stats/Statistics'
import ToastContainer from './components/ui/Toast'

export default function App() {
  return (
    <div className="min-h-screen bg-apple-bg">
      <Navbar />

      <main className="pt-16 max-w-page mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Aufgaben ─── */}
        <section className="py-10 md:py-14">
          <TaskTracker />
        </section>

        <hr className="border-apple-border/50" />

        {/* ── Timer ─── */}
        <section className="py-10 md:py-14">
          <PomodoroTimer />
        </section>

        <hr className="border-apple-border/50" />

        {/* ── Inspirierende Karte ─── */}
        <section className="py-10 md:py-14">
          <InspirationCard />
        </section>

        <hr className="border-apple-border/50" />

        {/* ── Statistik ─── */}
        <section className="py-10 md:py-14">
          <Statistics />
        </section>

        <div className="h-16" />
      </main>

      <ToastContainer />
    </div>
  )
}
