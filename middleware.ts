import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from '@/lib/jwt'

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value

  const isProtected =
    req.nextUrl.pathname.startsWith('/dashboard') ||
    req.nextUrl.pathname.startsWith('/weekly') ||
    req.nextUrl.pathname.startsWith('/api/activities') ||
    req.nextUrl.pathname.startsWith('/api/weekly')

  if (!isProtected) return NextResponse.next()

  const user = token ? await verifyToken(token) : null

  if (!user) {
    // API routes → 401
    if (req.nextUrl.pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    // Pages → redirect to login
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/weekly/:path*', '/api/activities/:path*', '/api/weekly/:path*'],
}