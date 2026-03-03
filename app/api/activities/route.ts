import { getSessionUser } from "@/lib/auth-helper";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";



export async function GET(req:Request) {
    const user = await getSessionUser();
    if(!user) return NextResponse.json({error: 'unauthorized'}, {status: 401})

    const activities = await prisma.activity.findMany({
        where: {userId: user.id},
        orderBy: {startTime: 'asc'}
    });

    return NextResponse.json(activities);
}