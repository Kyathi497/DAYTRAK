import { WeekDay } from '@/types'
import { cn } from '@/lib/utils'

type Props = {
  day: WeekDay
}

const today = new Date().toISOString().split('T')[0]

export default function DayRow({ day }: Props) {
  const isToday = day.date === today

  return (
    <div className={cn(
      'bg-card border border-border rounded-xl p-4',
      'flex items-center justify-between gap-4',
      isToday && 'border-primary/40'
    )}>
      {/* Day label */}
      <div className="w-20 shrink-0">
        <p className={cn(
          'font-semibold text-sm',
          isToday ? 'text-primary' : 'text-foreground'
        )}>
          {day.dayName}
          {isToday && (
            <span className="ml-1.5 text-xs font-normal text-primary">Today</span>
          )}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </p>
      </div>

      {/* Progress bar */}
      <div className="flex-1">
        <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${day.completionPct}%` }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-3 shrink-0 text-xs text-muted-foreground">
        <span className="text-green-400 font-medium">{day.done} done</span>
        <span>/</span>
        <span>{day.total} total</span>
        <span className={cn(
          'font-bold w-10 text-right',
          day.completionPct === 100 && 'text-primary',
        )}>
          {day.completionPct}%
        </span>
      </div>
    </div>
  )
}