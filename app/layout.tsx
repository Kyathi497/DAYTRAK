import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { AuthProvider } from '@/context/auth-context'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DayTrack',
  description: 'Daily Activity Tracker',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={cn(geist.className, 'min-h-screen bg-background text-foreground antialiased')}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}