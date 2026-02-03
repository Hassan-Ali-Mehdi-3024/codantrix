'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => null)
        setError(data?.error || 'Invalid credentials')
      } else {
        router.push('/client/dashboard')
        router.refresh()
      }
    } catch {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-nm-bg relative overflow-hidden">
      <div className="w-full max-w-md space-y-8 nm-flat-md p-8 sm:p-10 rounded-3xl border border-nm-text/5 relative z-10 flex flex-col items-center sm:items-stretch text-center sm:text-left">
        <div className="text-center w-full">
          <Link href="/" className="inline-block mb-6 nm-inset-sm p-4 rounded-2xl">
            <Image src="/logo.svg" alt="Codantrix Labs" width={40} height={40} className="h-10 w-auto mx-auto" />
          </Link>
          <h2 className="text-3xl font-bold tracking-tight text-nm-text">
            Client <span className="text-brand-orange">Portal.</span>
          </h2>
          <p className="mt-2 text-sm text-nm-text-muted">
            Sign in to access your project dashboard
          </p>
        </div>

        <form className="mt-8 space-y-6 w-full" onSubmit={handleLogin}>
          {error && (
            <div className="rounded-xl nm-inset-xs border border-red-500/20 p-4 text-left">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-500">Login Failed</h3>
                  <div className="mt-2 text-sm text-red-500/70">
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-6 text-left">
            <div>
              <label htmlFor="email" className="block text-[10px] font-black uppercase tracking-widest text-nm-text-muted mb-2">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-xl nm-inset-sm bg-transparent px-4 py-4 text-nm-text placeholder-nm-text/20 focus:ring-1 focus:ring-brand-orange focus:outline-none sm:text-sm transition-all"
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-[10px] font-black uppercase tracking-widest text-nm-text-muted mb-2">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-xl nm-inset-sm bg-transparent px-4 py-4 text-nm-text placeholder-nm-text/20 focus:ring-1 focus:ring-brand-orange focus:outline-none sm:text-sm transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full justify-center rounded-xl nm-btn-accent py-4 px-4 text-xs font-black uppercase tracking-[0.2em] text-white shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                'Sign in'
              )}
            </button>
          </div>
        </form>

          <div className="text-center w-full">
             <Link href="/contact" className="font-bold text-brand-orange hover:text-nm-text transition-colors text-[10px] uppercase tracking-widest">
                Don&apos;t have an account? Contact us
             </Link>
          </div>
        </div>
    </div>
  )
}
