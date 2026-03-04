'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import { WeekDay } from '@/types'

type Props = {
  days: WeekDay[]
}

const today = new Date().toISOString().split('T')[0]

// Custom tooltip that shows on hover
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null

  const d = payload[0].payload as WeekDay

  return (
    <div className="bg-card border border-border rounded-lg p-3 text-sm shadow-lg">
      <p className="font-semibold text-foreground mb-2">{label}</p>
      <p className="text-green-400">Done: {d.done}</p>
      <p className="text-zinc-400">Total: {d.total}</p>
      <p className="text-primary font-medium mt-1">{d.completionPct}% complete</p>
    </div>
  )
}

export default function WeeklyBarChart({ days }: Props) {
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-6">
        Completion This Week
      </h2>

      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={days} barSize={32} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a35" vertical={false} />
          <XAxis
            dataKey="dayName"
            tick={{ fill: '#6b7280', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#6b7280', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
          <Bar dataKey="done" radius={[6, 6, 0, 0]}>
            {days.map((d) => (
              <Cell
                key={d.date}
                fill={d.date === today ? '#a3e635' : '#3f3f46'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-[#a3e635] inline-block" />
          Today
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-zinc-600 inline-block" />
          Previous days
        </span>
      </div>
    </div>
  )
}