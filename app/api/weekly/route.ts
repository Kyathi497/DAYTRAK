import { getSessionUser } from "@/lib/auth-helper";
import { prisma } from "@/lib/prisma";
import { error } from "console";
import { NextResponse } from "next/server";





export async function GET(){
    try {
        const user = await getSessionUser();
        if(!user) return NextResponse.json({error: "Unorthorized"}, {status: 401});

        const today = new Date();
        const days = Array.from({length: 7}, (_, i)=> {
            const d = new Date(today)
            d.setDate(today.getDate()-(6-i))
            return d
        });

        const results = await Promise.all(
            days.map(async (day) => {
                const start = new Date(day)
                start.setHours(0, 0, 0, 0)
                
                const end = new Date(day)
                end.setHours(23,59,59,999)

                const activities = await prisma.activity.findMany({
                    where: {
                        userId: user.id,
                        date: {gte: start, lte: end}
                    }
                })

                const total = activities.length
                const done = activities.filter(a => a.status === 'DONE').length
                const skipped = activities.filter(a => a.status === 'SKIPPED').length
                
                //category breakdown for the day
                const byCategory = activities.reduce((acc, a) => {
                    acc[a.category] = (acc[a.category] || 0)+1
                    return acc
                }, {} as Record<string, number>)

                return {
                    date: start.toISOString().split('T')[0],
                    dayName: start.toLocaleDateString('en-US', {weekday: 'short'}),
                    total,
                    done,
                    skipped,
                    pending: activities.filter(a => a.status === 'PENDING').length,
                    inProgress: activities.filter(a => a.status === 'IN_PROGRESS').length,
                    completedPct: total > 0 ? Math.round((done/total)*100):0,
                    byCategory,
                }
            }), 
        )
        return NextResponse.json(results)
    } catch (error) {
        return NextResponse.json({error: "something went wrong"}, {status: 500})
    }
}