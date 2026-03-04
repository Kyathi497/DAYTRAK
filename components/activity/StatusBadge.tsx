import { Status, STATUS_LABEL } from "@/types";
import { cn } from "@/lib/utils";

type Props = {
    status: Status
}


const STATUS_STYLES: Record<Status, string> = {
    PENDING: 'bg-zinc-800 text-zinc-400 border-zinc-700',
    IN_PROGRESS: 'bg-blue-950 text-blue-400 border-blue-800',
    DONE: 'bg-green-950 text-green-400 border-green-800',
    SKIPPED: 'bg-red-950 text-red-400 border-red-800',
}

export default function StatusBadge({status}:Props){
    return(
        <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full border', STATUS_STYLES[status])}>
            {STATUS_LABEL[status]}
        </span>
    )
}