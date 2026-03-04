import useSWR from 'swr';
import { Activity, Status, STATUS_CYCLE } from '@/types';

const fetcher = (url:string) => fetch(url).then(r => r.json())


export function useActivities(date?:string){
    const key = date ? `/api/activities?date=${date}`:'/api/activities'

    const { data, error, isLoading, mutate } = useSWR<Activity[]>(key,fetcher)

    async function createActivity(body:{
        name: string,
        startTime?: string,
        endTime?:string,
        category?:string,
        priority?:string,
        notes?:string
    }) {
        const res = await fetch('/api/activities', {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(body)
        });

        if (!res.ok) {
            const data = await res.json()
            throw new Error(data.error || 'Failed to create activity')
        }

        mutate() //revalidate list
        return res.json()
    }

    async function toggleStatus(id:string, currentStatus: Status) {
        const nextStatus = STATUS_CYCLE[currentStatus]

        //optimastic ui updates that changes instantly
        mutate((prev) => prev?.map(a => a.id===id ? {...a, status: nextStatus}:a), false)

        try {
            await fetch(`/api/activities/${id}`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({status: nextStatus})
            })
        } catch (error) {
            mutate() //rollback on error
        }
    }

    async function deleteActivity(id:string) {
        //optimistic update for remove from list instantly
        mutate((prev) => prev?.filter(a => a.id === id), false)

        try {
            await fetch(`/api/activities/${id}`, {
                method: "DELETE"
            })
        } catch (error) {
            mutate() //rollback on error
        }
    }

    async function updateActivity(id:string, body: Partial<Activity>) {
        const res = await fetch(`/api/activities/${id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        })

        if (!res.ok) {
            throw new Error('Failed to update activity')

        }
        mutate()

    }
    const activities = data ?? []

        //start derived from the array - no extra api call
        const total = activities.length
        const done = activities.filter(a => a.status === 'DONE').length
        const pct = total >0 ? Math.round((done/total)*100):0

        return{
            activities,
            isLoading,
            isError: !!error,
            total,
            done,
            pct,
            createActivity,
            toggleStatus,
            deleteActivity,
            updateActivity,
            mutate
        }
}