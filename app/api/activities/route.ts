import { getSessionUser } from "@/lib/auth-helper";
import { prisma } from "@/lib/prisma";
import { error } from "console";
import { NextResponse } from "next/server";



export async function GET(req:Request) {
    try {
        const user = await getSessionUser();
        if(!user) return NextResponse.json({error: "Unauthorized", status: 401});
        const { searchParams }= new URL(req.url);
        const dateParam = searchParams.get('date')
        const date = dateParam ? new Date(dateParam) : new Date()
        
        const start = new Date(date);
        start.setHours(0,0,0,0);

        const end = new Date(date);
        end.setHours(23,59,59,999);

        const activities = await prisma.activity.findMany({
            where: {
                userId: user.id,
                date: {gte: start, lte: end}
            },
            orderBy: {startTime: 'asc'}
        });

        return NextResponse.json(activities)
    } catch (error) {
        return NextResponse.json({error: "something went wrong"}, {status: 500})
    }
};

export async function POST(req:Request){
    try {
        const user = await getSessionUser();
        if(!user) return NextResponse.json({error: "Unauthorized"}, {status: 401})
        
            const {name, startTime, endTime, category, priority, notes }= await req.json()
            if(!name) return NextResponse.json({error:"name field is mandatory"}, {status:400});

            const activity = await prisma.activity.create({
                data: {
                    name,
                    startTime: startTime || null,
                    endTime: endTime || null,
                    category: category || 'OTHER',
                    priority: priority || 'MEDIUM',
                    notes: notes || null,
                    userId: user.id
                }
            });
            return NextResponse.json(activity, {status: 201})
    } catch (error) {
        return NextResponse.json({error: "Something went wrong"}, {status: 500})
    }
}