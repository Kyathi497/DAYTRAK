'use client'

import { Activity, CATEGORY_COLOR, PRIORITY_COLOR } from "@/types";
import { cn } from "@/lib/utils";
import StatusBadge from "./StatusBadge";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";


type Props = {
    activity: Activity
    onToggle: (id:string, status: Activity['status'])=>void
    onDelete: (id:string)=>void
}

function fmt12(time: string|null){
    if (!time) return null
    const [h,m] = time.split(':').map(Number)
    const ampm = h>=12 ? 'PM':'AM'

    return `${h % 12 || 12}:${String(m).padStart(2,'0')} ${ampm}`
}

export default function ActivityCard({activity, onToggle, onDelete}: Props){

    const {id, name, startTime, endTime, category, priority, status } = activity

    const catColor = CATEGORY_COLOR[category]
    const priColor = PRIORITY_COLOR[priority]

    const isDone    = status === 'DONE'
    const isSkipped = status === 'SKIPPED'

    return (
    <div className={cn(
      'group relative bg-card border border-border rounded-xl p-4',
      'flex items-center gap-4 transition-all duration-200',
      'hover:border-zinc-600',
      isDone    && 'opacity-60',
      isSkipped && 'opacity-40',
    )}>

      {/* Category colour strip */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl"
        style={{ backgroundColor: catColor }}
      />

      {/* Main content */}
      <div className="flex-1 min-w-0 pl-2">
        <div className="flex items-center gap-2 mb-1">
          <span className={cn(
            'font-medium text-sm truncate',
            isDone && 'line-through text-muted-foreground'
          )}>
            {name}
          </span>
          <StatusBadge status={status} />
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Time range */}
          {startTime && (
            <span className="text-xs font-mono text-primary">
              {fmt12(startTime)}{endTime ? ` → ${fmt12(endTime)}` : ''}
            </span>
          )}

          {/* Category */}
          <span
            className="text-xs font-medium uppercase tracking-wide"
            style={{ color: catColor }}
          >
            {category}
          </span>

          {/* Priority dot */}
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <span
              className="w-1.5 h-1.5 rounded-full inline-block"
              style={{ backgroundColor: priColor }}
            />
            {priority}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 shrink-0">
        <Button
          size="sm"
          variant="outline"
          className="text-xs h-7 px-3"
          onClick={() => onToggle(id, status)}
        >
          {isDone ? '↩ Undo' : '→ Next'}
        </Button>

        <Button
          size="icon"
          variant="ghost"
          className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
          onClick={() => onDelete(id)}
        >
          <Trash2 size={14} />
        </Button>
      </div>
    </div>
  )

}