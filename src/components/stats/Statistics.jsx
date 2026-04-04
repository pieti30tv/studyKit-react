import Card from '../ui/Card'
import { useStats } from '../../context/StatsContext'

function StatCard({ value, label, emoji }) {
  return (
    <Card className="p-6 flex flex-col items-start">
      <span className="text-2xl mb-3">{emoji}</span>
      <span
        className="text-apple-heading font-semibold leading-none tracking-tight"
        style={{ fontSize: '48px' }}
      >
        {value}
      </span>
      <span className="text-sm text-apple-secondary mt-2 leading-snug">
        {label}
      </span>
    </Card>
  )
}

export default function Statistics() {
  const { stats } = useStats()

  return (
    <section id="statistik" className="scroll-mt-20">
      <h2 className="text-2xl font-semibold text-apple-heading tracking-tight mb-2">
        Statistik
      </h2>
      <p className="text-sm text-apple-secondary mb-6">Heute</p>

      <div className="grid grid-cols-1 gap-4">
        <StatCard
          value={stats.completedTasksToday ?? 0}
          label="Erledigte Aufgaben"
          emoji="✅"
        />
        <StatCard
          value={stats.pomodorosToday ?? 0}
          label="Pomodoros"
          emoji="🍅"
        />
        <StatCard
          value={stats.focusMinutesToday ?? 0}
          label="Fokusminuten"
          emoji="⏱️"
        />
      </div>
    </section>
  )
}
