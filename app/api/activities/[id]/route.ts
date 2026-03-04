import { getSessionUser } from "@/lib/auth-helper";
import { prisma } from "@/lib/prisma";
import { error } from "console";
import { NextResponse } from "next/server";



async function getOwnedActivity(id: string, userId:string) {
    return await prisma.activity.findFirst({
        where: {id, userId}
    });
}


export async function PATCH(req: Request, {params}: {params: Promise<{id: string}>}){
    try {
        const user = await getSessionUser();
        if (!user) return NextResponse.json({error: "Unauthorized"}, {status: 401});
        const {id} = await params

        const existing = await getOwnedActivity(id, user.id)
        if(!existing) return NextResponse.json({error:"activity not found for the user"}, {status:404})
        
        const data = await req.json();
        const { userId: _, id: __, createdAt:___, ...safeData} = data;
    
        const updated = await prisma.activity.update({
            where: { id},
            data: safeData
        });

        return NextResponse.json(updated)
    } catch (error) {
        return NextResponse.json({error: "Something went wron"}, {status: 500})
    }
};

export async function DELETE(req: Request, {params}: {params: Promise<{id:string}>}){
    try {
        const user = await getSessionUser();
        if(!user) return NextResponse.json({error: "Unorthorized"}, {status: 401})
        
        const { id }=await params
        const existing = await getOwnedActivity(id, user.id);
        if(!existing) return NextResponse.json({error: "Activity not found"}, {status: 404});

        await prisma.activity.delete({where: {id}})
        return NextResponse.json({success: true})
    } catch (error) {
        return NextResponse.json({error: "Something went wrong"}, {status: 500})
    }
}