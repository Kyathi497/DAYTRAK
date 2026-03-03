'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/auth-context";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useState } from "react"




export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { refreshUser } = useAuth();
    const router = useRouter();

    async function handleSubmit(e:React.FormEvent) {
        e.preventDefault();
        setError('')
        setLoading(true);

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({email,password})
            });
            const data = await res.json()
            if (!res.ok) {
                setError(data.error || "Login failed")
                return;
            }
            await refreshUser();
            router.push('/dashboard')
        } catch (error) {
            setError("Something went wrong. try again.")
        } finally{
            setLoading(false)
        }
    }


    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <Card className="w-full max-w-sm">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold tracking-widest">DAYTRACK</CardTitle>
                    <CardDescription>Sign in to your account</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        {error && (<p className="">{error}</p>)}
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="you@gmail.com" value={email} onChange={(e)=>setEmail(e.target.value)} required autoFocus/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" placeholder="*********" value={password} onChange={(e)=>setPassword(e.target.value)} required autoFocus/>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-3 mt-5">
                        <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Signing in..' : 'Sign in'}</Button>
                        <p>No account? {' '}
                            <Link href="/register" className="text-primary hover:Underline">Register</Link>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}