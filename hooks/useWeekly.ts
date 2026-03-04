import useSWR from 'swr'
import { WeekDay } from '@/types'

const fetcher = (url: string) => fetch(url).then(r => r.json())

export function useWeekly() {
  const { data, error, isLoading } = useSWR<WeekDay[]>('/api/weekly', fetcher)

  const days = data ?? []

  // Overall week stats
  const weekTotal   = days.reduce((acc, d) => acc + d.total, 0)
  const weekDone    = days.reduce((acc, d) => acc + d.done, 0)
  const weekPct     = weekTotal > 0 ? Math.round((weekDone / weekTotal) * 100) : 0
  const bestDay     = days.reduce((best, d) =>
    d.completionPct > (best?.completionPct ?? -1) ? d : best
  , days[0])

  return {
    days,
    isLoading,
    isError: !!error,
    weekTotal,
    weekDone,
    weekPct,
    bestDay,
  }
}