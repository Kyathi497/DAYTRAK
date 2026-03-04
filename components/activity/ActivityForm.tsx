'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Category, Priority } from '@/types'

type Props = {
  open:     boolean
  onClose:  () => void
  onCreate: (data: {
    name:      string
    startTime: string
    endTime:   string
    category:  Category
    priority:  Priority
    notes:     string
  }) => Promise<void>
}

const CATEGORIES: Category[] = ['HEALTH', 'MEALS', 'WORK', 'PERSONAL', 'SOCIAL', 'OTHER']
const PRIORITIES: Priority[] = ['HIGH', 'MEDIUM', 'LOW']

export default function ActivityForm({ open, onClose, onCreate }: Props) {
  const [name,      setName]      = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime,   setEndTime]   = useState('')
  const [category,  setCategory]  = useState<Category>('OTHER')
  const [priority,  setPriority]  = useState<Priority>('MEDIUM')
  const [notes,     setNotes]     = useState('')
  const [loading,   setLoading]   = useState(false)
  const [error,     setError]     = useState('')

  function reset() {
    setName(''); setStartTime(''); setEndTime('')
    setCategory('OTHER'); setPriority('MEDIUM')
    setNotes(''); setError('')
  }

  function handleClose() {
    reset()
    onClose()
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) { setError('Activity name is required'); return }

    setLoading(true)
    setError('')

    try {
      await onCreate({ name: name.trim(), startTime, endTime, category, priority, notes })
      reset()
      onClose()
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="tracking-widest">NEW ACTIVITY</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <p className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-md">
              {error}
            </p>
          )}

          {/* Name */}
          <div className="space-y-1.5">
            <Label htmlFor="name">Activity Name *</Label>
            <Input
              id="name"
              placeholder="e.g. Morning run"
              value={name}
              onChange={e => setName(e.target.value)}
              autoFocus
            />
          </div>

          {/* Times */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                type="time"
                value={startTime}
                onChange={e => setStartTime(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                type="time"
                value={endTime}
                onChange={e => setEndTime(e.target.value)}
              />
            </div>
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <Label>Category</Label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                    category === cat
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'border-border text-muted-foreground hover:border-zinc-500'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Priority */}
          <div className="space-y-1.5">
            <Label>Priority</Label>
            <div className="flex gap-2">
              {PRIORITIES.map(pri => (
                <button
                  key={pri}
                  type="button"
                  onClick={() => setPriority(pri)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                    priority === pri
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'border-border text-muted-foreground hover:border-zinc-500'
                  }`}
                >
                  {pri}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-1.5">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Input
              id="notes"
              placeholder="Any extra details..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
            />
          </div>

          <DialogFooter className="gap-2 pt-2">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add Activity'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}