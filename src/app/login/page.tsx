'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError(error.message)
      } else {
        router.push('/dashboard')
        router.refresh()
      }
    } catch {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] sm:right-[-5%] w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] lg:w-[500px] lg:h-[500px] rounded-full bg-[#f15a2f]/10 blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] sm:left-[-5%] w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] lg:w-[500px] lg:h-[500px] rounded-full bg-[#f15a2f]/5 blur-[100px]" />
      </div>

      <div className="w-full max-w-md space-y-8 glass p-8 sm:p-10 rounded-3xl border border-white/10 relative z-10">
        <div className="text-center">
          <Link href="/" className="inline-block mb-6">
            <Image src="/logo.svg" alt="Codantrix Labs" width={40} height={40} className="h-10 w-auto mx-auto" />
          </Link>
          <h2 className="text-3xl font-bold tracking-tight text-[#fffdf2]">
            Client Portal
          </h2>
          <p className="mt-2 text-sm text-[#fffdf2]/60">
            Sign in to access your project dashboard
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          {error && (
            <div className="rounded-md bg-red-500/10 border border-red-500/20 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-400">Login Failed</h3>
                  <div className="mt-2 text-sm text-red-400/90">
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#fffdf2]/80">
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
                  className="block w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[#fffdf2] placeholder-gray-400 focus:border-[#f15a2f] focus:ring-[#f15a2f] focus:ring-1 focus:outline-none sm:text-sm transition-colors"
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#fffdf2]/80">
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
                  className="block w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[#fffdf2] placeholder-gray-400 focus:border-[#f15a2f] focus:ring-[#f15a2f] focus:ring-1 focus:outline-none sm:text-sm transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full justify-center rounded-xl bg-gradient-to-r from-[#b83a0f] via-[#f15a2f] to-[#b83a0f] bg-[length:200%_100%] hover:bg-[position:100%_0] py-3 px-4 text-sm font-bold uppercase tracking-wider text-white shadow-lg hover:shadow-[#f15a2f]/25 transition-all duration-500 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                'Sign in'
              )}
            </button>
          </div>
        </form>

          <div className="text-center">
             <Link href="/contact" className="font-medium text-[#f15a2f] hover:text-[#ff8a5c] text-sm">
                Don&apos;t have an account? Contact us
             </Link>
          </div>
        </div>
    </div>
  )
}
