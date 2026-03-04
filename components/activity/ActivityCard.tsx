"use client";

import { Activity, CATEGORY_COLOR, PRIORITY_COLOR } from "@/types";
import { cn } from "@/lib/utils";
import StatusBadge from "./StatusBadge";
import { Button } from "../ui/button";
import { Trash2, Pause, SkipForward, Check } from "lucide-react";

// types — onToggle now takes target status
type Props = {
  activity: Activity;
  onToggle: (id: string, targetStatus: Activity["status"]) => void;
  onDelete: (id: string) => void;
};

function fmt12(time: string | null) {
  if (!time) return null;
  const [h, m] = time.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${ampm}`;
}

export default function ActivityCard({ activity, onToggle, onDelete }: Props) {
  const { id, name, startTime, endTime, category, priority, status } = activity;

  const catColor = CATEGORY_COLOR[category];
  const priColor = PRIORITY_COLOR[priority];

  const isDone = status === "DONE";
  const isSkipped = status === "SKIPPED";
  const isInProgress = status === "IN_PROGRESS";

  function handleCheck() {
    onToggle(id, isDone ? "PENDING" : "DONE");
  }

  function handlePause() {
    onToggle(id, isInProgress ? "PENDING" : "IN_PROGRESS");
  }

  function handleSkip() {
    onToggle(id, isSkipped ? "PENDING" : "SKIPPED");
  }

  return (
    <div
      className={cn(
        "group relative bg-card border border-border rounded-xl p-4",
        "flex items-center gap-4 transition-all duration-200",
        "hover:border-zinc-600",
        isDone && "opacity-60",
        isSkipped && "opacity-40",
      )}
    >
      {/* Category colour strip */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl"
        style={{ backgroundColor: catColor }}
      />

      {/* ── Checkbox ── */}
      <button
        onClick={handleCheck}
        className={cn(
          "shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200",
          isDone
            ? "bg-green-500 border-green-500"
            : "border-zinc-600 hover:border-green-500 bg-transparent",
        )}
      >
        {isDone && <Check size={12} strokeWidth={3} className="text-black" />}
      </button>

      {/* ── Main content ── */}
      <div className="flex-1 min-w-0">
        {/* Name row — with pause button inline */}
        <div className="flex items-center gap-2 mb-1">
          <span
            className={cn(
              "font-medium text-sm truncate",
              isDone && "line-through text-muted-foreground",
              isSkipped && "line-through text-muted-foreground",
            )}
          >
            {name}
          </span>

          {/* Pause button — sits right after the name */}
          <button
            onClick={handlePause}
            title={isInProgress ? "Pause (set to Pending)" : "Set In Progress"}
            className={cn(
              "shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200",
              isInProgress
                ? "bg-blue-500 text-white"
                : "text-zinc-600 hover:text-blue-400 hover:bg-blue-950",
            )}
          >
            <Pause size={10} strokeWidth={2.5} />
          </button>

          <StatusBadge status={status} />
        </div>

        {/* Meta row */}
        <div className="flex items-center gap-3 flex-wrap">
          {startTime && (
            <span className="text-xs font-mono text-primary">
              {fmt12(startTime)}
              {endTime ? ` → ${fmt12(endTime)}` : ""}
            </span>
          )}
          <span
            className="text-xs font-medium uppercase tracking-wide"
            style={{ color: catColor }}
          >
            {category}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <span
              className="w-1.5 h-1.5 rounded-full inline-block"
              style={{ backgroundColor: priColor }}
            />
            {priority}
          </span>
        </div>
      </div>

      {/* ── Actions ── */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Skip button */}
        <Button
          size="sm"
          variant="outline"
          className={cn(
            "text-xs h-7 px-3 gap-1.5",
            isSkipped
              ? "border-red-800 text-red-400 hover:bg-red-950"
              : "text-muted-foreground hover:text-red-400 hover:border-red-800",
          )}
          onClick={handleSkip}
        >
          <SkipForward size={12} />
          {isSkipped ? "Undo Skip" : "Skip"}
        </Button>

        {/* Delete */}
        <Button
          size="icon"
          variant="ghost"
          className="h-7 w-7 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
          onClick={() => onDelete(id)}
        >
          <Trash2 size={14} />
        </Button>
      </div>
    </div>
  );
}
