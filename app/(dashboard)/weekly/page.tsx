'use client'

import { useWeekly } from '@/hooks/useWeekly'
import WeekStatsBar     from '@/components/weekly/WeekStatusBar'
import WeeklyBarChart   from '@/components/weekly/WeeklyBarChart'
import CategoryBreakdown from '@/components/weekly/CategoryBreakdown'
import DayRow           from '@/components/weekly/DayRow'

export default function WeeklyPage() {
  const { days, isLoading, weekTotal, weekDone, weekPct, bestDay } = useWeekly()

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-8 w-40 bg-muted rounded" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-20 bg-muted rounded-xl" />
          ))}
        </div>
        <div className="h-64 bg-muted rounded-xl" />
        <div className="h-48 bg-muted rounded-xl" />
      </div>
    )
  }

  return (
    <div className="space-y-6">

      {/* Heading */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Weekly Summary</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Last 7 days overview
        </p>
      </div>

      {/* Week-level stats */}
      <WeekStatsBar
        weekTotal={weekTotal}
        weekDone={weekDone}
        weekPct={weekPct}
        bestDay={bestDay}
      />

      {/* Bar chart */}
      <WeeklyBarChart days={days} />

      {/* Day by day breakdown */}
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Day by Day
        </h2>
        <div className="space-y-2">
          {days.map(day => (
            <DayRow key={day.date} day={day} />
          ))}
        </div>
      </div>

      {/* Category breakdown */}
      <CategoryBreakdown days={days} />

    </div>
  )
}