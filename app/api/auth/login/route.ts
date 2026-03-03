
import { signToken } from '@/lib/jwt'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json()
        if (!email || !password) {
            return NextResponse.json({ error: "All fields required" }, { status: 400 })
        }
        const user = await prisma.user.findUnique({ where: { email } })
        if (!user) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return NextResponse.json({ error: "Incorrect Password Check your password" }, { status: 401 })
        }
        const token = await signToken({ id: user.id, email: user.email })

        const res = NextResponse.json({ id: user.id, email: user.email });
        res.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7,
            path: '/',
        });
        return res
    } catch (error) {
        return NextResponse.json({error: "Something went wrong"}, {status: 500})
    }
}