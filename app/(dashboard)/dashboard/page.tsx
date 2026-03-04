'use client'

import { useState } from 'react'
import { useActivities } from '@/hooks/useActivities'
import StatsBar from '@/components/dashboard/StatsBar'
import ActivityCard from '@/components/activity/ActivityCard'
import ActivityForm from '@/components/activity/ActivityForm'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Category, Priority } from '@/types'

function getTodayLabel() {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month:   'long',
    day:     'numeric',
  })
}

export default function DashboardPage() {
  const [formOpen, setFormOpen] = useState(false)

  const {
    activities,
    isLoading,
    total,
    done,
    pct,
    createActivity,
    toggleStatus,
    deleteActivity,
  } = useActivities()

  async function handleCreate(data: {
    name:      string
    startTime: string
    endTime:   string
    category:  Category
    priority:  Priority
    notes:     string
  }) {
    await createActivity(data)
  }

  if (isLoading) {
    return (
      <div className="space-y-3 animate-pulse">
        <div className="h-8 w-48 bg-muted rounded" />
        <div className="grid grid-cols-3 gap-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-20 bg-muted rounded-xl" />
          ))}
        </div>
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-16 bg-muted rounded-xl" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">

      

      {/* Stats */}
      <StatsBar total={total} done={done} pct={pct} />
      {/* Date heading */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Today's Activity</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{getTodayLabel()}</p>
        </div>
        <Button onClick={() => setFormOpen(true)} size="sm" className="gap-2">
          <Plus size={16} />
          Add Activity
        </Button>
      </div>

      {/* Activity list */}
      {activities.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-4xl mb-4">📋</p>
          <p className="font-medium">No activities yet</p>
          <p className="text-sm mt-1">Click Add Activity to get started</p>
        </div>
      ) : (
        <div className="space-y-3">
          {activities.map(activity => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              onToggle={toggleStatus}
              onDelete={deleteActivity}
            />
          ))}
        </div>
      )}

      {/* Add Activity modal */}
      <ActivityForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onCreate={handleCreate}
      />

    </div>
  )
}