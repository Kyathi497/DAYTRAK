
import { NextResponse } from "next/server"
import { prisma } from '@/lib/prisma'
import { error } from "console"
import { signToken } from "@/lib/jwt"
import bcrypt from "bcryptjs"


export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json()

        if (!name || !email || !password) {
            return NextResponse.json({ error: 'ALl fields required' }, { status: 400 })
        }

        const exists = await prisma.user.findUnique({ where: { email } })
        if (exists) {
            return NextResponse.json({ error: 'Email alredy existing' }, { status: 409 })
        }

        const hashed = await bcrypt.hash(password, 12)
        const user = await prisma.user.create({
            data: { name, email, password: hashed }
        })
        const token = await signToken({ id: user.id, email: user.email })

        const res = NextResponse.json(
            { id: user.id, name: user.name, email: user.email },
            { status: 201 }
        )

        res.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7,  // 7 days
            path: '/',
        })
        return res
    } catch (error) {
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
    }
}