import { getSessionUser } from "@/lib/auth-helper";
import { prisma } from "@/lib/prisma";
import { error } from "console";
import { NextResponse } from "next/server";



export async function GET() {
    try {
        const session  = await getSessionUser()
        if (!session ) {
            return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
        }
        const user = await prisma.user.findUnique({
            where: { id: session.id },
            select: { id: true, name: true, email: true, createdAt: true }
        });
        if (!user) {
            return NextResponse.json({error: "User not found"}, {status:404})
        }
        return NextResponse.json(user)
    } catch (error) {
        return NextResponse.json({error: "something went wrong"}, {status:500})
    }
}