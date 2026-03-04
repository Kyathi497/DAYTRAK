// types/index.ts
export type Category = 'HEALTH' | 'MEALS' | 'WORK' | 'PERSONAL' | 'SOCIAL' | 'OTHER'
export type Status   = 'PENDING' | 'IN_PROGRESS' | 'DONE' | 'SKIPPED'
export type Priority = 'HIGH' | 'MEDIUM' | 'LOW'

export type Activity = {
  id:        string
  name:      string
  startTime: string | null
  endTime:   string | null
  category:  Category
  status:    Status
  priority:  Priority
  notes:     string | null
  date:      string
  userId:    string
  createdAt: string
  updatedAt: string
}

export type WeekDay = {
  date:          string
  dayName:       string
  total:         number
  done:          number
  skipped:       number
  pending:       number
  inProgress:    number
  completionPct: number
  byCategory:    Record<string, number>
}

// Status cycle order for toggling
export const STATUS_CYCLE: Record<Status, Status> = {
  PENDING:     'IN_PROGRESS',
  IN_PROGRESS: 'DONE',
  DONE:        'SKIPPED',
  SKIPPED:     'PENDING',
}

// Display helpers
export const STATUS_LABEL: Record<Status, string> = {
  PENDING:     'Pending',
  IN_PROGRESS: 'In Progress',
  DONE:        'Done',
  SKIPPED:     'Skipped',
}

export const CATEGORY_COLOR: Record<Category, string> = {
  HEALTH:   '#a3e635',
  MEALS:    '#fb923c',
  WORK:     '#60a5fa',
  PERSONAL: '#a78bfa',
  SOCIAL:   '#f472b6',
  OTHER:    '#6b7280',
}

export const PRIORITY_COLOR: Record<Priority, string> = {
  HIGH:   '#ef4444',
  MEDIUM: '#f59e0b',
  LOW:    '#6b7280',
}