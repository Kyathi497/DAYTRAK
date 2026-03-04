type Props = {
  weekTotal: number
  weekDone:  number
  weekPct:   number
  bestDay:   { dayName: string; completionPct: number } | undefined
}

export default function WeekStatsBar({ weekTotal, weekDone, weekPct, bestDay }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <div className="bg-card border border-border rounded-xl p-4 text-center">
        <div className="text-3xl font-bold">{weekTotal}</div>
        <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1">
          Total
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-4 text-center">
        <div className="text-3xl font-bold">{weekDone}</div>
        <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1">
          Completed
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-4 text-center">
        <div className="text-3xl font-bold text-primary">{weekPct}%</div>
        <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1">
          This Week
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-4 text-center">
        <div className="text-3xl font-bold text-yellow-400">
          {bestDay ? bestDay.dayName : '—'}
        </div>
        <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1">
          Best Day
        </div>
      </div>
    </div>
  )
}