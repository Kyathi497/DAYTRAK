"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// helper component to display current time
function TimeDisplay() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const time = now.toLocaleTimeString([], { hour12: false });
  const date = now.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' });

  return (
    <div className="flex flex-col items-end text-right">
      <span className="text-sm font-mono text-lime-300">{time}</span>
      <span className="text-xs text-muted-foreground hidden text-lime-300 sm:block">{date}</span>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(()=>{
    if (!loading && !user) {
        router.push('/')
    }
  }, [user, loading, logout])

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border sticky top-0 z-50 bg-background/95 backdrop-blur">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="font-bold tracking-wider text-3xl text-lime-300">DAYTRACK</span>
          </div>
          {/* right side: time and settings menu */}
          <div className="flex items-center gap-4">
            <TimeDisplay />
            {/* <div className="relative group">
              <Settings size={20} className="cursor-pointer" />
              <div className="absolute right-0 mt-2 w-32 bg-background border border-border rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="p-2 text-sm text-muted-foreground">
                  {user?.name}
                </div>
                <Button variant="ghost" size="sm" className="w-full" onClick={logout}>
                  Sign out
                </Button>
              </div>
            </div> */}
          </div>
        </div>
      </header>
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-8">
        {children}
      </main>
    </div>
  );
}
