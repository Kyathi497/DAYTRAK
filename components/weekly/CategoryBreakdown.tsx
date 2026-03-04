import { WeekDay, CATEGORY_COLOR, Category } from '@/types'

type Props = {
  days: WeekDay[]
}

export default function CategoryBreakdown({ days }: Props) {
  // Merge all days into one category count
  const totals = days.reduce((acc, day) => {
    Object.entries(day.byCategory).forEach(([cat, count]) => {
      acc[cat] = (acc[cat] || 0) + count
    })
    return acc
  }, {} as Record<string, number>)

  const entries = Object.entries(totals).sort((a, b) => b[1] - a[1])
  const grand   = entries.reduce((sum, [, n]) => sum + n, 0)

  if (!entries.length) return null

  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-5">
        Category Breakdown
      </h2>

      <div className="space-y-3">
        {entries.map(([cat, count]) => {
          const pct   = grand > 0 ? Math.round((count / grand) * 100) : 0
          const color = CATEGORY_COLOR[cat as Category] ?? '#6b7280'

          return (
            <div key={cat}>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-medium" style={{ color }}>
                  {cat}
                </span>
                <span className="text-muted-foreground">
                  {count} activity{count !== 1 ? 'ies' : 'y'} · {pct}%
                </span>
              </div>
              <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${pct}%`, backgroundColor: color }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}